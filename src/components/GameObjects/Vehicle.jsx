import styled from 'styled-components';
import Base from './Base';

const Vehicle = styled(Base)`
  background: ${(props) => props.theme.danger};
`;

Vehicle.defaultProps = {
  theme: {
    danger: 'red',
  },
};

export default Vehicle;
