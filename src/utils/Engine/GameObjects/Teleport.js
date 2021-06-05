import GameBlock from './GameBlock';
import { getRandom } from '../directionVectors';

class Teleport extends GameBlock {
  use() {
    const randomVectorModifier = getRandom();
    return {
      position: randomVectorModifier(this.position),
      vector: randomVectorModifier,
    };
  }
}

export default Teleport;
