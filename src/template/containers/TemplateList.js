import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { attemptGetTemplates, attemptGetTemplate, currentTemplate } from '../template.reducer';
import { modalCampaign, tabCampaign } from '../../shared/campaign.reducer';
import Templates from '../components/Templates';
import Usage from '../components/Usage';
import { MODAL_SPACE, MODAL_SPACE_TAB_PLAN } from '../../shared/shared.constants';

class TemplateList extends Component {

  componentDidMount() {
    this.props.attemptGetTemplates(this.props.workspace.id);
  }

  componentWillReceiveProps({ workspace }) {
    if (this.props.workspace && workspace && this.props.workspace.id !== workspace.id) {
      this.props.attemptGetTemplates(workspace.id);
    }
  }

  handleOpen({ id, modal, tab }) {
    if (id) {
      // set with temp data while waits to return with full item
      this.props.currentTemplate(this.props.templates.find(template => template.id === id));
      this.props.attemptGetTemplate(id);
    }
    if (tab) {
      this.props.tabCampaign(tab);
    }
    this.props.modalCampaign(modal);
  }

  render() {
    const { usage, workspace } = this.props;
    return (
      <div>
        <Usage
          handleUpgrade={ () => this.handleOpen({ modal: MODAL_SPACE, tab: MODAL_SPACE_TAB_PLAN }) }
          workspace={ workspace }
          { ...usage }
        />
        <Templates
          handleOpen={ (...args) => this.handleOpen(...args) }
          { ...this.props }
        />
      </div>
    );
  }

}

TemplateList.propTypes = {
  attemptGetTemplates: PropTypes.func.isRequired,
  attemptGetTemplate: PropTypes.func.isRequired,
  currentTemplate: PropTypes.func.isRequired,
  modalCampaign: PropTypes.func.isRequired,
  tabCampaign: PropTypes.func.isRequired,
  templates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  usage: PropTypes.shape({
    total: PropTypes.number.isRequired,
    usage: PropTypes.number.isRequired,
  }),
};

TemplateList.defaultProps = {
  usage: null,
};

const mapStateToProps = ({
  template: { templates, loading },
  workspace,
}) => ({
  templates,
  loading,
  workspace: workspace.current,
  usage: workspace.usage,
});
const mapDispatchToProps = { attemptGetTemplates, attemptGetTemplate, currentTemplate, modalCampaign, tabCampaign };
export default connect(mapStateToProps, mapDispatchToProps)(TemplateList);
