import styled from 'styled-components';

export default styled.div`
  background-color: ${props => props.theme.colors.off};
  min-height: 100vh;
  padding: 30px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
