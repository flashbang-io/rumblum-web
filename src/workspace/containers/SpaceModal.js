import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptUpdateWorkspace, cleanWorkspace } from '../workspace.reducer';
import { Heading, Subheading, Modal } from '../../shared/components/theme';
import Popup from '../../shared/components/Popup';
import SpaceForm from './SpaceForm';

class SpaceModal extends Component {

  componentWillUnmount() {
    this.props.cleanWorkspace();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptUpdateWorkspace(this.props.workspace.id);
  }

  render() {
    const { workspace } = this.props;
    return (
      <Modal handleClose={ this.props.handleClose }>
        <Popup>
          <Heading inverted>Workspace</Heading>
          <SpaceForm
            handleSubmit={ event => this.handleSubmit(event) }
            initialValues={ workspace }
            { ...this.props }
          />
        </Popup>
      </Modal>
    );
  }

}

SpaceModal.propTypes = {
  attemptUpdateWorkspace: PropTypes.func.isRequired,
  cleanWorkspace: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  workspace: { loading, problem, current },
}) => ({ loading, problem, workspace: current });
const mapDispatchToProps = { attemptUpdateWorkspace, cleanWorkspace };
export default connect(mapStateToProps, mapDispatchToProps)(SpaceModal);
