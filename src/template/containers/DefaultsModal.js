import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptUpdateTemplateDefaults, erroredTemplate } from '../template.reducer';
import { Heading, Modal } from '../../shared/components/theme';
import Popup from '../../shared/components/Popup';
import DefaultsForm from './DefaultsForm';
import LoadingCircles from '../../shared/components/LoadingCircles';

class DefaultsModal extends Component {

  componentWillUnmount() {
    this.props.erroredTemplate();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptUpdateTemplateDefaults(this.props.template.id);
  }

  render() {
    const { template, loading } = this.props;
    const tags = template && template.tags ? template.tags : [];
    const data = tags.reduce((accum, next) => ({
      ...accum,
      [next.origin]: next.placeholder || '',
    }), {});
    return (
      <Modal handleClose={ this.props.handleClose }>
        <Popup>
          <Heading inverted>Default Template Values</Heading>
          { loading ? <LoadingCircles space /> : template && <DefaultsForm
            handleSubmit={ event => this.handleSubmit(event) }
            initialValues={{ data }}
            tags={ template.tags || [] }
            { ...this.props }
          /> }
        </Popup>
      </Modal>
    );
  }

}

DefaultsModal.propTypes = {
  attemptUpdateTemplateDefaults: PropTypes.func.isRequired,
  erroredTemplate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  template: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  loading: PropTypes.bool.isRequired,
};

DefaultsModal.defaultProps = {
  template: null,
};

const mapStateToProps = ({
  template: { current, loading, problem },
}) => ({ loading, problem, template: current });
const mapDispatchToProps = { attemptUpdateTemplateDefaults, erroredTemplate };
export default connect(mapStateToProps, mapDispatchToProps)(DefaultsModal);
