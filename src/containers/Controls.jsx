import * as React from 'react';
import PropTypes from 'prop-types';
import ClearButton from '../components/ClearButton';
import Row from '../components/Row';

function Controls({ started, handleStart, handleStop, handleDirectionChange }) {
  const changeDirection = (e) => {
    handleDirectionChange(e.target.name);
  };

  return (
    <Row>
      <ClearButton onClick={handleStart} disabled={started}>
        Start
      </ClearButton>
      <ClearButton onClick={handleStop} disabled={!started}>
        Stop
      </ClearButton>
      <ClearButton onClick={changeDirection} disabled={started} name="upLeft">
        ↖️
      </ClearButton>
      <ClearButton onClick={changeDirection} disabled={started} name="upRight">
        ↗️
      </ClearButton>
      <ClearButton onClick={changeDirection} disabled={started} name="downLeft">
        ↙️
      </ClearButton>
      <ClearButton
        onClick={changeDirection}
        disabled={started}
        name="downRight"
      >
        ↘️
      </ClearButton>
    </Row>
  );
}

Controls.propTypes = {
  handleStart: PropTypes.func.isRequired,
  handleStop: PropTypes.func.isRequired,
  handleDirectionChange: PropTypes.func.isRequired,
  started: PropTypes.bool.isRequired,
};

export default Controls;
