import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptLogoutPlayer } from '../../player/player.reducer';
import { modalCampaign, tabCampaign } from '../campaign.reducer';
import HeaderProfile from '../components/HeaderProfile';

class Header extends Component {

  handleLogout() {
    this.props.attemptLogoutPlayer();
  }

  handleTabbed({ modal, tab }) {
    this.props.modalCampaign(modal);
    this.props.tabCampaign(tab);
  }

  render() {
    return (
      <HeaderProfile
        handleTabbed={ (...args) => this.handleTabbed(...args) }
        handleLogout={ () => this.handleLogout() }
        { ...this.props }
      />
    );
  }
}

Header.propTypes = {
  attemptLogoutPlayer: PropTypes.func.isRequired,
  modalCampaign: PropTypes.func.isRequired,
  tabCampaign: PropTypes.func.isRequired,
};

const mapStateToProps = ({ player }) => ({ player: player.current });
const mapDispatchToProps = {
  attemptLogoutPlayer,
  modalCampaign,
  tabCampaign,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);

