import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import { Input, Button, Error, Control, Group } from '../../shared/components/theme';

const SpaceForm = ({ handleSubmit, loading, problem }) => (
  <Form onSubmit={ handleSubmit }>
    <div>
      <Control
        label="Name"
        help="The name of your team or workspace."
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
      <Button float type="submit" disabled={ loading }>{ loading ? 'Loading...' : 'Save' }</Button>
    </Group>
  </Form>
);

SpaceForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  problem: PropTypes.shape({
    message: PropTypes.string,
  }),
};

SpaceForm.defaultProps = {
  problem: null,
};

export default reduxForm({ form: 'workspace' })(SpaceForm);
