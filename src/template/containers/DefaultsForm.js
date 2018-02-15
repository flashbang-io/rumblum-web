import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import { Input, Button, Error, Control, Group } from '../../shared/components/theme';
import { tagsToInputs } from '../template.helper';

const DefaultsForm = ({ handleSubmit, tags, loading, problem }) => {
  const inputs = tagsToInputs(tags);
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
