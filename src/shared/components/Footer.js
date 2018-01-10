import React from 'react';
import styled from 'styled-components';
import { Container } from './theme';

const Wrap = styled.div`
  margin: 50px 0 0;
`;

const Content = styled.div`
  border-top: 1px solid ${props => props.theme.colors.off};
  color: ${props => props.theme.colors.offer};
  padding: 20px 0 50px;
  font-size: 11px;
  display: flex;
  align-items: center;
`;

const Copyright = styled.div`
  margin-right: auto;
`;

const Menu = styled.div`
  display: flex;
`;

const MenuItem = styled.div`
  margin-left: 10px;
  transition: .2s;
  &:hover {
    color: ${props => props.theme.colors.grey};
  }
`;

const Footer = () => (
  <Wrap>
    <Container>
      <Content>
        <Copyright>All rights reserved &copy; rumblum 2017</Copyright>
        <Menu>
          <MenuItem>About</MenuItem>
          <MenuItem>Learn</MenuItem>
          <MenuItem>Team</MenuItem>
        </Menu>
      </Content>
    </Container>
  </Wrap>
);

Footer.propTypes = {
};

Footer.defaultProps = {
};

export default Footer;
