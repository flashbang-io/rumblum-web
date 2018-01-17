import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { attemptGetWorkspaces } from '../workspace.reducer';
import { Segment, Coloured, Workspaces } from '../components/Space';

class SpaceList extends Component {

  componentDidMount() {
    this.props.attemptGetWorkspaces();
  }

  render() {
    const { workspaces } = this.props;
    return (
      <Workspaces>
        { workspaces.map(({ id, name }) => (
          <Coloured key={ id }>{ name }</Coloured>
        )) }
        <Segment>Create New Workspace</Segment>
      </Workspaces>
    );
  }

}

SpaceList.propTypes = {
  attemptGetWorkspaces: PropTypes.func.isRequired,
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
const mapDispatchToProps = { attemptGetWorkspaces };
export default connect(mapStateToProps, mapDispatchToProps)(SpaceList);
