import { interval } from 'rxjs';
import { map, withLatestFrom, scan, tap } from 'rxjs/operators';
import { bounceVectors, rebounceVectors } from './directionVectors';

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
        scan(BoardUpdater.interpretDetectorUpdate),
        map(this.getVehiclesNextState),
        tap((data) => console.warn(data)),
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
    if (detectorsData.change) {
      return this.getStateAfterCollision(detectorsData.payload);
    }
    return this.getStateNoCollision();
  }

  getStateAfterCollision(collisionData) {
    // collisionData: { position, objectAtPos}
    switch (collisionData.objectAtPos.type) {
      case 'static': {
        return this.getStaticCollisionData(collisionData.position);
      }
      case 'teleport': {
        return this.getTeleportCollisionData(collisionData.position);
      }
      default:
        throw new Error('Incorrect collision data');
    }
  }

  getStaticCollisionData(collidingObjectPosition) {
    const vehicleVector = this.activeObject.state.vector;
    const possibleBounceVectors = bounceVectors
      .get(vehicleVector)
      .sort(() => Math.random() - 0.5); // randomize array

    const futureState = this.getFutureState(
      collidingObjectPosition,
      possibleBounceVectors,
    );

    return futureState;
  }

  getFutureState(collidingObjectPosition, possibleBounceVectors) {
    let futureState;

    possibleBounceVectors.forEach((bounceVector) => {
      const possiblePossiton = bounceVector(collidingObjectPosition);
      if (!this.board.isOccupied(possiblePossiton)) {
        futureState = { vector: bounceVector, position: possiblePossiton };
      }
    });

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
    const newState = currTeleport.use();
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
