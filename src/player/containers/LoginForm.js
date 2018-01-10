import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import { Input, Button, Error } from '../../shared/components/theme';

const LoginForm = ({ handleSubmit, loading, problem }) => (
  <Form onSubmit={ handleSubmit }>
    <Field
      name="email"
      type="email"
      placeholder="Email"
      component={ Input }
    />
    <Field
      name="password"
      type="password"
      placeholder="Password"
      component={ Input }
    />
    { problem && <Error>{ problem.message || problem }</Error> }
    <Button type="submit" disabled={ loading }>{ loading ? 'Loading...' : 'Login' }</Button>
  </Form>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  problem: PropTypes.shape({
    message: PropTypes.string,
  }),
};

LoginForm.defaultProps = {
  problem: null,
};

export default reduxForm({ form: 'credentials' })(LoginForm);
