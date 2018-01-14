import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { attemptGetTemplates, currentTemplate } from '../template.reducer';
import { modalCampaign, tabCampaign } from '../../shared/campaign.reducer';
import Templates from '../components/Templates';
import { Spread, Info, Sidebar } from '../components/Info';
import { MODAL_TEMPLATE, MODAL_INSPECT, MODAL_INSPECT_TAB_EDIT } from '../../shared/shared.constants';

class TemplateList extends Component {

  componentDidMount() {
    this.props.attemptGetTemplates(this.props.workspace.id);
  }

  handleInspect({ id }) {
    this.props.currentTemplate(this.props.templates.find(template => template.id === id));
    this.props.tabCampaign(MODAL_INSPECT_TAB_EDIT);
    this.props.modalCampaign(MODAL_INSPECT);
  }

  render() {
    const articles = [{
      id: 1,
      title: 'Tesla Motors',
      sub: 'This app was inspired by the Tesla motor company.',
    }, {
      id: 2,
      title: 'Elon Musk',
      sub: 'Elon is a cool cat the does cool things.',
    }];
    return (
      <Spread>
        <Templates
          handleCreate={ () => this.props.modalCampaign(MODAL_TEMPLATE) }
          handleInspect={ (...args) => this.handleInspect(...args) }
          { ...this.props }
        />
        <Sidebar>
          { articles.map(article => <Info key={ article.id } article={ article } />) }
        </Sidebar>
      </Spread>
    );
  }

}

TemplateList.propTypes = {
  attemptGetTemplates: PropTypes.func.isRequired,
  currentTemplate: PropTypes.func.isRequired,
  modalCampaign: PropTypes.func.isRequired,
  tabCampaign: PropTypes.func.isRequired,
  templates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  template: { templates, loading },
  workspace,
}) => ({
  templates,
  loading,
  workspace: workspace.current,
});
const mapDispatchToProps = { attemptGetTemplates, currentTemplate, modalCampaign, tabCampaign };
export default connect(mapStateToProps, mapDispatchToProps)(TemplateList);
