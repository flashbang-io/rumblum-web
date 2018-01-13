import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptUpdateWorkspace, attemptUpdateSubscription, cleanWorkspace } from '../../workspace/workspace.reducer';
import { tabCampaign } from '../../shared/campaign.reducer';
import { Heading, Modal } from '../../shared/components/theme';
import Popup, { Tab } from '../../shared/components/Popup';
import SpaceForm from '../../workspace/containers/SpaceForm';
import PlanForm from '../../workspace/containers/PlanForm';
import { MODAL_SPACE_TAB_EDIT, MODAL_SPACE_TAB_BILLING, MODAL_SPACE_TAB_MEMBERS } from '../shared.constants';
import MemberForm from '../../membership/containers/MemberForm';
import MemberList from '../../membership/containers/MemberList';

class SpaceModal extends Component {

  componentWillUnmount() {
    this.props.cleanWorkspace();
  }

  handleUpdate(event) {
    event.preventDefault();
    this.props.attemptUpdateWorkspace(this.props.workspace.id);
  }

  handleSubscription({ plan }) {
    console.log('Plan selected:', plan);
    // this.props.attemptUpdateSubscription(this.props.workspace.id, { plan });
  }

  handleMember(event) {
    event.preventDefault();
    console.log('Member added.');
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
            id={ MODAL_SPACE_TAB_EDIT }
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
            id={ MODAL_SPACE_TAB_BILLING }
            title="Plan"
            icon="trophy"
          >
            <Heading inverted>Plan</Heading>
            <PlanForm
              handleSubmit={ (...args) => this.handleSubscription(...args) }
              initialValues={ workspace }
              { ...this.props }
            />
          </Tab>
          <Tab
            id={ MODAL_SPACE_TAB_MEMBERS }
            title="Members"
            icon="users"
          >
            <Heading inverted>Members</Heading>
            <MemberList />
            <MemberForm
              handleSubmit={ (...args) => this.handleMember(...args) }
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
