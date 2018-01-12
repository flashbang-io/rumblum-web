import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import { Input, Button, Error, Control, Group } from '../../shared/components/theme';

const SettingsForm = ({ handleSubmit, loading, problem }) => (
  <Form onSubmit={ handleSubmit }>
    <div>
      <Control
        label="Email"
        help="This will be used for logging in."
      >
        <Field
          name="email"
          type="email"
          placeholder="Email"
          component={ Input }
        />
      </Control>
      <Control
        label="First Name"
      >
        <Field
          name="firstName"
          type="text"
          placeholder="Fred"
          component={ Input }
        />
      </Control>
      <Control
        label="Last Name"
      >
        <Field
          name="lastName"
          type="text"
          placeholder="Blogs"
          component={ Input }
        />
      </Control>
      <Control
        label="Business Name"
        help="Can leave blank if you're not a business."
      >
        <Field
          name="businessName"
          type="text"
          placeholder="Business"
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

SettingsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  problem: PropTypes.shape({
    message: PropTypes.string,
  }),
};

SettingsForm.defaultProps = {
  problem: null,
};

export default reduxForm({ form: 'player' })(SettingsForm);
