import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptUpdateTemplate, attemptRemoveTemplate, erroredTemplate } from '../template.reducer';
import { modalCampaign, attemptAlert } from '../../shared/campaign.reducer';
import SimpleForm from './SimpleForm';
import { Control, Button, Group } from '../../shared/components/theme';

class SettingsTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sure: false,
    };
  }

  componentWillUnmount() {
    this.props.erroredTemplate();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptUpdateTemplate(this.props.template.id);
  }

  handleDelete() {
    if (this.state.sure) {
      this.props.attemptRemoveTemplate(this.props.template.id)
        .then(() => this.props.modalCampaign());
    } else {
      this.setState({ sure: true });
    }
  }

  handleCopy(id) {
    const target = document.getElementById(id);
    target.focus();
    target.select();
    document.execCommand('copy');
    this.props.attemptAlert({ message: 'Link copied to clipboard.' });
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
          handleCopy={ (...args) => this.handleCopy(...args) }
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
  erroredTemplate: PropTypes.func.isRequired,
  modalCampaign: PropTypes.func.isRequired,
  attemptAlert: PropTypes.func.isRequired,
  template: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  template: { current, loading, problem },
}) => ({ loading, problem, template: current });
const mapDispatchToProps = { attemptUpdateTemplate, attemptRemoveTemplate, erroredTemplate, modalCampaign, attemptAlert };
export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab);
