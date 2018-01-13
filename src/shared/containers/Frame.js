import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { redirectUnauthenticatedGuard } from '../../guards';
import { attemptGetWorkspaces, currentWorkspace } from '../../workspace/workspace.reducer';
import { modalCampaign } from '../campaign.reducer';
import { MODAL_SETTINGS, MODAL_SHARE, MODAL_WORKSPACE } from '../shared.constants';
import { Container } from '../components/theme/index';
import Header from './Header';
import Footer from '../components/Footer';
import TemplateList from '../../template/containers/TemplateList';
import ShareModal from '../../player/containers/ShareModal';
import SettingsModal from '../../player/containers/SettingsModal';
import SpaceModal from '../../workspace/containers/SpaceModal';

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
      return (
        <div>
          This is to be a splace screen.
          <br />
          We do not want to render the other view yet because it relies on workspace being loaded.
        </div>
      );
    }
    return (
      <div>
        <Header />
        <Container>
          <Switch>
            <Route path="/templates" exact component={ TemplateList } />
            <Redirect to="/templates" />
          </Switch>
        </Container>
        <Footer />
        { modal && modal === MODAL_SHARE && <ShareModal
          handleClose={ () => this.props.modalCampaign() }
        /> }
        { modal && modal === MODAL_SETTINGS && <SettingsModal
          handleClose={ () => this.props.modalCampaign() }
        /> }
        { modal && modal === MODAL_WORKSPACE && <SpaceModal
          handleClose={ () => this.props.modalCampaign() }
        /> }
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
