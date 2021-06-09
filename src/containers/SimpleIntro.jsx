import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Container from '../components/Container';
import ClearButton from '../components/ClearButton';
import Input from '../components/Input';
import { boardContext } from '../contexts/BoardProvider';
import sampleInput from '../resources/sampleInput';

function SimpleIntro() {
  const [input, setInput] = React.useState(sampleInput);
  const [error, setError] = React.useState('');
  const [, setBoardInput] = React.useContext(boardContext);
  const history = useHistory();

  const handleSubmit = () => {
    try {
      setBoardInput(input);
      setError('');
      history.push('/main');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Container centered>
      <p>Input Board Data</p>
      {error.length > 0 && <p style={{ color: 'red' }}>{error} </p>}
      <Input
        id="data"
        type="text"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <ClearButton onClick={handleSubmit}>Enter</ClearButton>
    </Container>
  );
}

export default SimpleIntro;
