import GameBlock from './GameBlock';
import CollisionDetecor from '../CollisionDetector';

class Vehicle extends GameBlock {
  constructor(initialPos) {
    super(initialPos);
    this.type = 'moving';
    this.state.vector = null;
    this.detector = new CollisionDetecor();
  }

  startCollisionUpdates$(positionRetrivingCb) {
    return this.detector.connectSource$(
      positionRetrivingCb,
      this.state.vector,
      this.state.position,
    );
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
  }

  updateDetector() {
    const detectingPosition = this.state.vector(this.state.position);
    this.detector.positionDetector.next(detectingPosition);
  }
}

export default Vehicle;
