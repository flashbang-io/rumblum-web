import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { attemptGetWorkspaces, attemptGetWorkspace, attemptGetWorkspaceUsage } from '../workspace.reducer';
import { resetTemplate } from '../../template/template.reducer';
import { modalCampaign, tabCampaign } from '../../shared/campaign.reducer';
import Spaces from '../components/Spaces';
import { MODAL_CREATE_SPACE } from '../../shared/shared.constants';
import Prep, { SpaceWrap } from '../components/Prep';

class SpaceList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    this.props.attemptGetWorkspaces();
  }

  handleSelect(id) {
    this.props.resetTemplate();
    this.props.attemptGetWorkspace(id);
    this.props.attemptGetWorkspaceUsage(id);
  }

  handleForm() {
    this.toggleShow();
    this.props.modalCampaign(MODAL_CREATE_SPACE);
  }

  handleModal({ modal, tab }) {
    this.props.tabCampaign(tab);
    this.props.modalCampaign(modal);
  }

  toggleShow() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { show } = this.state;
    const { workspace } = this.props;
    return (
      <SpaceWrap>
        <Prep
          onClick={ () => this.toggleShow() }
          workspace={ workspace }
          handleModal={ (...args) => this.handleModal(...args) }
        />
        { show && <Spaces
          handleSelect={ (...args) => this.handleSelect(...args) }
          handleOpen={ () => this.handleForm() }
          handleClose={ () => this.toggleShow() }
          { ...this.props }
        /> }
      </SpaceWrap>
    );
  }

}

SpaceList.propTypes = {
  attemptGetWorkspaces: PropTypes.func.isRequired,
  attemptGetWorkspace: PropTypes.func.isRequired,
  attemptGetWorkspaceUsage: PropTypes.func.isRequired,
  resetTemplate: PropTypes.func.isRequired,
  modalCampaign: PropTypes.func.isRequired,
  tabCampaign: PropTypes.func.isRequired,
  workspaces: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

SpaceList.defaultProps = {
  workspace: null,
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
  attemptGetWorkspaceUsage,
  resetTemplate,
  modalCampaign,
  tabCampaign,
};
export default connect(mapStateToProps, mapDispatchToProps)(SpaceList);
