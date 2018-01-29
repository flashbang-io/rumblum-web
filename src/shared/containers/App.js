import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import queryString from 'query-string';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { attemptCheckPlayer, attemptLogoutPlayer } from '../../player/player.reducer';
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
import Pending from '../components/Pending';
import BetaFlag from '../components/BetaFlag';

class App extends Component {

  constructor(props) {
    super(props);
    const { redirect } = queryString.parse(props.location.search);
    if (props.location.pathname === '/' && redirect) {
      this.props.history.push(redirect);
    }
  }

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

  handleLogout() {
    this.props.attemptLogoutPlayer();
  }

  render() {
    const { checked, player } = this.props;
    return (
      <div>
        { !checked ? (
          <Splash />
        ) : player && !player.invitation ? (
          <Pending
            handleLogout={ () => this.handleLogout() }
            { ...this.props }
          />
        ) : (
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
        ) }
        { config.beta && <BetaFlag /> }
      </div>
    );
  }
}

App.propTypes = {
  attemptCheckPlayer: PropTypes.func.isRequired,
  attemptLogoutPlayer: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  player: PropTypes.shape({
    pending: PropTypes.bool,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

App.defaultProps = {
  player: null,
};

const mapStateToProps = ({ player: { checked, current, loading } }) => ({ checked, player: current, loading });
const mapDispatchToProps = { attemptCheckPlayer, attemptLogoutPlayer };
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App);
