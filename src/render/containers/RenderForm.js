import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import changeCase from 'change-case';
import { Input, Button, Error, Control, Group } from '../../shared/components/theme';

class RenderForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slide: 0,
      send: false,
    };
  }

  handleNext() {
    this.setState({ slide: this.state.slide + 1 });
  }

  handlePrevious() {
    const future = this.state.slide - 1;
    this.setState({ slide: future > 0 ? future : 0 });
  }

  handleSend(event, value) {
    this.setState({ send: value });
  }

  render() {
    const { slide, send } = this.state;
    const { handleSubmit, tags, loading, problem } = this.props;
    const inputs = tags.filter(({ type }) => ['string', 'open', 'negated'].indexOf(type) >= 0)
      .map(({ type, name, origin }) => ({
        name,
        type: type === 'string' ? 'text' : 'checkbox',
        title: changeCase.titleCase(name),
        origin,
      }));
    return (
      <Form onSubmit={ handleSubmit }>
        <div style={{ display: this.state.slide !== 0 && 'none' }}>
          { inputs.map(({ title, name, type, origin }) => (
            <Control
              key={ name }
              label={ title }
              help={ origin }
            >
              <Field
                name={ `data.${name}` }
                type={ type }
                placeholder={ title }
                component={ Input }
              />
            </Control>
          )) }
        </div>
        <div style={{ display: this.state.slide !== 1 && 'none' }}>
          <Control
            label="Convert To PDF"
            help="This will convert the document to a PDF format."
          >
            <Field
              name="pdf"
              type="checkbox"
              component={ Input }
            />
          </Control>
          <Control
            label="Custom Filename"
            help="Optionally add a custom name to this file."
          >
            <Field
              name="filename"
              type="text"
              placeholder="my-nice-file-{example}"
              component={ Input }
            />
          </Control>
          <Control
            label="Send As Email"
            help="Send as email rather than downloading."
          >
            <Field
              name="send"
              type="checkbox"
              component={ Input }
              onChange={ (...args) => this.handleSend(...args) }
            />
          </Control>
          <Control
            label="Email Addresses"
            help="Seperate multiple addresses with commas."
          >
            <Field
              name="emails"
              type="text"
              placeholder="jack@example.com, joe@example.com"
              component={ Input }
              disabled={ !send }
            />
          </Control>
          <Control
            label="Message"
            help={ `Include a custom message with your emails. You can include any of the following tags: ${inputs.map(({ origin }) => origin).join(', ')}.` }
          >
            <Field
              name="message"
              type="textarea"
              placeholder="Hi {firstName}, here is your document."
              component={ Input }
              disabled={ !send }
            />
          </Control>
        </div>
        { problem && <Error>{ problem.message || problem }</Error> }
        <Group>
          { slide < 1 && <Button float onClick={ () => this.handleNext() }>Next</Button> }
          { slide > 0 && <Button onClick={ () => this.handlePrevious() }>Back</Button> }
          { slide > 0 && <Button float type="submit" disabled={ loading }>{ loading ? 'Loading...' : 'Create' }</Button> }
        </Group>
      </Form>
    );
  }

}

RenderForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  problem: PropTypes.shape({
    message: PropTypes.string,
  }),
  tags: PropTypes.array.isRequired,
};

RenderForm.defaultProps = {
  problem: null,
};

export default reduxForm({ form: 'render' })(RenderForm);
