import GameBlock from './GameBlock';

class EmptyBlock extends GameBlock {
  constructor(initialPos) {
    super(initialPos);
    this.type = 'empty';
  }
}

export default EmptyBlock;
