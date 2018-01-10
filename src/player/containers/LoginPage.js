import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { redirectAuthenticatedGuard } from '../../guards';
import { attemptLoginPlayer, erroredPlayer } from '../player.reducer';
import { Container, Title, Button } from '../../shared/components/theme';
import LoginForm from './LoginForm';
import Page from '../components/Page';

class LoginPage extends Component {

  componentWillUnmount() {
    this.props.erroredPlayer(); // clear errors
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptLoginPlayer();
  }

  render() {
    return (
      <Page>
        <Container>
          <Title>Login</Title>
          <LoginForm
            handleSubmit={ event => this.handleSubmit(event) }
            { ...this.props }
          />
          <Button to="/register">Sign Up</Button>
          <Button to="/forgot">Forgot Password</Button>
        </Container>
      </Page>
    );
  }

}

LoginPage.propTypes = {
  attemptLoginPlayer: PropTypes.func.isRequired,
  erroredPlayer: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  player: { loading, problem },
}) => ({ loading, problem });
const mapDispatchToProps = { attemptLoginPlayer, erroredPlayer };
export default compose(
  redirectAuthenticatedGuard,
  connect(mapStateToProps, mapDispatchToProps),
)(LoginPage);
