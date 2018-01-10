import styled from 'styled-components';

export const Wrap = styled.div`
  background-color: ${props => props.theme.colors.dark};
  border-bottom: 1px solid ${props => props.theme.colors.darker};
  color: ${props => props.theme.colors.off};
`;

export const Content = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 12px;
  text-transform: uppercase;
`;

export const Brand = styled.div`
  font-weight: bold;
  font-size: 13px;
  span {
    font-size: 11px;
    color: ${props => props.theme.colors.grey};
  }
`;

export const Menu = styled.div`
  margin-left: auto;
  display: flex;
`;

export const MenuItem = styled.div`
  margin-left: 10px;
  transition: .2s;
  padding: 5px 7px;
  cursor: pointer;
  border-radius: ${props => props.theme.size.radius};
  i {
    margin-right: 3px;
  }
  &:hover {
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.darkless};
  }
`;
