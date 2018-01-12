import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { redirectUnauthenticatedGuard } from '../../guards';
import { attemptGetWorkspaces, currentWorkspace } from '../../workspace/workspace.reducer';
import { modalCampaign, tabCampaign } from '../campaign.reducer';
import { Container } from '../components/theme/index';
import Header from './Header';
import Footer from '../components/Footer';
import TemplateList from '../../template/containers/TemplateList';
import ShareModal from '../../player/containers/ShareModal';
import SettingsModal from '../../player/containers/SettingsModal';
import { MODAL_SETTINGS, MODAL_SHARE } from '../shared.constants';

class Frame extends Component {

  componentDidMount() {
    this.props.attemptGetWorkspaces();
  }

  componentWillReceiveProps({ workspace, workspaces }) {
    if (!workspace && workspaces && workspaces.length) {
      this.props.currentWorkspace(workspaces[0]);
    }
  }

  handleSettings({ tab }) {
    this.props.modalCampaign(MODAL_SETTINGS);
    this.props.tabCampaign(tab);
  }

  render() {
    const { workspace, modal } = this.props;
    return (
      <DocumentTitle title="Document Templates | Rumblum">
        <div>
          <Header
            handleShare={ () => this.props.modalCampaign(MODAL_SHARE) }
            handleSettings={ (...args) => this.handleSettings(...args) }
          />
          <Container>
            { workspace && (
              <Switch>
                <Route path="/templates" exact component={ TemplateList } />
                <Redirect to="/templates" />
              </Switch>
            ) }
          </Container>
          <Footer />
          { modal && modal === MODAL_SHARE && <ShareModal
            handleClose={ () => this.props.modalCampaign() }
          /> }
          { modal && modal === MODAL_SETTINGS && <SettingsModal
            handleClose={ () => this.props.modalCampaign() }
          /> }
        </div>
      </DocumentTitle>
    );
  }

}

Frame.propTypes = {
  attemptGetWorkspaces: PropTypes.func.isRequired,
  currentWorkspace: PropTypes.func.isRequired,
  modalCampaign: PropTypes.func.isRequired,
  tabCampaign: PropTypes.func.isRequired,
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
  tabCampaign,
};
export default compose(
  redirectUnauthenticatedGuard,
  connect(mapStateToProps, mapDispatchToProps),
)(Frame);
