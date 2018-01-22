import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import { Input, Button, Error } from '../../shared/components/theme';

const RegisterForm = ({ handleSubmit, loading, problem }) => (
  <Form onSubmit={ handleSubmit }>
    <Field
      name="firstName"
      type="text"
      placeholder="First Name"
      component={ Input }
    />
    <Field
      name="lastName"
      type="text"
      placeholder="Last Name"
      component={ Input }
    />
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
    { problem && <Error problem={ problem } /> }
    <Button type="submit" disabled={ loading }>{ loading ? 'Loading...' : 'Sign Up' }</Button>
  </Form>
);

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  problem: PropTypes.shape({
    message: PropTypes.string,
  }),
};

RegisterForm.defaultProps = {
  problem: null,
};

export default reduxForm({ form: 'register' })(RegisterForm);
