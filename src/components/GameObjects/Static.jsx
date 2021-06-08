import styled from 'styled-components';
import Base from './Base';

const Static = styled(Base)`
  background: ${(props) => props.theme.main};
`;

Base.defaultProps = {
  theme: {
    main: '#000',
  },
};

export default Static;
