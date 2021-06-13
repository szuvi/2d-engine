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

  const API = React.useMemo(
    () => ({
      getSize: () => myBoard.size,
      getState: () => myBoard.getState(),
      getBoardUpdates$: () => {
        myUpdater.activeObject.state.vector = vectors.downRight;
        return myBoard.getBoardUpdates$();
      },
      startUpdates: (interval) => myUpdater.start(interval),
      endUpdates: () => myUpdater.stop(),
      changeVector: (direction) =>
        changeVector(direction, myBoard.getActiveObject()),
    }),
    [myBoard, myUpdater],
  );
  return API;
}

export default useGame;
