import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cleanPlayer } from '../../player/player.reducer';
import { setChronicle } from '../../chronicle/chronicle.reducer';
import { setRender } from '../../render/render.reducer';
import { tabCampaign } from '../campaign.reducer';
import { Modal } from '../components/theme';
import Popup, { Tab } from '../components/Popup';
import { MODAL_INSPECT_TAB_EDIT, MODAL_INSPECT_TAB_CHRONICLES, MODAL_INSPECT_TAB_RENDERS, MODAL_INSPECT_TAB_FILE } from '../shared.constants';
import TemplateTab from '../../template/containers/TemplateTab';
import ChronicleList from '../../chronicle/containers/ChronicleList';
import RenderList from '../../render/containers/RenderList';
import ChronicleTab from '../../chronicle/containers/ChronicleTab';

class InspectModal extends Component {

  componentWillUnmount() {
    this.props.setChronicle();
    this.props.setRender();
  }

  render() {
    const { active, handleClose } = this.props;
    return (
      <Modal handleClose={ handleClose }>
        <Popup
          tabs
          active={ active }
          handleTab={ (...args) => this.props.tabCampaign(...args) }
        >
          <Tab
            id={ MODAL_INSPECT_TAB_EDIT }
            title="Edit"
            icon="edit"
            component={ TemplateTab }
          />
          <Tab
            id={ MODAL_INSPECT_TAB_FILE }
            title="File"
            icon="upload"
            component={ ChronicleTab }
          />
          <Tab
            id={ MODAL_INSPECT_TAB_CHRONICLES }
            title="Versions"
            icon="history"
            component={ ChronicleList }
          />
          <Tab
            id={ MODAL_INSPECT_TAB_RENDERS }
            title="Renders"
            icon="file-text-o"
            component={ RenderList }
          />
        </Popup>
      </Modal>
    );
  }

}

InspectModal.propTypes = {
  setChronicle: PropTypes.func.isRequired,
  setRender: PropTypes.func.isRequired,
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
  setChronicle,
  setRender,
};
export default connect(mapStateToProps, mapDispatchToProps)(InspectModal);
