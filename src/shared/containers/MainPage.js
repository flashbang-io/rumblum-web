import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { modalCampaign } from '../../shared/campaign.reducer';
import { Spread, Sidebar } from '../components/Sidebar';
import { MODAL_TEMPLATE } from '../../shared/shared.constants';
import { Icon, Button } from '../components/theme';
import SpaceList from '../../workspace/containers/SpaceList';
import TemplateList from '../../template/containers/TemplateList';

class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  toggleShow() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { workspace } = this.props;
    const { show } = this.state;
    return (
      <Spread>
        <Sidebar>
          { workspace && (
            <Button onClick={ () => this.props.modalCampaign(MODAL_TEMPLATE) }>
              <Icon name="plus" /> Template
            </Button>
          ) }
          <Button onClick={ () => this.toggleShow() }>Workspaces</Button>
          { show && (
            <SpaceList
              handleClose={ () => this.toggleShow() }
            />
          ) }
        </Sidebar>
        { workspace && <TemplateList /> }
      </Spread>
    );
  }

}

MainPage.propTypes = {
  modalCampaign: PropTypes.func.isRequired,
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
const mapDispatchToProps = { modalCampaign };
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
