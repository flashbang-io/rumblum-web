import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { attemptGetWorkspaces, attemptGetWorkspace, attemptCreateWorkspace } from '../workspace.reducer';
import { attemptGetTemplates } from '../../template/template.reducer';
import Spaces from '../components/Spaces';
import CreateForm from './CreateForm';

class SpaceList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: false,
    };
  }

  componentDidMount() {
    this.props.attemptGetWorkspaces();
  }

  handleCreate(event) {
    event.preventDefault();
    this.props.attemptCreateWorkspace()
      .then(workspace => workspace && this.toggleForm());
  }

  handleSelect(id) {
    this.props.attemptGetWorkspace(id)
      .then(workspace => workspace && this.props.attemptGetTemplates(id));
  }

  toggleForm(status) {
    this.setState({ form: status || !this.state.form });
  }

  render() {
    const { form } = this.state;
    return (
      <Spaces
        handleSelect={ (...args) => this.handleSelect(...args) }
        handleOpen={ () => this.toggleForm() }
        { ...this.props }
      >
        { form && <CreateForm
          handleSubmit={ (...args) => this.handleCreate(...args) }
          handleClose={ () => this.toggleForm() }
          { ...this.props }
        /> }
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
  workspace: { workspaces, loading, problem, current },
}) => ({
  workspaces,
  loading,
  problem,
  workspace: current,
});
const mapDispatchToProps = { attemptGetWorkspaces, attemptGetWorkspace, attemptCreateWorkspace, attemptGetTemplates };
export default connect(mapStateToProps, mapDispatchToProps)(SpaceList);
