import styled from 'styled-components';
import Base from './Base';

const Teleport = styled(Base)`
  background: ${(props) => props.theme.accent};
`;

Teleport.defaultProps = {
  theme: {
    accent: 'blue',
  },
};

export default Teleport;
