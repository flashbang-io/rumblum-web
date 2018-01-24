import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { attemptGetWorkspaces, attemptGetWorkspace } from '../workspace.reducer';
import { attemptGetTemplates } from '../../template/template.reducer';
import { modalCampaign } from '../../shared/campaign.reducer';
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
    this.props.attemptGetWorkspace(id);
    this.props.attemptGetTemplates(id);
  }

  handleForm() {
    this.toggleShow();
    this.props.modalCampaign(MODAL_CREATE_SPACE);
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
  attemptGetTemplates,
  modalCampaign,
};
export default connect(mapStateToProps, mapDispatchToProps)(SpaceList);
