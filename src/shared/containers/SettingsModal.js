import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Elements } from 'react-stripe-elements';
import { attemptUpdatePlayer, attemptChangePassword, attemptUpdateBilling, cleanPlayer, loadingPlayer } from '../../player/player.reducer';
import { tabCampaign } from '../../shared/campaign.reducer';
import { Heading, Subheading, Modal } from '../../shared/components/theme';
import Popup, { Tab } from '../../shared/components/Popup';
import {
  MODAL_SETTINGS_TAB_PROFILE,
  MODAL_SETTINGS_TAB_SECURITY,
  MODAL_SETTINGS_TAB_BILLING,
} from '../shared.constants';
import PasswordForm from '../../player/containers/PasswordForm';
import BillingForm from '../../player/containers/BillingForm';
import SettingsForm from '../../player/containers/SettingsForm';

class SettingsModal extends Component {

  componentWillUnmount() {
    this.props.cleanPlayer();
  }

  handleUpdate(event) {
    event.preventDefault();
    this.props.attemptUpdatePlayer(this.props.player.id);
  }

  handleChangePassword(event) {
    event.preventDefault();
    this.props.attemptChangePassword(this.props.player.id);
  }

  handleToken(token) {
    this.props.attemptUpdateBilling(this.props.player.id, token);
  }

  render() {
    const { player, active } = this.props;
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
          >
            <Heading inverted flatten>Profile</Heading>
            <Subheading>Edit your profile settings.</Subheading>
            <SettingsForm
              handleSubmit={ event => this.handleUpdate(event) }
              initialValues={ player }
              { ...this.props }
            />
          </Tab>
          <Tab
            id={ MODAL_SETTINGS_TAB_SECURITY }
            title="Security"
            icon="lock"
          >
            <Heading inverted flatten>Security</Heading>
            <Subheading>Edit your profile settings.</Subheading>
            <PasswordForm
              handleSubmit={ event => this.handleChangePassword(event) }
              { ...this.props }
            />
          </Tab>
          <Tab
            id={ MODAL_SETTINGS_TAB_BILLING }
            title="Billing"
            icon="credit-card"
          >
            <Heading inverted flatten>Billing</Heading>
            <Subheading>Update your payment settings.</Subheading>
            <Elements>
              <BillingForm
                handleSubmit={ event => this.handleBilling(event) }
                player={ player }
                handleToken={ (...args) => this.handleToken(...args) }
                handleLoading={ (...args) => this.props.loadingPlayer(...args) }
                { ...this.props }
              />
            </Elements>
          </Tab>
        </Popup>
      </Modal>
    );
  }

}

SettingsModal.propTypes = {
  attemptUpdatePlayer: PropTypes.func.isRequired,
  attemptChangePassword: PropTypes.func.isRequired,
  attemptUpdateBilling: PropTypes.func.isRequired,
  cleanPlayer: PropTypes.func.isRequired,
  loadingPlayer: PropTypes.func.isRequired,
  tabCampaign: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  player: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  player: { loading, problem, current },
  campaign: { tab },
}) => ({ loading, problem, player: current, active: tab });
const mapDispatchToProps = {
  attemptUpdatePlayer,
  attemptChangePassword,
  attemptUpdateBilling,
  cleanPlayer,
  loadingPlayer,
  tabCampaign,
};
export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);
