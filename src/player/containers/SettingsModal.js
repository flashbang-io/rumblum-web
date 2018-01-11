import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptUpdatePlayer, erroredPlayer } from '../player.reducer';
import { Heading, Subheading, Modal } from '../../shared/components/theme';
import SettingsForm from './SettingsForm';
import Popup, { Tab } from '../../shared/components/Popup';

class SharePage extends Component {

  componentWillUnmount() {
    this.props.erroredPlayer(); // clear errors
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptUpdatePlayer(this.props.player.id);
  }

  render() {
    const { player } = this.props;
    return (
      <Modal handleClose={ this.props.handleClose }>
        <Popup tabs>
          <Tab title="Settings">
            <Heading inverted flatten>Settings</Heading>
            <Subheading>Edit your profile settings.</Subheading>
            <SettingsForm
              handleSubmit={ event => this.handleSubmit(event) }
              initialValues={ player }
              { ...this.props }
            />
          </Tab>
          <Tab title="Second">
            <Heading inverted flatten>Second Page</Heading>
            <Subheading>Edit your profile settings.</Subheading>
          </Tab>
        </Popup>
      </Modal>
    );
  }

}

SharePage.propTypes = {
  attemptUpdatePlayer: PropTypes.func.isRequired,
  erroredPlayer: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  player: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  player: { loading, problem, current },
}) => ({ loading, problem, player: current });
const mapDispatchToProps = { attemptUpdatePlayer, erroredPlayer };
export default connect(mapStateToProps, mapDispatchToProps)(SharePage);
