import { interval } from 'rxjs';
import { map, withLatestFrom, scan } from 'rxjs/operators';
import {
  bounceVectors,
  rebounceVectors,
  calculateNeighbourPosition,
} from './directionVectors';

class BoardUpdater {
  constructor(board) {
    this.board = board;
    this.subscription$ = null;
    this.activeObject = this.board.getActiveObject();

    this.getVehiclesNextState = this.getVehiclesNextState.bind(this);
  }

  start(timeGap = 1000) {
    this.subscription$ = interval(timeGap)
      .pipe(
        withLatestFrom(this.activateDetector$()),
        map(([, detectorsData]) => detectorsData), // get only detector data, ignore interval
        scan(BoardUpdater.interpretDetectorUpdate, { id: null }),
        map(this.getVehiclesNextState),
      )
      // newVehicleState : { position, vector }
      .subscribe((newVehicleState) => {
        this.updateBoard(newVehicleState);
        this.updateVehicle(newVehicleState);
      });
  }

  stop() {
    if (this.subscription$ != null) {
      this.subscription$.unsubscribe();
    }
  }

  activateDetector$() {
    return this.activeObject.startCollisionUpdates$(this.board.getFieldAtPos);
  }

  getVehiclesNextState(detectorsData) {
    // detectorsData : { id, change, payload:{ position, objectAtPos} }
    if (
      detectorsData.change &&
      detectorsData.payload.objectAtPos.type !== 'empty'
    ) {
      return this.getStateAfterCollision(detectorsData.payload);
    }
    return this.getStateNoCollision();
  }

  getStateAfterCollision(collisionData) {
    // collisionData: { position, objectAtPos}
    switch (collisionData.objectAtPos.type) {
      case 'static': {
        return this.getStaticCollisionData();
      }
      case 'teleport': {
        return this.getTeleportCollisionData(collisionData.position);
      }
      default:
        throw new Error('Incorrect collision data');
    }
  }

  getStaticCollisionData() {
    const vehicleVector = this.activeObject.state.vector;
    const possibleBounceVectors = bounceVectors
      .get(vehicleVector)
      .sort(() => Math.random() - 0.5); // randomize array

    const futureState = this.getFutureCollisionState(possibleBounceVectors);

    return futureState;
  }

  getFutureCollisionState(possibleBounceVectors) {
    let futureState;

    possibleBounceVectors.forEach((bounceVector) => {
      const neighbourPosition = calculateNeighbourPosition(
        this.activeObject.state.position,
        this.activeObject.state.vector,
        bounceVector,
      );
      if (!this.board.isOccupied(neighbourPosition)) {
        futureState = {
          vector: bounceVector,
          position: this.activeObject.state.position,
        };
      }
    });

    // rebounce case (opposite vector)
    if (futureState == null) {
      futureState = {
        vector: rebounceVectors.get(this.activeObject.state.vector),
        position: this.activeObject.state.position,
      };
    }

    return futureState;
  }

  getTeleportCollisionData(teleportsPosition) {
    const currTeleport = this.board.getFieldAtPos(teleportsPosition);
    const newState = currTeleport.use(this.board.isOccupied);
    return newState;
  }

  getStateNoCollision() {
    const { position, vector } = this.activeObject.state;
    return { position: vector(position), vector };
  }

  updateBoard(newVehicleState) {
    const commands = this.generateUpdateCommands(newVehicleState);
    this.board.updateAtBatch(commands);
  }

  generateUpdateCommands(newVehicleState) {
    return [
      {
        type: 'destroy',
        payload: { position: this.activeObject.state.position },
      },
      {
        type: 'place',
        payload: {
          object: this.activeObject,
          position: newVehicleState.position,
        },
      },
    ];
  }

  updateVehicle(newVehicleState) {
    this.activeObject.updateState(newVehicleState);
  }

  static interpretDetectorUpdate(prevData, currData) {
    // data : { id, position, objectAtPos }
    if (prevData.id !== currData.id) {
      return {
        id: currData.id,
        change: true,
        payload: {
          position: currData.position,
          objectAtPos: currData.objectAtPos,
        },
      };
    }
    return { ...prevData, change: false };
  }
}

export default BoardUpdater;
