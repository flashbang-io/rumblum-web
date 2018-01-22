import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptCreateTemplate, erroredTemplate } from '../template.reducer';
import { Heading, Modal } from '../../shared/components/theme';
import Popup from '../../shared/components/Popup';
import TemplateForm from './TemplateForm';

class TemplateModal extends Component {

  componentWillUnmount() {
    this.props.erroredTemplate();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptCreateTemplate(this.props.workspace.id)
      .then(({ error }) => !error && this.props.handleClose());
  }

  render() {
    return (
      <Modal handleClose={ this.props.handleClose }>
        <Popup>
          <Heading inverted>New Template</Heading>
          <TemplateForm
            handleSubmit={ event => this.handleSubmit(event) }
            { ...this.props }
          />
        </Popup>
      </Modal>
    );
  }

}

TemplateModal.propTypes = {
  attemptCreateTemplate: PropTypes.func.isRequired,
  erroredTemplate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  template: { loading, problem },
  workspace,
}) => ({ loading, problem, workspace: workspace.current });
const mapDispatchToProps = { attemptCreateTemplate, erroredTemplate };
export default connect(mapStateToProps, mapDispatchToProps)(TemplateModal);
