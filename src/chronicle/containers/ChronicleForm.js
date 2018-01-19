import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import { Input, Button, Error, Control, Group } from '../../shared/components/theme';

const ChronicleForm = ({ handleSubmit, loading, problem }) => (
  <Form onSubmit={ handleSubmit }>
    <div>
      <Control
        label="Update File"
        help="Upload the new file you wish to use."
      >
        <Field
          name="file"
          type="file"
          accept=".doc,.docx,.ppt,.pptx"
          component={ Input }
        />
      </Control>
    </div>
    { problem && <Error problem={ problem } /> }
    <Group>
      <Button float type="submit" disabled={ loading }>{ loading ? 'Loading...' : 'Upload' }</Button>
    </Group>
  </Form>
);

ChronicleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  problem: PropTypes.shape({
    message: PropTypes.string,
  }),
};

ChronicleForm.defaultProps = {
  problem: null,
};

export default reduxForm({ form: 'chronicle' })(ChronicleForm);
