import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container, Icon } from '../components/theme';
import Dropdown, { DropItem } from './Dropdown';
import {
  MODAL_SETTINGS_TAB_PROFILE,
  MODAL_SETTINGS_TAB_SECURITY,
  MODAL_SETTINGS_TAB_BILLING,
  MODAL_SETTINGS_TAB_EDIT,
  MODAL_SETTINGS,
  MODAL_SHARE,
  MODAL_SPACE,
} from '../../shared/shared.constants';

const Wrap = styled.div`
  background-color: ${props => props.theme.colors.dark};
  border-bottom: 1px solid ${props => props.theme.colors.darker};
  color: ${props => props.theme.colors.off};
  margin: 0 0 50px;
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
  a {
    text-decoration: none;
  }
`;

const MenuItem = styled.div`
  margin-left: 10px;
  transition: .2s;
  padding: 5px 7px;
  cursor: pointer;
  position: relative;
  color: ${props => props.theme.colors.off};
  border-radius: ${props => props.theme.size.radius};
  i {
    margin-right: 3px;
  }
  &:hover {
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.darkless};
  }
`;

class HeaderBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  toggleDropdown() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { handleTabbed, handleLogout } = this.props;
    const { open } = this.state;
    return (
      <Wrap>
        <Container>
          <Content>
            <Brand>
              Rumblum
              <br />
              <span>Document Templates</span>
            </Brand>
            <Menu>
              <MenuItem onClick={ () => handleTabbed({ modal: MODAL_SHARE }) }>Share</MenuItem>
              <MenuItem onClick={ () => this.toggleDropdown() }>
                <Icon name="cog" /> Settings
                <Dropdown
                  handleClose={ () => this.toggleDropdown() }
                  active={ open }
                >
                  <DropItem onClick={ () => handleTabbed({ modal: MODAL_SETTINGS, tab: MODAL_SETTINGS_TAB_PROFILE }) }>
                    <Icon name="user" /> Profile
                  </DropItem>
                  <DropItem onClick={ () => handleTabbed({ modal: MODAL_SETTINGS, tab: MODAL_SETTINGS_TAB_SECURITY }) }>
                    <Icon name="lock" /> Security
                  </DropItem>
                  <DropItem onClick={ () => handleTabbed({ modal: MODAL_SETTINGS, tab: MODAL_SETTINGS_TAB_BILLING }) }>
                    <Icon name="credit-card" /> Billing
                  </DropItem>
                  <DropItem onClick={ () => handleTabbed({ modal: MODAL_SPACE, tab: MODAL_SETTINGS_TAB_EDIT }) }>
                    <Icon name="suitcase" /> Workspace
                  </DropItem>
                  <DropItem onClick={ handleLogout }>
                    <Icon name="sign-out" /> Logout
                  </DropItem>
                </Dropdown>
              </MenuItem>
            </Menu>
          </Content>
        </Container>
      </Wrap>
    );
  }
}

HeaderBar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  handleTabbed: PropTypes.func.isRequired,
};

export default HeaderBar;
