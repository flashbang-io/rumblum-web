import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptCreateWorkspace, erroredWorkspace } from '../workspace.reducer';
import { Heading, Modal } from '../../shared/components/theme';
import Popup from '../../shared/components/Popup';
import CreateSpaceForm from './CreateSpaceForm';

class CreateSpaceModal extends Component {

  componentWillUnmount() {
    this.props.erroredWorkspace();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptCreateWorkspace()
      .then(({ error }) => !error && this.props.handleClose());
  }

  render() {
    return (
      <Modal handleClose={ this.props.handleClose }>
        <Popup thin>
          <Heading inverted>New Workspace</Heading>
          <CreateSpaceForm
            handleSubmit={ event => this.handleSubmit(event) }
            { ...this.props }
          />
        </Popup>
      </Modal>
    );
  }

}

CreateSpaceModal.propTypes = {
  attemptCreateWorkspace: PropTypes.func.isRequired,
  erroredWorkspace: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  workspace: { loading, problem },
}) => ({ loading, problem });
const mapDispatchToProps = { attemptCreateWorkspace, erroredWorkspace };
export default connect(mapStateToProps, mapDispatchToProps)(CreateSpaceModal);
