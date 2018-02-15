import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { redirectAuthenticatedGuard } from '../../guards';
import { attemptForgotPassword, cleanPlayer } from '../player.reducer';
import { Container, Title, Button, Group } from '../../shared/components/theme';
import ForgotForm from './ForgotForm';
import Page from '../components/Page';

class ForgotPage extends Component {

  componentWillUnmount() {
    this.props.cleanPlayer();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptForgotPassword();
  }

  render() {
    return (
      <DocumentTitle title="Forgot Password | Rumblum">
        <Page>
          <Container>
            <Title>Forgot Password</Title>
            <ForgotForm
              handleSubmit={ event => this.handleSubmit(event) }
              { ...this.props }
            />
            <Group>
              <Button small="true" dull="true" to="/login">Login</Button>
              <Button small="true" dull="true" to="/register">Sign Up</Button>
            </Group>
          </Container>
        </Page>
      </DocumentTitle>
    );
  }

}

ForgotPage.propTypes = {
  attemptForgotPassword: PropTypes.func.isRequired,
  cleanPlayer: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  player: { loading, problem },
}) => ({ loading, problem });
const mapDispatchToProps = { attemptForgotPassword, cleanPlayer };
export default compose(
  redirectAuthenticatedGuard,
  connect(mapStateToProps, mapDispatchToProps),
)(ForgotPage);
