import styled from 'styled-components';
import Base from './Base';

const Teleport = styled(Base)`
  background: ${(props) => props.theme.danger};
`;

Base.defaultProps = {
  theme: {
    danger: 'red',
  },
};

export default Teleport;
