import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { redirectUnauthenticatedGuard } from '../../guards';
import { attemptGetWorkspaces, currentWorkspace } from '../../workspace/workspace.reducer';
import { Container } from '../components/theme/index';
import Header from './Header';
import Footer from '../components/Footer';
import TemplateList from '../../template/containers/TemplateList';
import ShareModal from '../../player/containers/ShareModal';
import SettingsModal from '../../player/containers/SettingsModal';
import { MODAL_SETTINGS, MODAL_SHARE } from '../shared.constants';

class Frame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: null,
    };
  }

  componentDidMount() {
    this.props.attemptGetWorkspaces();
  }

  componentWillReceiveProps({ workspace, workspaces }) {
    if (!workspace && workspaces && workspaces.length) {
      this.props.currentWorkspace(workspaces[0]);
    }
  }

  handleModal({ modal = null } = {}) {
    this.setState({ modal });
  }

  render() {
    const { workspace } = this.props;
    const { modal } = this.state;
    return (
      <DocumentTitle title="Document Templates | Rumblum">
        <div>
          <Header
            handleShare={ () => this.handleModal({ modal: MODAL_SHARE }) }
            handleSettings={ () => this.handleModal({ modal: MODAL_SETTINGS }) }
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
            handleClose={ () => this.handleModal() }
          /> }
          { modal && modal === MODAL_SETTINGS && <SettingsModal
            handleClose={ () => this.handleModal() }
          /> }
        </div>
      </DocumentTitle>
    );
  }

}

Frame.propTypes = {
  attemptGetWorkspaces: PropTypes.func.isRequired,
  currentWorkspace: PropTypes.func.isRequired,
  workspaces: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

Frame.defaultProps = {
  workspace: null,
};

const mapStateToProps = ({
  workspace: { workspaces, current },
}) => ({
  workspaces,
  workspace: current,
});
const mapDispatchToProps = { attemptGetWorkspaces, currentWorkspace };
export default compose(
  redirectUnauthenticatedGuard,
  connect(mapStateToProps, mapDispatchToProps),
)(Frame);
