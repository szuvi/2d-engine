/* eslint-disable no-param-reassign */
import GameBlock from './GameObjects/GameBlock';
import Vehicle from './GameObjects/Vehicle';
import Teleport from './GameObjects/Teleport';
import EmptyBlock from './GameObjects/EmptyBlock';

const GameObjectFactory = (function FactoryIIFE() {
  return {
    get(type, initialPos) {
      switch (type) {
        case 'block':
          return new GameBlock(initialPos);
        case 'vehicle':
          return new Vehicle(initialPos);
        case 'teleport':
          return new Teleport(initialPos);
        case 'empty':
          return new EmptyBlock(initialPos);
        default:
          throw new Error('Incorrect object type');
      }
    },
  };
})();

export default GameObjectFactory;
