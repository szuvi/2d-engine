import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

class CollisionDetector {
  constructor() {
    this.positionDetector = null;
    this.detectorsInputObservable$ = new Observable((subscriber) => {
      this.positionDetector = subscriber;
    });
    this.inputConnection$ = null;
  }

  connectSource$(positionRetrievingCb, entryVector, entryPosition) {
    const startingState = CollisionDetector.getInitialState(
      positionRetrievingCb,
      entryVector,
      entryPosition,
    );

    return this.detectorsInputObservable$.pipe(
      map((position) => {
        const objectAtPos = positionRetrievingCb(position);
        return { id: uuidv4(), position, objectAtPos };
      }),
      filter(({ objectAtPos }) => objectAtPos.type !== 'empty'),
      startWith(startingState),
    );
  }

  static getInitialState(positionRetrievingCb, initialVector, initialPosition) {
    const entryDetectorsPosition = initialVector(initialPosition);
    const entryObjectAtPos = positionRetrievingCb(entryDetectorsPosition);
    return {
      id: uuidv4(),
      position: entryDetectorsPosition,
      objectAtPos: entryObjectAtPos,
    };
  }
}

export default CollisionDetector;
