import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { attemptGetWorkspaces, attemptGetWorkspace } from '../workspace.reducer';
import { attemptGetTemplates } from '../../template/template.reducer';
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
    // it's important to load the workspace first, even if it's at the cost of speed
    // this is so that a user will no be shown templates for a workspaces that can't load
    this.props.attemptGetWorkspace(id)
      .then(({ error }) => error ? { error } : this.props.attemptGetTemplates(id))
      .then(({ error }) => !error && this.toggleShow());
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
  attemptGetTemplates: PropTypes.func.isRequired,
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
  template,
}) => ({
  workspaces,
  loading: loading || template.loading,
  problem,
  workspace: current,
});
const mapDispatchToProps = {
  attemptGetWorkspaces,
  attemptGetWorkspace,
  attemptGetTemplates,
  modalCampaign,
  tabCampaign,
};
export default connect(mapStateToProps, mapDispatchToProps)(SpaceList);
