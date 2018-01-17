import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import { Input, Button, Error, Control, Group } from '../../shared/components/theme';

const SimpleForm = ({ handleSubmit, loading, problem }) => (
  <Form onSubmit={ handleSubmit }>
    <div>
      <Control
        label="Name"
        help="This helps you identify the template."
      >
        <Field
          name="name"
          type="text"
          placeholder="Proposal"
          component={ Input }
        />
      </Control>
      <Control
        label="Default Filename"
        help="The name of rendered documents. Custom tags e.g. {example} will appear in the render form."
      >
        <Field
          name="filename"
          type="text"
          placeholder="my-{example}-file"
          component={ Input }
        />
      </Control>
      <Control
        label="Public"
        help="Let anyone who has a link to the render form create documents."
      >
        <Field
          name="accessPublic"
          type="checkbox"
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

SimpleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  problem: PropTypes.shape({
    message: PropTypes.string,
  }),
};

SimpleForm.defaultProps = {
  problem: null,
};

export default reduxForm({ form: 'template' })(SimpleForm);
