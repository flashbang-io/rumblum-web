import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import { Input, Button, Error, Control, Group, Icon } from '../../shared/components/theme';
import config from '../../config';
import ExternalLink from '../components/ExternalLink';

const SimpleForm = ({ handleSubmit, handleCopy, loading, problem, template: { accessPublic, id } }) => (
  <Form onSubmit={ handleSubmit }>
    <div>
      <Control
        label="Name"
        help="This helps you identify the template."
      >
        <Field
          name="name"
          type="text"
          placeholder="Proposal"
          component={ Input }
        />
      </Control>
      <Control
        label="Default Filename"
        help="The name of rendered documents. Custom tags e.g. {example} will appear in the render form."
      >
        <Field
          name="filename"
          type="text"
          placeholder="my-{example}-file"
          component={ Input }
        />
      </Control>
      <Control
        label="Public"
        help="Let anyone who has a link to the render form create documents."
      >
        <Field
          name="accessPublic"
          type="checkbox"
          component={ Input }
        />
      </Control>
      { accessPublic && (
        <Control
          label="Link"
          help="Share this link for others to create documents."
        >
          <Input readOnly id="share-link-copy" value={ `${config.url}/share/${id}` } />
          <ExternalLink href={ `${config.url}/share/${id}` } target="_blank">
            <Icon name="external-link" />
          </ExternalLink>
          <ExternalLink onClick={ () => handleCopy('share-link-copy') }>
            <Icon name="copy" />
          </ExternalLink>
        </Control>
      ) }
    </div>
    { problem && <Error>{ problem.message || problem }</Error> }
    <Group>
      <Button float type="submit" disabled={ loading }>{ loading ? 'Loading...' : 'Save' }</Button>
    </Group>
  </Form>
);

SimpleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleCopy: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  problem: PropTypes.shape({
    message: PropTypes.string,
  }),
  template: PropTypes.shape({
    id: PropTypes.string.isRequired,
    accessPublic: PropTypes.bool,
  }).isRequired,
};

SimpleForm.defaultProps = {
  problem: null,
};

export default reduxForm({ form: 'template' })(SimpleForm);
