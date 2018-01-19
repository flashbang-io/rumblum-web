import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import onClickOutside from 'react-onclickoutside';
import { reduxForm, Field, Form } from 'redux-form';
import { Input, Button, Error, Group } from '../../shared/components/theme';
import { Popup } from '../components/Spaces';

class CreateForm extends Component {

  handleClickOutside() {
    this.props.handleClose();
  }

  render() {
    const { handleSubmit, loading, problem } = this.props;
    return (
      <Popup>
        <Form onSubmit={ handleSubmit }>
          <Field
            name="name"
            type="text"
            placeholder="Team Awesome"
            component={ Input }
          />
          { problem && <Error problem={ problem } /> }
          <Group>
            <Button float flatten small type="submit" disabled={ loading }>{ loading ? 'Loading...' : 'Create' }</Button>
          </Group>
        </Form>
      </Popup>
    );
  }

}

CreateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  problem: PropTypes.shape({
    message: PropTypes.string,
  }),
};

CreateForm.defaultProps = {
  problem: null,
};

export default compose(
  reduxForm({ form: 'workspace' }),
  onClickOutside,
)(CreateForm);
