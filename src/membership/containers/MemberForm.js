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
        name="name"
        type="text"
        placeholder="Name"
        component={ Input }
      />
      <Field
        name="email"
        type="email"
        placeholder="Email"
        style={{ minWidth: '60%' }}
        component={ Input }
      />
      <Button type="submit" disabled={ loading }>{ loading ? 'Loading...' : 'Invite' }</Button>
    </Group>
    { problem && <Error>{ problem.message || problem }</Error> }
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
