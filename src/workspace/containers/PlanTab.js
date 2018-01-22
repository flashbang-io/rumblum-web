import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptUpdateSubscription, attemptCancelSubscription, erroredWorkspace } from '../workspace.reducer';
import { modalCampaign } from '../../shared/campaign.reducer';
import PlanForm from './PlanForm';
import { Control, Button, Group } from '../../shared/components/theme';

class PlanTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sure: false,
    };
  }

  componentWillUnmount() {
    this.props.erroredWorkspace();
  }

  handleSubscription(data) {
    this.props.attemptUpdateSubscription(this.props.workspace.id, data)
      .then(({ error }) => !error && this.props.modalCampaign());
  }

  handleCancel() {
    if (this.state.sure) {
      this.props.attemptCancelSubscription(this.props.workspace.id)
        .then(({ error }) => !error && this.props.modalCampaign());
    } else {
      this.setState({ sure: true });
    }
  }

  toggleSure() {
    this.setState({ sure: !this.state.sure });
  }

  render() {
    const { workspace } = this.props;
    return (
      <div>
        <PlanForm
          handleSubscription={ (...args) => this.handleSubscription(...args) }
          initialValues={ workspace }
          { ...this.props }
        />
        { workspace.plan && (
          <Control
            label="Cancel Subscription"
            help={
              workspace.cancelling ?
              'The plan will be removed at the end of the payment period.' :
              'Please let us know if there is anything we can do to improve your experience.'
            }
            upline
          >
            <Group>
              { workspace.cancelling && <Button disabled>Canceled</Button> }
              { !workspace.cancelling && this.state.sure && <Button dull onClick={ () => this.toggleSure() }>Ooops, Go Back</Button> }
              { !workspace.cancelling && <Button danger onClick={ () => this.handleCancel() }>{ this.state.sure ? 'Are you sure?' : 'Cancel Subscription' }</Button> }
            </Group>
          </Control>
        ) }
      </div>
    );
  }

}

PlanTab.propTypes = {
  attemptUpdateSubscription: PropTypes.func.isRequired,
  attemptCancelSubscription: PropTypes.func.isRequired,
  erroredWorkspace: PropTypes.func.isRequired,
  modalCampaign: PropTypes.func.isRequired,
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  workspace: { current, loading, problem },
}) => ({ loading, problem, workspace: current });
const mapDispatchToProps = { attemptUpdateSubscription, attemptCancelSubscription, erroredWorkspace, modalCampaign };
export default connect(mapStateToProps, mapDispatchToProps)(PlanTab);
