import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import changeCase from 'change-case';
import { Input, Button, Error, Control, Group } from '../../shared/components/theme';

const RenderForm = ({ handleSubmit, tags, loading, problem }) => {
  const inputs = tags.filter(({ type }) => type === 'string' || type === 'open')
    .map(({ type, name }) => ({
      name,
      type: type === 'open' ? 'checkbox' : 'text',
      title: changeCase.titleCase(name),
    }));
  return (
    <Form onSubmit={ handleSubmit }>
      <div>
        { inputs.map(({ title, name, type }) => (
          <Control
            key={ name }
            label={ title }
          >
            <Field
              name={ name }
              type={ type }
              placeholder={ title }
              component={ Input }
            />
          </Control>
        )) }
      </div>
      { problem && <Error>{ problem.message || problem }</Error> }
      <Group>
        <Button float type="submit" disabled={ loading }>{ loading ? 'Loading...' : 'Create' }</Button>
      </Group>
    </Form>
  );
};

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
