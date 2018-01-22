import styled from 'styled-components';

export default styled.a`
  border-radius: ${props => props.theme.size.radius};
  background-color: ${props => props.theme.colors.darkless};
  border: 1px solid ${props => props.theme.colors.darker};
  color: ${props => props.theme.colors.grey};
  font-size: 17px;
  padding: 10px 10px;
  margin-left: 5px;
  text-decoration: none;
  display: flex; 
  align-items: center;
  justify-content: center;
  transition: .2s;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.darklesser};
  }
`;
