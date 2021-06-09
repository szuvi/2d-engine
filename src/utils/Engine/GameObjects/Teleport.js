import GameBlock from './GameBlock';
import { getRandom } from '../directionVectors';

class Teleport extends GameBlock {
  constructor(initialPos) {
    super(initialPos);
    this.type = 'teleport';
  }

  use(isPositionOccupied) {
    this.type = 'static'; // single use teleport
    const randomVector = getRandom();
    const futurePosition = randomVector(this.state.position);
    if (!isPositionOccupied(futurePosition)) {
      return {
        vector: randomVector,
        position: futurePosition,
      };
    }
    return this.use(isPositionOccupied);
  }
}

export default Teleport;
