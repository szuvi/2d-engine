import * as React from 'react';
import { map } from 'rxjs/operators';
import { boardContext } from '../contexts/BoardProvider';
import useGame from '../hooks/useGame';
import Container from '../components/Container';
import BoardGrid from '../components/BoardGrid';
import GameObject from '../components/GameObject';
// import ClearButton from '../components/ClearButton';
import Controls from './Controls';

function SimpleMain() {
  const [boardData] = React.useContext(boardContext);
  const game = useGame(boardData);
  const [board, setBoard] = React.useState(() => game.getState().flat());
  const [started, setStarted] = React.useState(false);
  const size = game.getSize();

  React.useEffect(() => {
    const subscription = game
      .getBoardUpdates$()
      .pipe(map((fields) => fields.flat()))
      .subscribe((fieldsArray) => setBoard(fieldsArray));
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleStart = () => {
    setStarted(true);
    game.startUpdates(1000);
  };

  const handleStop = () => {
    setStarted(false);
    game.endUpdates();
  };
  return (
    <Container fullscreen centered>
      <BoardGrid size={size}>
        {board.map((field) => (
          <GameObject
            objectType={field.type}
            disabled={started}
            key={field.id}
          />
        ))}
      </BoardGrid>

      <Controls
        started={started}
        handleStart={handleStart}
        handleStop={handleStop}
        handleDirectionChange={game.changeVector}
      />
    </Container>
  );
}

export default SimpleMain;
