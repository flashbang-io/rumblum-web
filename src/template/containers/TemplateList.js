import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { attemptGetTemplates, attemptGetTemplate, currentTemplate } from '../template.reducer';
import { modalCampaign, tabCampaign } from '../../shared/campaign.reducer';
import Templates from '../components/Templates';
import { Spread, Info, Sidebar } from '../components/Info';
import { MODAL_TEMPLATE, MODAL_INSPECT, MODAL_INSPECT_TAB_EDIT, MODAL_RENDER } from '../../shared/shared.constants';
import { Icon, Button } from '../../shared/components/theme';

class TemplateList extends Component {

  componentDidMount() {
    this.props.attemptGetTemplates(this.props.workspace.id);
  }

  handleInspect({ id }) {
    this.props.currentTemplate(this.props.templates.find(template => template.id === id));
    this.props.tabCampaign(MODAL_INSPECT_TAB_EDIT);
    this.props.modalCampaign(MODAL_INSPECT);
  }

  handleRender({ id }) {
    this.props.attemptGetTemplate(id);
    this.props.modalCampaign(MODAL_RENDER);
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
          handleInspect={ (...args) => this.handleInspect(...args) }
          handleRender={ (...args) => this.handleRender(...args) }
          { ...this.props }
        />
        <Sidebar>
          <Button onClick={ () => this.props.modalCampaign(MODAL_TEMPLATE) }>
            <Icon name="plus" /> Template
          </Button>
          { articles.map(article => <Info key={ article.id } article={ article } />) }
        </Sidebar>
      </Spread>
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
const mapDispatchToProps = { attemptGetTemplates, attemptGetTemplate, currentTemplate, modalCampaign, tabCampaign };
export default connect(mapStateToProps, mapDispatchToProps)(TemplateList);
