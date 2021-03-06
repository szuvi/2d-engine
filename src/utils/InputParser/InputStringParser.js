/* eslint-disable no-use-before-define */
const InputStringParser = (function InputStringParserIIFE() {
  function parse(input) {
    if (typeof input !== 'string') {
      throw new Error('Incorrect input for praser');
    }
    return input
      .replace(/\n|\s|\t|'|"|(\[(?=\[))|((?<=\])\])/g, '') // removes all ' " \s \t \n and unnecessary [ ]
      .split(/(?<=\]),(?=\[)/g) // splits on every , between ][
      .map((row) => row.replace(/[[\]]/g, '').split(',')); // removes all [] and splits on ,
  }

  return {
    parse,
  };
})();

export default InputStringParser;
