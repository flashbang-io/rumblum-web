import styled from 'styled-components';

export default styled.div`
  background-color: ${props => props.theme.colors.darkless};
  color: ${props => props.theme.colors.off};
  border-radius: ${props => props.theme.size.radius};
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
  padding: 20px 20px 10px;
`;
