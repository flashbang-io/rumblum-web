import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import { Input, Button, Error } from '../../shared/components/theme';

const ResetForm = ({ handleSubmit, loading, problem, email }) => (
  <Form onSubmit={ handleSubmit }>
    { email && <Field
      name="email"
      type="email"
      placeholder="Email"
      component={ Input }
      disabled
    /> }
    <Field
      name="password"
      type="password"
      placeholder="Password"
      component={ Input }
    />
    { problem && <Error>{ problem.message || problem }</Error> }
    <Button type="submit" disabled={ loading }>{ loading ? 'Loading...' : 'Reset Password' }</Button>
  </Form>
);

ResetForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  problem: PropTypes.shape({
    message: PropTypes.string,
  }),
  email: PropTypes.string,
};

ResetForm.defaultProps = {
  problem: null,
  email: null,
};

export default reduxForm({ form: 'reset' })(ResetForm);
