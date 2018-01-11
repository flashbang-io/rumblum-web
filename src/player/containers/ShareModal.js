import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptSharePlayer, erroredPlayer } from '../player.reducer';
import { Heading, Modal } from '../../shared/components/theme';
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
    return (
      <Modal>
        <Popup>
          <Heading inverted>Share</Heading>
          <ShareForm
            handleSubmit={ event => this.handleSubmit(event) }
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
};

const mapStateToProps = ({
  player: { loading, problem },
}) => ({ loading, problem });
const mapDispatchToProps = { attemptSharePlayer, erroredPlayer };
export default connect(mapStateToProps, mapDispatchToProps)(SharePage);
