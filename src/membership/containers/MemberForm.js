import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import { Input, Button, Error, Group, Control } from '../../shared/components/theme';

const MemberForm = ({ handleSubmit, loading, problem }) => (
  <Form onSubmit={ handleSubmit }>
    <Control
      noline
      label="New Member"
      help="Invite some new members to use this workspace."
    />
    <Group>
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
        style={{ minWidth: '220px' }}
        component={ Input }
      />
    </Group>
    { problem && <Error>{ problem.message || problem }</Error> }
    <br />
    <Group>
      <Button float type="submit" disabled={ loading }>{ loading ? 'Loading...' : 'Invite' }</Button>
    </Group>
  </Form>
);

MemberForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  problem: PropTypes.shape({
    message: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  problem: null,
};

export default reduxForm({ form: 'share' })(MemberForm);
