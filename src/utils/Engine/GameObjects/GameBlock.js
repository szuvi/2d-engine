import { v4 as uuidv4 } from 'uuid';

class GameBlock {
  constructor(position) {
    this.type = 'static';
    this.state = {
      position,
    };
    this.id = uuidv4();
  }

  setPosition(newPosition) {
    this.state.position = newPosition;
  }
}

export default GameBlock;
