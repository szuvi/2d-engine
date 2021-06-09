import * as React from 'react';
import BoardCreator from '../utils/Engine/BoardCreator';
import BoardUpdater from '../utils/Engine/BoardUpdater';
import vectors from '../utils/Engine/directionVectors';

function changeVector(direction, vehicle) {
  if (!Object.keys(vectors).includes(direction)) {
    throw new Error('Incorrect direction for vector');
  }
  vehicle.setVector(vectors[direction]);
}

function useGame(fieldsData) {
  const myBoard = React.useMemo(
    () => BoardCreator.createFromInput(fieldsData),
    [fieldsData],
  );
  const myUpdater = React.useMemo(() => new BoardUpdater(myBoard), [myBoard]);

  return {
    getSize: () => myBoard.size,
    getState: () => myBoard.getState(),
    getBoardUpdates$: () => {
      myUpdater.activeObject.state.vector = vectors.downRight;
      return myBoard.getBoardUpdates$();
    },
    startUpdates: () => myUpdater.start(200),
    endUpdates: () => myUpdater.stop(),
    changeVector: (direction) =>
      changeVector(direction, myBoard.getActiveObject()),
  };
}

export default useGame;
