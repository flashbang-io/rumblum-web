import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import { Input, Button, Error, Control, Group } from '../../shared/components/theme';
import Example, { ExampleWrap } from '../components/Example';
import examples from '../../shared/examples.json';

const Examples = ({ input: { onChange, value } }) => (
  <ExampleWrap>
    { examples.map(document => (
      <Example
        key={ document.id }
        document={ document }
        handleSelect={ () => onChange(document) }
        active={ value && value.id === document.id }
      />
    )) }
  </ExampleWrap>
);

Examples.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
  }).isRequired,
};

class TemplateForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      custom: false,
    };
  }

  toggleCustom(status) {
    this.setState({ custom: status || !this.state.custom });
  }

  render() {
    const { handleSubmit, loading, problem } = this.props;
    const { custom } = this.state;
    return (
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
          { custom && (
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
          ) }
          { !custom && (
            <Control
              label="Templates"
              help="Or choose from one of our templates."
            >
              <Field
                name="template"
                component={ Examples }
              />
            </Control>
          ) }
        </div>
        { problem && <Error problem={ problem } /> }
        <Group>
          <Button onClick={ () => this.toggleCustom() }>{ custom ? 'Use Template' : 'Upload Custom File' }</Button>
          <Button float type="submit" disabled={ loading }>{ loading ? 'Loading...' : 'Create' }</Button>
        </Group>
      </Form>
    );
  }

}

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
