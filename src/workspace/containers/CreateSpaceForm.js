import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import { Input, Button, Error, Group, Control } from '../../shared/components/theme';

const CreateSpaceForm = ({ handleSubmit, loading, problem }) => (
  <Form onSubmit={ handleSubmit }>
    <div>
      <Control
        label="Name"
        help="Your team name."
      >
        <Field
          name="name"
          type="text"
          placeholder="Team Awesome"
          component={ Input }
        />
      </Control>
    </div>
    { problem && <Error problem={ problem } /> }
    <Group>
      <Button float type="submit" disabled={ loading }>{ loading ? 'Loading...' : 'Create' }</Button>
    </Group>
  </Form>
);

CreateSpaceForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  problem: PropTypes.shape({
    message: PropTypes.string,
  }),
};

CreateSpaceForm.defaultProps = {
  problem: null,
};

export default reduxForm({ form: 'workspace' })(CreateSpaceForm);
