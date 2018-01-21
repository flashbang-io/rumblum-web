import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import changeCase from 'change-case';
import { Input, Button, Error, Control, Group } from '../../shared/components/theme';

const DefaultsForm = ({ handleSubmit, tags, loading, problem }) => {
  const inputs = tags.filter(({ type }) => ['string', 'open', 'negated'].indexOf(type) >= 0)
    .map((tag) => ({
      ...tag,
      type: tag.type === 'string' ? 'text' : 'checkbox',
      title: changeCase.titleCase(tag.name),
    }));
  return (
    <Form onSubmit={ handleSubmit }>
      <div>
        { inputs.map(({ title, name, type, origin }) => (
          <Control
            key={ name }
            label={ title }
            help={ origin }
          >
            <Field
              name={ `data.${origin}` }
              type={ type }
              placeholder={ title }
              component={ Input }
            />
          </Control>
        )) }
      </div>
      { problem && <Error problem={ problem } /> }
      <Group>
        <Button float type="submit" disabled={ loading }>{ loading ? 'Loading...' : 'Save' }</Button>
      </Group>
    </Form>
  );
};

DefaultsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  problem: PropTypes.shape({
    message: PropTypes.string,
  }),
  tags: PropTypes.array.isRequired,
};

DefaultsForm.defaultProps = {
  problem: null,
};

export default reduxForm({ form: 'defaults' })(DefaultsForm);