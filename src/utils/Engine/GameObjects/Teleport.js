import GameBlock from './GameBlock';
import { getRandom } from '../directionVectors';

class Teleport extends GameBlock {
  constructor() {
    super();
    this.type = 'teleport';
  }

  use() {
    this.type = 'static'; // single use teleport
    const randomVectorModifier = getRandom();
    return {
      vector: randomVectorModifier,
      position: randomVectorModifier(this.position),
    };
  }
}

export default Teleport;
