import styled from 'styled-components';

export default styled.div`
  padding: 50px 0;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: ${props => props.theme.colors.darkless};
  color: ${props => props.theme.colors.off};
`;
