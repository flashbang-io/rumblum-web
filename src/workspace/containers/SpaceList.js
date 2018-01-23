import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import PropTypes from 'prop-types';
import { attemptGetWorkspaces, attemptGetWorkspace } from '../workspace.reducer';
import { attemptGetTemplates } from '../../template/template.reducer';
import { modalCampaign } from '../../shared/campaign.reducer';
import Spaces from '../components/Spaces';
import { MODAL_CREATE_SPACE } from '../../shared/shared.constants';

class SpaceList extends Component {

  componentDidMount() {
    this.props.attemptGetWorkspaces();
  }

  handleClickOutside() {
    this.props.handleClose();
  }

  handleSelect(id) {
    this.props.attemptGetWorkspace(id);
    this.props.attemptGetTemplates(id);
  }

  handleForm() {
    this.props.handleClose();
    this.props.modalCampaign(MODAL_CREATE_SPACE);
  }

  render() {
    return (
      <Spaces
        handleSelect={ (...args) => this.handleSelect(...args) }
        handleOpen={ () => this.handleForm() }
        { ...this.props }
      />
    );
  }

}

SpaceList.propTypes = {
  attemptGetWorkspaces: PropTypes.func.isRequired,
  attemptGetWorkspace: PropTypes.func.isRequired,
  attemptGetTemplates: PropTypes.func.isRequired,
  modalCampaign: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
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
const mapDispatchToProps = {
  attemptGetWorkspaces,
  attemptGetWorkspace,
  attemptGetTemplates,
  modalCampaign,
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  onClickOutside,
)(SpaceList);
