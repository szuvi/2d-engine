import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  ${(props) => props.fullscreen && 'height: 100vh; width: 100vw;'}
  ${(props) => props.centered && 'margin: 0 auto'};
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${(props) => props.gap ?? '0.5rem'};
  place-items: center;
`;

export default Container;
