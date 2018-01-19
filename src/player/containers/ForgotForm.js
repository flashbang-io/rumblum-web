import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import { Input, Button, Error } from '../../shared/components/theme';

const ForgotForm = ({ handleSubmit, loading, problem }) => (
  <Form onSubmit={ handleSubmit }>
    <Field
      name="email"
      type="email"
      placeholder="Email"
      component={ Input }
    />
    { problem && <Error problem={ problem } /> }
    <Button type="submit" disabled={ loading }>{ loading ? 'Loading...' : 'Send Reset Email' }</Button>
  </Form>
);

ForgotForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  problem: PropTypes.shape({
    message: PropTypes.string,
  }),
};

ForgotForm.defaultProps = {
  problem: null,
};

export default reduxForm({ form: 'forgot' })(ForgotForm);
