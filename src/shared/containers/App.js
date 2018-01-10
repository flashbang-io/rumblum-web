import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { attemptCheckPlayer } from '../../player/player.reducer';
import config from '../../config';
// import Login from '../../customer/containers/Login';
// import Register from '../../customer/containers/Register';
// import Forgot from '../../customer/containers/Forgot';
// import Reset from '../../customer/containers/Reset';
import Frame from './Frame';

class App extends Component {

  componentDidMount() {
    this.props.attemptCheckPlayer();
    if (config.intercom) {
      // window.Intercom('boot', { app_id: config.intercom });
    }
  }

  componentDidUpdate({ location }) {
    if (location !== this.props.location && config.intercom) {
      // window.Intercom('update');
    }
  }

  render() {
    const { checked } = this.props;
    if (!checked) {
      return <div>{ checked } Loading app - replace with splace screen...</div>;
    }
    return (
      <Switch>
        {/* <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/forgot" component={ Forgot } />
        <Route path="/reset" component={ Reset } /> */}
        <Route path="/" component={ Frame } />
        <Redirect to="/templates" />
      </Switch>
    );
  }
}

App.propTypes = {
  attemptCheckPlayer: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ player: { checked } }) => ({ checked });
const mapDispatchToProps = { attemptCheckPlayer };
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App);
