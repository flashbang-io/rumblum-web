import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cleanPlayer } from '../../player/player.reducer';
import { tabCampaign } from '../campaign.reducer';
import { Modal } from '../components/theme';
import Popup, { Tab } from '../components/Popup';
import { MODAL_INSPECT_TAB_EDIT, MODAL_INSPECT_TAB_CHRONICLES } from '../shared.constants';
import TemplateTab from '../../template/containers/TemplateTab';
import ChronicleList from '../../chronicle/containers/ChronicleList';

const InspectModal = ({ active, handleClose, ...props }) => (
  <Modal handleClose={ handleClose }>
    <Popup
      tabs
      active={ active }
      handleTab={ (...args) => props.tabCampaign(...args) }
    >
      <Tab
        id={ MODAL_INSPECT_TAB_EDIT }
        title="Edit Template"
        icon="edit"
        component={ TemplateTab }
      />
      <Tab
        id={ MODAL_INSPECT_TAB_CHRONICLES }
        title="Versions"
        icon="history"
        component={ ChronicleList }
      />
    </Popup>
  </Modal>
);

InspectModal.propTypes = {
  tabCampaign: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
};

const mapStateToProps = ({
  player: { loading, problem, current },
  campaign: { tab },
}) => ({ loading, problem, player: current, active: tab });
const mapDispatchToProps = {
  cleanPlayer,
  tabCampaign,
};
export default connect(mapStateToProps, mapDispatchToProps)(InspectModal);
