import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container, Icon, Label } from '../components/theme';
import Dropdown, { DropItem } from './Dropdown';
import {
  MODAL_SETTINGS_TAB_PROFILE,
  MODAL_SETTINGS_TAB_SECURITY,
  MODAL_SETTINGS_TAB_BILLING,
  MODAL_SETTINGS_TAB_EDIT,
  MODAL_SETTINGS,
  MODAL_SHARE,
  MODAL_SPACE,
  MODAL_TEMPLATE,
} from '../../shared/shared.constants';

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Brand = styled.div`
  font-size: 14px;
  margin-left: auto;
  text-align: right;
  span {
    font-size: 12px;
    color: ${props => props.theme.colors.greyless};
  }
`;

const Menu = styled.div`
  display: flex;
  a {
    text-decoration: none;
  }
  & > * {
    margin-left: 10px;
  }
`;

const Profile = styled.div`
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.dark};
  border-radius: ${props => props.theme.size.radius};
  height: 50px;
  width: 50px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: .2s;
  &:hover {
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.darklesser};
  }
`;

class HeaderProfile extends Component {

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
    const { handleTabbed, handleLogout, player: { firstName, lastName, email } } = this.props;
    const { open } = this.state;
    return (
      <Container>
        <Content>
          <Brand>
            { firstName } { lastName }
            <br />
            <span>{ email }</span>
          </Brand>
          <Menu>
            <Label title="Invite New Users">
              <Profile onClick={ () => handleTabbed({ modal: MODAL_SHARE }) }>
                <Icon name="share-alt" />
              </Profile>
            </Label>
            <Label title="New Template">
              <Profile onClick={ () => handleTabbed({ modal: MODAL_TEMPLATE }) }>
                <Icon name="plus" />
              </Profile>
            </Label>
            <Label title="Settings" override={ open ? false : null }>
              <Profile onClick={ () => this.toggleDropdown() }>
                <Icon name="cog" />
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
              </Profile>
            </Label>
          </Menu>
        </Content>
      </Container>
    );
  }
}

HeaderProfile.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  handleTabbed: PropTypes.func.isRequired,
  player: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default HeaderProfile;
