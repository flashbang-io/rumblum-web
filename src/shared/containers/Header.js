import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptLogoutPlayer } from '../../player/player.reducer';
import { modalCampaign, tabCampaign } from '../campaign.reducer';
import { MODAL_SETTINGS, MODAL_SHARE } from '../shared.constants';
import Bar from '../components/Header';

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
      <Bar
        handleShare={ () => this.props.modalCampaign(MODAL_SHARE) }
        handleSettings={ ({ tab }) => this.handleTabbed({ tab, modal: MODAL_SETTINGS }) }
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

