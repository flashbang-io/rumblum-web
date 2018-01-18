import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptUpdateTemplate, attemptRemoveTemplate } from '../template.reducer';
import { modalCampaign } from '../../shared/campaign.reducer';
import SimpleForm from './SimpleForm';
import { Control, Button, Group } from '../../shared/components/theme';

class SettingsTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sure: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptUpdateTemplate(this.props.template.id);
  }

  handleDelete() {
    if (this.state.sure) {
      this.props.attemptRemoveTemplate(this.props.template.id)
        .then(templateId => templateId && this.props.modalCampaign());
    } else {
      this.setState({ sure: true });
    }
  }

  toggleSure() {
    this.setState({ sure: !this.state.sure });
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
          <Group>
            { this.state.sure && <Button dull onClick={ () => this.toggleSure() }>Cancel</Button> }
            <Button danger onClick={ () => this.handleDelete() }>{ this.state.sure ? 'Are you sure?' : 'Delete' }</Button>
          </Group>
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
