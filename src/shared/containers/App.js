import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { attemptCheckPlayer } from '../../player/player.reducer';
import config from '../../config';
import LoginPage from '../../player/containers/LoginPage';
import RegisterPage from '../../player/containers/RegisterPage';
import ForgotPage from '../../player/containers/ForgotPage';
import ResetPage from '../../player/containers/ResetPage';
import RenderPage from '../../render/containers/RenderPage';
import Frame from './Frame';
import Splash from '../components/Splash';
import Preview from './Preview';
import Helpers from './Helpers';

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
      return <Splash />;
    }
    return (
      <div>
        <Switch>
          <Route path="/login" component={ LoginPage } />
          <Route path="/register" component={ RegisterPage } />
          <Route path="/forgot" component={ ForgotPage } />
          <Route path="/reset" component={ ResetPage } />
          <Route path="/preview" component={ Preview } />
          <Route path="/share/:templateId" component={ RenderPage } />
          <Route path="/" component={ Frame } />
          <Redirect to="/templates" />
        </Switch>
        <Helpers />
      </div>
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
