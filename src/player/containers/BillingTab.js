import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Elements } from 'react-stripe-elements';
import { attemptUpdateBilling, loadingPlayer, erroredPlayer } from '../player.reducer';
import { attemptUpdateSubscription } from '../../workspace/workspace.reducer';
import BillingForm from './BillingForm';
import { Subheading } from '../../shared/components/theme';

class BillingTab extends Component {

  componentWillUnmount() {
    this.props.erroredPlayer();
  }

  handleToken(token) {
    const { workspace, sale, player } = this.props;
    this.props.attemptUpdateBilling(player.id, token)
      .then(({ error }) => !error && workspace && sale && this.props.attemptUpdateSubscription(workspace.id, sale));
  }

  render() {
    const { player, sale } = this.props;
    return (
      <div>
        { sale && sale.friendly && <Subheading>Plan selected: { sale.friendly }</Subheading> }
        <Elements>
          <BillingForm
            player={ player }
            handleToken={ (...args) => this.handleToken(...args) }
            handleLoading={ (...args) => this.props.loadingPlayer(...args) }
            { ...this.props }
          />
        </Elements>
      </div>
    );
  }

}

BillingTab.propTypes = {
  attemptUpdateBilling: PropTypes.func.isRequired,
  attemptUpdateSubscription: PropTypes.func.isRequired,
  loadingPlayer: PropTypes.func.isRequired,
  erroredPlayer: PropTypes.func.isRequired,
  player: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  sale: PropTypes.shape({
    plan: PropTypes.string,
    coupon: PropTypes.string,
  }),
};

BillingTab.defaultProps = {
  sale: null,
};

const mapStateToProps = ({
  player: { current, loading, problem },
  workspace,
}) => ({
  loading: loading || workspace.loading,
  problem,
  player: current,
  sale: workspace.sale,
  workspace: workspace.current,
});
const mapDispatchToProps = { attemptUpdateBilling, loadingPlayer, attemptUpdateSubscription, erroredPlayer };
export default connect(mapStateToProps, mapDispatchToProps)(BillingTab);
