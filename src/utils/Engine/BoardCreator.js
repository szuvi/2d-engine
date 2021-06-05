import GameObjectFactory from './GameObjectFactory';
import Board from './Board';

const BoardCreator = (function BoardCreatorIIFE() {
  function createEmpty(size = 10) {
    const fields = [];
    for (let i = 0; i < size; i += 1) {
      fields[i] = [];
      for (let j = 0; j < size; j += 1) {
        fields[i][j] = null;
      }
    }
    return new Board(fields);
  }

  function createFromInput(parsedInput) {
    const { instructions } = parsedInput;
    const fields = [];

    instructions.forEach(({ type, pos: [x, y] }) => {
      const obj = GameObjectFactory.get(type, [x, y]);
      fields[x] = fields[x] ?? [];
      fields[x][y] = obj;
    });

    return new Board(fields);
  }

  return {
    createEmpty,
    createFromInput,
  };
})();

export default BoardCreator;
