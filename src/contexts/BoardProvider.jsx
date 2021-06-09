import * as React from 'react';
import PropTypes from 'prop-types';
import InputStringParser from '../utils/InputParser/InputStringParser';
import InputInterpreter from '../utils/InputParser/InputInterpreter';

const boardContext = React.createContext();

function BoardProvider({ children }) {
  const [rawBoard, setRawBoard] = React.useState('');

  const board = React.useMemo(() => {
    const parsed = InputStringParser.parse(rawBoard);
    return InputInterpreter.interpret(parsed);
  }, [rawBoard]);

  const value = [board, setRawBoard];

  return (
    <boardContext.Provider value={value}>{children}</boardContext.Provider>
  );
}

BoardProvider.propTypes = {
  children: PropTypes.element,
};

BoardProvider.defaultProps = {
  children: <></>,
};

export { boardContext, BoardProvider };
