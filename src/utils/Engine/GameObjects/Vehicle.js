import GameBlock from './GameBlock';
import CollisionDetecor from '../CollisionDetector';

class Vehicle extends GameBlock {
  constructor(initialPos) {
    super(initialPos);
    this.type = 'moving';
    this.state.vector = null;
    this.detector = new CollisionDetecor();
    this.detectorSubscription$ = null;
  }

  startCollisionUpdates(positionRetrivingCb, observer) {
    this.detectorSubscription$ = this.detector
      .connectSource$(positionRetrivingCb)
      .subscribe(observer);
  }

  endCollisionUpdates() {
    this.detectorSubscription$.unsubscribe();
  }

  updateState(properties) {
    this.state = {
      ...this.state,
      ...properties,
    };
    this.updateDetector();
  }

  setVector(vector) {
    this.state.vector = vector;
    this.updateDetector();
  }

  updateDetector() {
    const detectingPosition = this.state.vector(this.state.position);
    this.detector.positionDetector.next(detectingPosition);
  }
}

export default Vehicle;
