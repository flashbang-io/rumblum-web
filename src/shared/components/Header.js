import React from 'react';
import styled from 'styled-components';
import { Container, Icon } from './theme';

const Wrap = styled.div`
  background-color: ${props => props.theme.colors.dark};
  border-bottom: 1px solid ${props => props.theme.colors.darker};
  color: ${props => props.theme.colors.off};
`;

const Content = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 12px;
  text-transform: uppercase;
`;

const Brand = styled.div`
  font-weight: bold;
  font-size: 13px;
  span {
    font-size: 11px;
    color: ${props => props.theme.colors.grey};
  }
`;

const Menu = styled.div`
  margin-left: auto;
  display: flex;
`;

const MenuItem = styled.div`
  margin-left: 10px;
  transition: .2s;
  padding: 5px 7px;
  border-radius: ${props => props.theme.size.radius};
  i {
    margin-right: 3px;
  }
  &:hover {
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.darkless};
  }
`;

const Header = () => (
  <Wrap>
    <Container>
      <Content>
        <Brand>
          Rumblum
          <br />
          <span>Document Templates</span>
        </Brand>
        <Menu>
          <MenuItem>
            Templates
          </MenuItem>
          <MenuItem>
            <Icon name="cog" /> Settings
          </MenuItem>
        </Menu>
      </Content>
    </Container>
  </Wrap>
);

Header.propTypes = {
};

Header.defaultProps = {
};

export default Header;
