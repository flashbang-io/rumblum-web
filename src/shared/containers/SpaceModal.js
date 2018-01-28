import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tabCampaign } from '../../shared/campaign.reducer';
import { Modal } from '../../shared/components/theme';
import Popup, { Tab } from '../../shared/components/Popup';
import {
  MODAL_SPACE_TAB_BILLING,
  MODAL_SPACE_TAB_MEMBERS,
  MODAL_SPACE_TAB_EDIT,
  MODAL_SPACE_TAB_PLAN,
} from '../shared.constants';
import BillingTab from '../../player/containers/BillingTab';
import SpaceTab from '../../workspace/containers/SpaceTab';
import PlanTab from '../../workspace/containers/PlanTab';
import MemberTab from '../../membership/containers/MemberTab';

const SpaceModal = ({ active, ...props }) => (
  <Modal handleClose={ props.handleClose }>
    <Popup
      tabs
      active={ active }
      handleTab={ (...args) => props.tabCampaign(...args) }
    >
      <Tab
        id={ MODAL_SPACE_TAB_EDIT }
        title="Workspace"
        icon="suitcase"
        component={ SpaceTab }
      />
      <Tab
        id={ MODAL_SPACE_TAB_MEMBERS }
        title="Members"
        icon="users"
        component={ MemberTab }
      />
      <Tab
        id={ MODAL_SPACE_TAB_PLAN }
        title="Plan"
        icon="trophy"
        component={ PlanTab }
      />
      <Tab
        id={ MODAL_SPACE_TAB_BILLING }
        title="Billing"
        icon="credit-card"
        component={ BillingTab }
      />
    </Popup>
  </Modal>
);

SpaceModal.propTypes = {
  tabCampaign: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
};

const mapStateToProps = ({
  campaign: { tab },
}) => ({ active: tab });
const mapDispatchToProps = {
  tabCampaign,
};
export default connect(mapStateToProps, mapDispatchToProps)(SpaceModal);
