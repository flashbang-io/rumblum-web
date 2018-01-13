import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cleanPlayer } from '../../player/player.reducer';
import { tabCampaign } from '../../shared/campaign.reducer';
import { Modal } from '../../shared/components/theme';
import Popup, { Tab } from '../../shared/components/Popup';
import {
  MODAL_SETTINGS_TAB_PROFILE,
  MODAL_SETTINGS_TAB_SECURITY,
  MODAL_SETTINGS_TAB_BILLING,
} from '../shared.constants';
import SettingsTab from '../../player/containers/SettingsTab';
import PasswordTab from '../../player/containers/PasswordTab';
import BillingTab from '../../player/containers/BillingTab';

class SettingsModal extends Component {

  componentWillUnmount() {
    this.props.cleanPlayer();
  }

  render() {
    const { active } = this.props;
    return (
      <Modal handleClose={ this.props.handleClose }>
        <Popup
          tabs
          active={ active }
          handleTab={ (...args) => this.props.tabCampaign(...args) }
        >
          <Tab
            id={ MODAL_SETTINGS_TAB_PROFILE }
            title="Profile"
            icon="user"
            component={ SettingsTab }
          />
          <Tab
            id={ MODAL_SETTINGS_TAB_SECURITY }
            title="Security"
            icon="lock"
            component={ PasswordTab }
          />
          <Tab
            id={ MODAL_SETTINGS_TAB_BILLING }
            title="Billing"
            icon="credit-card"
            component={ BillingTab }
          />
        </Popup>
      </Modal>
    );
  }

}

SettingsModal.propTypes = {
  cleanPlayer: PropTypes.func.isRequired,
  tabCampaign: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
};

const mapStateToProps = ({
  player: { loading, problem, current },
  campaign: { tab },
}) => ({ loading, problem, player: current, active: tab });
const mapDispatchToProps = {
  cleanPlayer,
  tabCampaign,
};
export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);
