import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptUpdateTemplate } from '../template.reducer';
import SimpleForm from './SimpleForm';

class SettingsTab extends Component {

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptUpdateTemplate(this.props.template.id);
  }

  render() {
    const { template } = this.props;
    return (
      <SimpleForm
        handleSubmit={ event => this.handleSubmit(event) }
        initialValues={ template }
        { ...this.props }
      />
    );
  }

}

SettingsTab.propTypes = {
  attemptUpdateTemplate: PropTypes.func.isRequired,
  template: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  template: { current, loading, problem },
}) => ({ loading, problem, template: current });
const mapDispatchToProps = { attemptUpdateTemplate };
export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab);
