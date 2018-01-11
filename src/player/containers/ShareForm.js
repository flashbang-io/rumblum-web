import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, FieldArray, Form } from 'redux-form';
import { Input, Button, Error, Control } from '../../shared/components/theme';

const PersonFields = ({ fields }) => (
  <div>
    { fields.map((person, index) => (
      <div key={ index }>
        <Control
          label="Email"
          help="This is how we contact them."
        >
          <Field
            name={ `${person}.email` }
            type="email"
            placeholder="john@example.com.au"
            component={ Input }
          />
        </Control>
        <Control
          label="Name"
          help="Help us be personal."
        >
          <Field
            name={ `${person}.name` }
            type="text"
            placeholder="John Blogs"
            component={ Input }
          />
        </Control>
        <Button tiny onClick={ () => fields.remove(index) }>Remove Person</Button>
      </div>
    )) }
    <Button tiny onClick={ () => fields.push({}) }>Add Person</Button>
  </div>
);

PersonFields.propTypes = {
  fields: PropTypes.any.isRequired,
};

const ShareForm = ({ handleSubmit, loading, problem }) => (
  <Form onSubmit={ handleSubmit }>
    <FieldArray name="emails" component={ PersonFields } />
    { problem && <Error>{ problem.message || problem }</Error> }
    <Button float type="submit" disabled={ loading }>{ loading ? 'Loading...' : 'Share' }</Button>
  </Form>
);

ShareForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  problem: PropTypes.shape({
    message: PropTypes.string,
  }),
};

ShareForm.defaultProps = {
  problem: null,
};

export default reduxForm({ form: 'share' })(ShareForm);
