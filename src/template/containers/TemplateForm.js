import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import { Input, Button, Error, Control, Group } from '../../shared/components/theme';

const TemplateForm = ({ handleSubmit, loading, problem }) => (
  <Form onSubmit={ handleSubmit }>
    <div>
      <Control
        label="Template Name"
        help="It helps to give a descriptive name."
      >
        <Field
          name="name"
          type="text"
          placeholder="Proposal"
          component={ Input }
        />
      </Control>
    </div>
    { problem && <Error>{ problem.message || problem }</Error> }
    <Group>
      <Button float type="submit" disabled={ loading }>{ loading ? 'Loading...' : 'Create' }</Button>
    </Group>
  </Form>
);

TemplateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  problem: PropTypes.shape({
    message: PropTypes.string,
  }),
};

TemplateForm.defaultProps = {
  problem: null,
};

export default reduxForm({ form: 'template' })(TemplateForm);
