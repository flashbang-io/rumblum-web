import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import DocumentTitle from 'react-document-title';
import { redirectAuthenticatedGuard } from '../../guards';
import { attemptResetPassword, erroredPlayer } from '../player.reducer';
import { Container, Title, Button } from '../../shared/components/theme';
import ResetForm from './ResetForm';
import Page from '../components/Page';

class ResetPage extends Component {

  constructor(props) {
    super(props);
    const { email, token } = queryString.parse(props.location.search);
    this.state = { email, token };
  }

  componentWillUnmount() {
    this.props.erroredPlayer(); // clear errors
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptResetPassword(this.state.token);
  }

  render() {
    const { email } = this.state;
    return (
      <DocumentTitle title="Reset Password | Rumblum">
        <Page>
          <Container>
            <Title>Forgot Password</Title>
            <ResetForm
              handleSubmit={ event => this.handleSubmit(event) }
              initialValues={{ email }}
              email={ email }
              { ...this.props }
            />
            <Button to="/login">Login</Button>
          </Container>
        </Page>
      </DocumentTitle>
    );
  }

}

ResetPage.propTypes = {
  attemptResetPassword: PropTypes.func.isRequired,
  erroredPlayer: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  player: { loading, problem },
}) => ({ loading, problem });
const mapDispatchToProps = { attemptResetPassword, erroredPlayer };
export default compose(
  redirectAuthenticatedGuard,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ResetPage);
