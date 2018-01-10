import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { attemptGetTemplates } from '../template.reducer';

class TemplateList extends Component {

  componentDidMount() {
    this.props.attemptGetTemplates(this.props.workspace.id);
  }

  render() {
    const { templates } = this.props;
    return (
      <ul>
        { templates.map(template => <li key={ template.id }>{ template.name }</li>) }
      </ul>
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
  template: { templates },
  workspace,
}) => ({
  templates,
  workspace: workspace.current,
});
const mapDispatchToProps = { attemptGetTemplates };
export default connect(mapStateToProps, mapDispatchToProps)(TemplateList);
