import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptSharePlayer, cleanPlayer } from '../player.reducer';
import { Heading, Subheading, Modal } from '../../shared/components/theme';
import Popup from '../../shared/components/Popup';
import ShareForm from './ShareForm';

class ShareModal extends Component {

  componentWillUnmount() {
    this.props.cleanPlayer();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptSharePlayer();
  }

  render() {
    const values = {
      message: `Hi {firstName},

I wanted to share a cool little app I found that I think you may be interested in.`,
      contacts: [{}],
    };
    return (
      <Modal handleClose={ this.props.handleClose }>
        <Popup>
          <Heading inverted flatten>Share</Heading>
          <Subheading>Invite people to view rumblum to earn document credits.</Subheading>
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
  handleClose: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  player: { loading, problem },
}) => ({ loading, problem });
const mapDispatchToProps = { attemptSharePlayer, cleanPlayer };
export default connect(mapStateToProps, mapDispatchToProps)(ShareModal);
