import styled from 'styled-components';
import Base from './Base';

const Static = styled(Base)`
  background: ${(props) => props.theme.main};
`;

Static.defaultProps = {
  theme: {
    main: 'black',
  },
};

export default Static;
