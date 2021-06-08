import styled from 'styled-components';

const Base = styled.button`
  height: 1.5rem;
  width: 1.5rem;
  border: 1px solid ${(props) => props.theme.main};
  background: none;
  &:hover {
    background: ${(props) => (props.disabled ? 'none' : props.theme.main)};
    opacity: 50%;
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  }
  &:active {
    opacity: 100%;
  }
`;

Base.defaultProps = {
  theme: {
    main: '#000',
  },
};

export default Base;
