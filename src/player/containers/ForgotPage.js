import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { redirectAuthenticatedGuard } from '../../guards';
import { attemptForgotPassword, erroredPlayer } from '../player.reducer';
import { Container, Title, Button } from '../../shared/components/theme';
import ForgotForm from './ForgotForm';
import Page from '../components/Page';

class ForgotPage extends Component {

  componentWillUnmount() {
    this.props.erroredPlayer(); // clear errors
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptForgotPassword();
  }

  render() {
    return (
      <Page>
        <Container>
          <Title>Forgot Password</Title>
          <ForgotForm
            handleSubmit={ event => this.handleSubmit(event) }
            { ...this.props }
          />
          <Button to="/login">Login</Button>
          <Button to="/register">Sign Up</Button>
        </Container>
      </Page>
    );
  }

}

ForgotPage.propTypes = {
  attemptForgotPassword: PropTypes.func.isRequired,
  erroredPlayer: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  player: { loading, problem },
}) => ({ loading, problem });
const mapDispatchToProps = { attemptForgotPassword, erroredPlayer };
export default compose(
  redirectAuthenticatedGuard,
  connect(mapStateToProps, mapDispatchToProps),
)(ForgotPage);
