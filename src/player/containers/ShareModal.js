import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptSharePlayer, erroredPlayer } from '../player.reducer';
import { Heading, Subheading, Modal } from '../../shared/components/theme';
import ShareForm from './ShareForm';
import Popup from '../../shared/components/Popup';

class SharePage extends Component {

  componentWillUnmount() {
    this.props.erroredPlayer(); // clear errors
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptSharePlayer();
  }

  render() {
    const values = {
      message: `Hi,
      
I wanted to share a cool little app I found that I think you may be interested in.`,
      people: [{}],
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

SharePage.propTypes = {
  attemptSharePlayer: PropTypes.func.isRequired,
  erroredPlayer: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  player: { loading, problem },
}) => ({ loading, problem });
const mapDispatchToProps = { attemptSharePlayer, erroredPlayer };
export default connect(mapStateToProps, mapDispatchToProps)(SharePage);
