import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spread, Sidebar, Main } from '../components/Sidebar';
import SpaceList from '../../workspace/containers/SpaceList';
import TemplateList from '../../template/containers/TemplateList';

const MainPage = ({ workspace }) => (
  <Spread>
    <Sidebar>
      <SpaceList />
    </Sidebar>
    <Main>
      { workspace && <TemplateList /> }
    </Main>
  </Spread>
);

MainPage.propTypes = {
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

MainPage.defaultProps = {
  workspace: null,
};

const mapStateToProps = ({
  workspace,
}) => ({
  workspace: workspace.current,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
