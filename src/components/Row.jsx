import styled from 'styled-components';

function getGridColumns({ children, align }) {
  if (align === 'right') {
    return `repeat(${children.length - 1}, 1fr) auto`;
  }
  if (align === 'left') {
    return `auto, repeat(${children.length - 1} 1fr)`;
  }
  return `repeat(${children.length}, 1fr)`;
}

const Row = styled.div`
  display: grid;
  grid-template-columns: ${getGridColumns};
  align-items: ${(props) => (props.center ? 'center' : 'stretch')};
  grid-gap: ${(props) => props.gap || '0rem'};
`;

export default Row;
