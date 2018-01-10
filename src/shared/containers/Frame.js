import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { redirectUnauthenticatedGuard } from '../../guards';
import { attemptGetWorkspaces, setWorkspace } from '../../workspace/workspace.reducer';
import { Container } from '../components/theme/index';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TemplateList from '../../template/containers/TemplateList';

class Frame extends Component {

  componentDidMount() {
    this.props.attemptGetWorkspaces();
  }

  componentWillReceiveProps({ workspace, workspaces }) {
    if (!workspace && workspaces && workspaces.length) {
      this.props.setWorkspace(workspaces[0]);
    }
  }

  render() {
    const { workspace } = this.props;
    return (
      <div>
        <Header />
        <Container>
          { workspace && (
            <Switch>
              <Route path="/templates" exact component={ TemplateList } />
              <Redirect to="/templates" />
            </Switch>
          ) }
        </Container>
        <Footer />
      </div>
    );
  }

}

Frame.propTypes = {
  attemptGetWorkspaces: PropTypes.func.isRequired,
  setWorkspace: PropTypes.func.isRequired,
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
const mapDispatchToProps = { attemptGetWorkspaces, setWorkspace };
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  redirectUnauthenticatedGuard,
)(Frame);
