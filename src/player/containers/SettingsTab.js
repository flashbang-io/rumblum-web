import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptUpdatePlayer, erroredPlayer } from '../player.reducer';
import SettingsForm from './SettingsForm';

class SettingsTab extends Component {

  componentWillUnmount() {
    this.props.erroredPlayer();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptUpdatePlayer(this.props.player.id);
  }

  render() {
    const { player } = this.props;
    return (
      <SettingsForm
        handleSubmit={ event => this.handleSubmit(event) }
        initialValues={ player }
        { ...this.props }
      />
    );
  }

}

SettingsTab.propTypes = {
  attemptUpdatePlayer: PropTypes.func.isRequired,
  erroredPlayer: PropTypes.func.isRequired,
  player: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  player: { current, loading, problem },
}) => ({ loading, problem, player: current });
const mapDispatchToProps = { attemptUpdatePlayer, erroredPlayer };
export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab);
