import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import DocumentTitle from 'react-document-title';
import { redirectAuthenticatedGuard } from '../../guards';
import { attemptCreatePlayer, cleanPlayer } from '../player.reducer';
import { Container, Title, Button } from '../../shared/components/theme';
import RegisterForm from './RegisterForm';
import Page from '../components/Page';

class RegisterPage extends Component {

  constructor(props) {
    super(props);
    const { email, first, last } = queryString.parse(props.location.search);
    this.state = {
      init: {
        email,
        firstName: first,
        lastName: last,
      },
    };
  }

  componentWillUnmount() {
    this.props.cleanPlayer();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptCreatePlayer()
      .then(({ error }) => !error && this.props.history.push('/templates'));
  }

  render() {
    return (
      <DocumentTitle title="Sign Up | Rumblum">
        <Page>
          <Container>
            <Title>Sign Up</Title>
            <RegisterForm
              handleSubmit={ event => this.handleSubmit(event) }
              initialValues={ this.state.init }
              { ...this.props }
            />
            <Button small="true" dull="true" to="/login">Login</Button>
          </Container>
        </Page>
      </DocumentTitle>
    );
  }

}

RegisterPage.propTypes = {
  attemptCreatePlayer: PropTypes.func.isRequired,
  cleanPlayer: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  player: { loading, problem },
}) => ({ loading, problem });
const mapDispatchToProps = { attemptCreatePlayer, cleanPlayer };
export default compose(
  redirectAuthenticatedGuard,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(RegisterPage);
