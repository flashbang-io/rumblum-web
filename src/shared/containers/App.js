import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { attemptCheckPlayer } from '../../player/player.reducer';
// import Login from '../../customer/containers/Login';
// import Register from '../../customer/containers/Register';
// import Forgot from '../../customer/containers/Forgot';
// import Reset from '../../customer/containers/Reset';
import { Container } from '../components/theme/index';
import Header from '../components/Header';
import Footer from '../components/Footer';
import config from '../../config';

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
      <div>
        <Header />
        <Container>
          <Switch>
            {/* <Route path="/login" component={ Login } />
            <Route path="/register" component={ Register } />
            <Route path="/forgot" component={ Forgot } />
            <Route path="/reset" component={ Reset } /> */}
            <Redirect to="/login" />
          </Switch>
        </Container>
        <Footer />
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