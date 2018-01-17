import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { attemptGetWorkspaces, attemptGetWorkspace, attemptCreateWorkspace } from '../workspace.reducer';
import { attemptGetTemplates } from '../../template/template.reducer';
import Spaces from '../components/Spaces';
import SpaceForm from './SpaceForm';

class SpaceList extends Component {

  componentDidMount() {
    this.props.attemptGetWorkspaces();
  }

  handleCreate(event) {
    event.preventDefault();
    this.props.attemptCreateWorkspace();
  }

  handleSelect(id) {
    this.props.attemptGetWorkspace(id)
      .then(workspace => workspace && this.props.attemptGetTemplates(id));
  }

  render() {
    const { workspaces } = this.props;
    return (
      <Spaces
        workspaces={ workspaces }
        handleSelect={ (...args) => this.handleSelect(...args) }
      >
        <SpaceForm
          handleSubmit={ (...args) => this.handleCreate(...args) }
        />
      </Spaces>
    );
  }

}

SpaceList.propTypes = {
  attemptGetWorkspaces: PropTypes.func.isRequired,
  attemptGetWorkspace: PropTypes.func.isRequired,
  attemptCreateWorkspace: PropTypes.func.isRequired,
  attemptGetTemplates: PropTypes.func.isRequired,
  workspaces: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = ({
  workspace: { workspaces, loading, problem },
}) => ({
  workspaces,
  loading,
  problem,
});
const mapDispatchToProps = { attemptGetWorkspaces, attemptGetWorkspace, attemptCreateWorkspace, attemptGetTemplates };
export default connect(mapStateToProps, mapDispatchToProps)(SpaceList);
