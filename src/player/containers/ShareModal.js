import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptSharePlayer, cleanPlayer } from '../player.reducer';
import { modalCampaign } from '../../shared/campaign.reducer';
import { Heading, Subheading, Modal } from '../../shared/components/theme';
import Popup from '../../shared/components/Popup';
import ShareForm from './ShareForm';
import config from '../../config';

class ShareModal extends Component {

  componentWillUnmount() {
    this.props.cleanPlayer();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptSharePlayer()
      .then(({ error }) => !error && this.props.modalCampaign());
  }

  render() {
    const values = {
      message: `Hi {firstName},

I wanted to share a little app that I found, which I think you may be interested in.`,
      contacts: [{}],
    };
    return (
      <Modal handleClose={ this.props.handleClose }>
        <Popup>
          <Heading inverted flatten>Share</Heading>
          <Subheading>
            { config.beta ? 'Rumblum is currently "invite only" which means others can only use it if you invite them.' : 'Invite new members to use rumblum.' }
          </Subheading>
          <ShareForm
            handleSubmit={ event => this.handleSubmit(event) }
            initialValues={ values }
            { ...this.props }
          />
        </Popup>
      </Modal>
    );
  }

}

ShareModal.propTypes = {
  attemptSharePlayer: PropTypes.func.isRequired,
  cleanPlayer: PropTypes.func.isRequired,
  modalCampaign: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  player: { loading, problem },
}) => ({ loading, problem });
const mapDispatchToProps = { attemptSharePlayer, cleanPlayer, modalCampaign };
export default connect(mapStateToProps, mapDispatchToProps)(ShareModal);
