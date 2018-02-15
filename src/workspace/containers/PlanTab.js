import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptUpdateSubscription, attemptCancelSubscription, erroredWorkspace, saleWorkspace } from '../workspace.reducer';
import { modalCampaign, tabCampaign } from '../../shared/campaign.reducer';
import PlanForm from './PlanForm';
import { Control, Button, Group } from '../../shared/components/theme';
import { MODAL_SPACE_TAB_BILLING } from '../../shared/shared.constants';

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
    const { customer } = this.props.player;
    if (customer) {
      this.props.attemptUpdateSubscription(this.props.workspace.id, data)
        .then(({ error }) => !error && this.props.modalCampaign());
    } else {
      this.props.saleWorkspace(data);
      this.props.tabCampaign(MODAL_SPACE_TAB_BILLING);
    }
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
  saleWorkspace: PropTypes.func.isRequired,
  modalCampaign: PropTypes.func.isRequired,
  tabCampaign: PropTypes.func.isRequired,
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  player: PropTypes.shape({
    customer: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = ({
  workspace: { current, loading, problem },
  player,
}) => ({
  loading,
  problem,
  workspace:
  current,
  player: player.current,
});
const mapDispatchToProps = {
  attemptUpdateSubscription,
  attemptCancelSubscription,
  erroredWorkspace,
  saleWorkspace,
  modalCampaign,
  tabCampaign,
};
export default connect(mapStateToProps, mapDispatchToProps)(PlanTab);
