import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, FieldArray, Form } from 'redux-form';
import { Input, Button, Error, Group, Icon, Control } from '../../shared/components/theme';

const PersonFields = ({ fields }) => (
  <div>
    <Button small onClick={ () => fields.push({}) }>Add Person</Button>
    { fields.map((person, index) => (
      <Group space key={ index }>
        <Field
          name={ `${person}.firstName` }
          type="text"
          placeholder="First Name"
          component={ Input }
        />
        <Field
          name={ `${person}.lastName` }
          type="text"
          placeholder="Last Name (Optional)"
          component={ Input }
        />
        <Field
          name={ `${person}.email` }
          type="email"
          placeholder="Email"
          style={{ minWidth: '45%' }}
          component={ Input }
        />
        { fields && fields.length > 1 && (
          <Button info onClick={ () => fields.remove(index) }>
            <Icon name="close" />
          </Button>
        ) }
      </Group>
    )) }
  </div>
);

PersonFields.propTypes = {
  fields: PropTypes.any.isRequired,
};

const ShareForm = ({ handleSubmit, loading, problem }) => (
  <Form onSubmit={ handleSubmit }>
    <FieldArray name="people" component={ PersonFields } />
    <div>
      <Control
        label="Message"
        help="Write a personal message so that they know it's from you."
      >
        <Field
          name="message"
          type="textarea"
          placeholder="Message..."
          component={ Input }
        />
      </Control>
    </div>
    { problem && <Error>{ problem.message || problem }</Error> }
    <Group>
      <Button float type="submit" disabled={ loading }>{ loading ? 'Loading...' : 'Send' }</Button>
    </Group>
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
