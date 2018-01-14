import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptUpdateTemplate, attemptRemoveTemplate } from '../template.reducer';
import { modalCampaign } from '../../shared/campaign.reducer';
import SimpleForm from './SimpleForm';
import { Control } from '../../shared/components/theme';
import Button from '../../shared/components/theme/Button';

class SettingsTab extends Component {

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptUpdateTemplate(this.props.template.id);
  }

  handleDelete() {
    this.props.attemptRemoveTemplate(this.props.template.id)
      .then(() => this.props.modalCampaign());
  }

  render() {
    const { template } = this.props;
    return (
      <div>
        <SimpleForm
          handleSubmit={ event => this.handleSubmit(event) }
          initialValues={ template }
          { ...this.props }
        />
        <Control
          label="Delete Template"
          help="Warning, this can not be undone."
          upline
        >
          <Button danger onClick={ () => this.handleDelete() }>Delete</Button>
        </Control>
      </div>
    );
  }

}

SettingsTab.propTypes = {
  attemptUpdateTemplate: PropTypes.func.isRequired,
  attemptRemoveTemplate: PropTypes.func.isRequired,
  modalCampaign: PropTypes.func.isRequired,
  template: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  template: { current, loading, problem },
}) => ({ loading, problem, template: current });
const mapDispatchToProps = { attemptUpdateTemplate, attemptRemoveTemplate, modalCampaign };
export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab);
