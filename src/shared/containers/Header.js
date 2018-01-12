import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptLogoutPlayer } from '../../player/player.reducer';
import Bar from '../components/Header';

class Header extends Component {

  handleLogout() {
    this.props.attemptLogoutPlayer();
  }

  render() {
    return (
      <Bar
        handleLogout={ () => this.handleLogout() }
        { ...this.props }
      />
    );
  }
}

Header.propTypes = {
  attemptLogoutPlayer: PropTypes.func.isRequired,
  handleShare: PropTypes.func.isRequired,
  handleSettings: PropTypes.func.isRequired,
};

const mapStateToProps = ({ player }) => ({ player: player.current });
const mapDispatchToProps = { attemptLogoutPlayer };
export default connect(mapStateToProps, mapDispatchToProps)(Header);

