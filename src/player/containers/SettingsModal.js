import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptUpdatePlayer, attemptChangePassword, cleanPlayer } from '../player.reducer';
import { Heading, Subheading, Modal } from '../../shared/components/theme';
import SettingsForm from './SettingsForm';
import Popup, { Tab } from '../../shared/components/Popup';
import PasswordForm from './PasswordForm';
import {
  SETTINGS_TAB_PROFILE,
  SETTINGS_TAB_SECURITY,
  SETTINGS_TAB_BILLING,
} from '../../shared/shared.constants';

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

  render() {
    const { player, active } = this.props;
    return (
      <Modal handleClose={ this.props.handleClose }>
        <Popup tabs active={ active }>
          <Tab
            id={ SETTINGS_TAB_PROFILE }
            title="Profile"
            icon="cog"
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
            id={ SETTINGS_TAB_SECURITY }
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
            id={ SETTINGS_TAB_BILLING }
            title="Billing"
            icon="credit-card"
          >
            <Heading inverted flatten>Billing</Heading>
            <Subheading>Update your payment settings.</Subheading>
          </Tab>
        </Popup>
      </Modal>
    );
  }

}

SettingsModal.propTypes = {
  attemptUpdatePlayer: PropTypes.func.isRequired,
  attemptChangePassword: PropTypes.func.isRequired,
  cleanPlayer: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  player: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  player: { loading, problem, current },
}) => ({ loading, problem, player: current });
const mapDispatchToProps = { attemptUpdatePlayer, attemptChangePassword, cleanPlayer };
export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);
