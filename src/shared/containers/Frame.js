import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { redirectUnauthenticatedGuard } from '../../guards';
import { attemptGetWorkspaces, currentWorkspace } from '../../workspace/workspace.reducer';
import { modalCampaign } from '../campaign.reducer';
import { MODAL_SETTINGS, MODAL_SHARE, MODAL_TEMPLATE, MODAL_INSPECT, MODAL_RENDER } from '../shared.constants';
import { Container } from '../components/theme/index';
import Header from './Header';
import Footer from '../components/Footer';
import TemplateList from '../../template/containers/TemplateList';
import SpaceList from '../../workspace/containers/SpaceList';
import ShareModal from '../../player/containers/ShareModal';
import SettingsModal from './SettingsModal';
import InspectModal from './InspectModal';
import TemplateModal from '../../template/containers/TemplateModal';
import RenderModal from '../../render/containers/RenderModal';
import Splash from '../components/Splash';

class Frame extends Component {

  componentDidMount() {
    this.props.attemptGetWorkspaces();
  }

  componentWillReceiveProps({ workspace, workspaces }) {
    if (!workspace && workspaces && workspaces.length) {
      this.props.currentWorkspace(workspaces[0]);
    }
  }

  render() {
    const { workspace, modal } = this.props;
    if (!workspace) {
      return <Splash />;
    }
    return (
      <div>
        <Header />
        <Container>
          <Switch>
            <Route path="/templates" exact component={ TemplateList } />
            <Route path="/workspaces" exact component={ SpaceList } />
            <Redirect to="/templates" />
          </Switch>
        </Container>
        <Footer />
        { modal && modal === MODAL_SHARE && <ShareModal handleClose={ () => this.props.modalCampaign() } /> }
        { modal && modal === MODAL_SETTINGS && <SettingsModal handleClose={ () => this.props.modalCampaign() } /> }
        { modal && modal === MODAL_TEMPLATE && <TemplateModal handleClose={ () => this.props.modalCampaign() } /> }
        { modal && modal === MODAL_INSPECT && <InspectModal handleClose={ () => this.props.modalCampaign() } /> }
        { modal && modal === MODAL_RENDER && <RenderModal handleClose={ () => this.props.modalCampaign() } /> }
      </div>
    );
  }

}

Frame.propTypes = {
  attemptGetWorkspaces: PropTypes.func.isRequired,
  currentWorkspace: PropTypes.func.isRequired,
  modalCampaign: PropTypes.func.isRequired,
  workspaces: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  modal: PropTypes.string,
};

Frame.defaultProps = {
  workspace: null,
  modal: null,
};

const mapStateToProps = ({
  workspace: { workspaces, current },
  campaign: { modal },
}) => ({
  workspaces,
  workspace: current,
  modal,
});
const mapDispatchToProps = {
  attemptGetWorkspaces,
  currentWorkspace,
  modalCampaign,
};
export default compose(
  redirectUnauthenticatedGuard,
  connect(mapStateToProps, mapDispatchToProps),
)(Frame);
