/* eslint-disable no-use-before-define */
const dictionary = {
  X: 'block',
  1: 'vehicle',
  0: null,
  Y: 'teleport',
};

const InputInterpreter = (function InputInterpreterIIFE() {
  function interpret(input) {
    if (!isValid(input)) {
      throw new Error('Incorrect input for Interpreter');
    }
    const boardSize = getBoardSize(input);
    const fieldsInstructions = getFieldInstructions(input);
    return {
      board: boardSize,
      instructions: fieldsInstructions,
    };
  }

  function getBoardSize(input) {
    const numberOfRows = input.length;
    const numberOfColumns = input[0].length;
    return { rows: numberOfRows, columns: numberOfColumns };
  }

  function getFieldInstructions(input) {
    return input
      .map((row, rowNumber) =>
        row.map((field, columnNumber) =>
          translate(field, rowNumber, columnNumber),
        ),
      )
      .flat();
  }

  function translate(field, x, y) {
    const blockType = dictionary[field];
    const position = [x, y];
    return { type: blockType, pos: position };
  }

  function isValid(input) {
    // TODO could use some improvement
    return (
      Array.isArray(input) &&
      input.every(
        (row) =>
          Array.isArray(row) && row.every((entry) => typeof entry === 'string'),
      )
    );
  }

  return {
    interpret,
  };
})();

export default InputInterpreter;
