import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptUpdateWorkspace, attemptUpdateSubscription, cleanWorkspace } from '../workspace.reducer';
import { WORKSPACE_TAB_EDIT, WORKSPACE_TAB_BILLING } from '../workspace.constants';
import { tabCampaign } from '../../shared/campaign.reducer';
import { Heading, Modal } from '../../shared/components/theme';
import Popup, { Tab } from '../../shared/components/Popup';
import SpaceForm from './SpaceForm';
import MembershipForm from './MembershipForm';

class SpaceModal extends Component {

  componentWillUnmount() {
    this.props.cleanWorkspace();
  }

  handleUpdate(event) {
    event.preventDefault();
    this.props.attemptUpdateWorkspace(this.props.workspace.id);
  }

  handleSubscription(/* { plan } */) {
    // this.props.attemptUpdateSubscription(this.props.workspace.id, { plan });
  }

  render() {
    const { workspace, active } = this.props;
    return (
      <Modal handleClose={ this.props.handleClose }>
        <Popup
          tabs
          active={ active }
          handleTab={ (...args) => this.props.tabCampaign(...args) }
        >
          <Tab
            id={ WORKSPACE_TAB_EDIT }
            title="Workspace"
            icon="suitcase"
          >
            <Heading inverted>Workspace</Heading>
            <SpaceForm
              handleSubmit={ event => this.handleUpdate(event) }
              initialValues={ workspace }
              { ...this.props }
            />
          </Tab>
          <Tab
            id={ WORKSPACE_TAB_BILLING }
            title="Membership"
            icon="users"
          >
            <Heading inverted>Membership</Heading>
            <MembershipForm
              handleSubmit={ (...args) => this.handleSubscription(...args) }
              initialValues={ workspace }
              { ...this.props }
            />
          </Tab>
        </Popup>
      </Modal>
    );
  }

}

SpaceModal.propTypes = {
  attemptUpdateWorkspace: PropTypes.func.isRequired,
  attemptUpdateSubscription: PropTypes.func.isRequired,
  cleanWorkspace: PropTypes.func.isRequired,
  tabCampaign: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  active: PropTypes.string.isRequired,
};

const mapStateToProps = ({
  workspace: { loading, problem, current },
  campaign: { tab },
}) => ({ loading, problem, workspace: current, active: tab });
const mapDispatchToProps = {
  attemptUpdateWorkspace,
  attemptUpdateSubscription,
  cleanWorkspace,
  tabCampaign,
};
export default connect(mapStateToProps, mapDispatchToProps)(SpaceModal);
