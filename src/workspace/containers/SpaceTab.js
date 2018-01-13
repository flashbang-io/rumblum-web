import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptUpdateWorkspace } from '../workspace.reducer';
import SpaceForm from './SpaceForm';

class SpaceTab extends Component {

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptUpdateWorkspace(this.props.workspace.id);
  }

  render() {
    const { workspace } = this.props;
    return (
      <SpaceForm
        handleSubmit={ event => this.handleSubmit(event) }
        initialValues={ workspace }
        { ...this.props }
      />
    );
  }

}

SpaceTab.propTypes = {
  attemptUpdateWorkspace: PropTypes.func.isRequired,
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  workspace: { current, loading, problem },
}) => ({ loading, problem, workspace: current });
const mapDispatchToProps = { attemptUpdateWorkspace };
export default connect(mapStateToProps, mapDispatchToProps)(SpaceTab);
