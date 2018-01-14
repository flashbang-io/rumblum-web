import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { attemptGetTemplates } from '../template.reducer';
import Templates from '../components/Templates';
import { Spread, Info, Sidebar } from '../components/Info';

class TemplateList extends Component {

  componentDidMount() {
    this.props.attemptGetTemplates(this.props.workspace.id);
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
        <Templates { ...this.props } />
        <Sidebar>
          { articles.map(article => <Info key={ article.id } article={ article } />) }
        </Sidebar>
      </Spread>
    );
  }

}

TemplateList.propTypes = {
  attemptGetTemplates: PropTypes.func.isRequired,
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
const mapDispatchToProps = { attemptGetTemplates };
export default connect(mapStateToProps, mapDispatchToProps)(TemplateList);
