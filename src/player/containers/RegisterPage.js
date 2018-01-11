import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { redirectAuthenticatedGuard } from '../../guards';
import { attemptCreatePlayer, erroredPlayer } from '../player.reducer';
import { Container, Title, Button } from '../../shared/components/theme';
import RegisterForm from './RegisterForm';
import Page from '../components/Page';

class RegisterPage extends Component {

  componentWillUnmount() {
    this.props.erroredPlayer(); // clear errors
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptCreatePlayer();
  }

  render() {
    return (
      <DocumentTitle title="Sign Up | Rumblum">
        <Page>
          <Container>
            <Title>Sign Up</Title>
            <RegisterForm
              handleSubmit={ event => this.handleSubmit(event) }
              { ...this.props }
            />
            <Button to="/login">Login</Button>
          </Container>
        </Page>
      </DocumentTitle>
    );
  }

}

RegisterPage.propTypes = {
  attemptCreatePlayer: PropTypes.func.isRequired,
  erroredPlayer: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  player: { loading, problem },
}) => ({ loading, problem });
const mapDispatchToProps = { attemptCreatePlayer, erroredPlayer };
export default compose(
  redirectAuthenticatedGuard,
  connect(mapStateToProps, mapDispatchToProps),
)(RegisterPage);
