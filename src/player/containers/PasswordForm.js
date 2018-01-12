import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import { Input, Button, Error, Control, Group } from '../../shared/components/theme';

const PasswordForm = ({ handleSubmit, loading, problem }) => (
  <Form onSubmit={ handleSubmit }>
    <div>
      <Control
        label="Old Password"
        help="Please provide your current password."
      >
        <Field
          name="oldPassword"
          type="password"
          placeholder="Old Password"
          component={ Input }
        />
      </Control>
      <Control
        label="New Password"
        help="Make sure your password contains both characters and symbols."
      >
        <Field
          name="newPassword"
          type="password"
          placeholder="Old Password"
          component={ Input }
        />
      </Control>
    </div>
    { problem && <Error>{ problem.message || problem }</Error> }
    <Group>
      <Button float type="submit" disabled={ loading }>{ loading ? 'Loading...' : 'Update' }</Button>
    </Group>
  </Form>
);

PasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  problem: PropTypes.shape({
    message: PropTypes.string,
  }),
};

PasswordForm.defaultProps = {
  problem: null,
};

export default reduxForm({ form: 'password' })(PasswordForm);
