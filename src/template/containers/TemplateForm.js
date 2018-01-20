import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import { Input, Button, Error, Control, Group } from '../../shared/components/theme';
import Example, { ExampleWrap } from '../components/Example';
import examples from '../../shared/examples.json';

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
      <Control
        label="File"
        help="Upload the file you wish to use."
      >
        <Field
          name="file"
          type="file"
          accept=".doc,.docx,.ppt,.pptx"
          component={ Input }
        />
      </Control>
      <Control
        label="Templates"
        help="Or choose from one of our templates."
      >
        <ExampleWrap>
          { examples.map(document => (
            <Example
              key={ document.id }
              document={ document }
              handleSelect={ console.log }
            />
          )) }
        </ExampleWrap>
      </Control>
    </div>
    { problem && <Error problem={ problem } /> }
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
