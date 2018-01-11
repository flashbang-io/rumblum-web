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

class Frame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      share: false,
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

  toggleShare() {
    this.setState({ share: !this.state.share });
  }

  render() {
    const { workspace } = this.props;
    const { share } = this.state;
    return (
      <DocumentTitle title="Document Templates | Rumblum">
        <div>
          <Header
            onShare={ () => this.toggleShare() }
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
          { share && <ShareModal
            handleClose={ () => this.toggleShare() }
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
