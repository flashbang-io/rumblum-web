import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Elements } from 'react-stripe-elements';
import { attemptUpdateBilling, loadingPlayer } from '../player.reducer';
import BillingForm from './BillingForm';

class BillingTab extends Component {

  handleToken(token) {
    this.props.attemptUpdateBilling(this.props.player.id, token);
  }

  render() {
    const { player } = this.props;
    return (
      <Elements>
        <BillingForm
          player={ player }
          handleToken={ (...args) => this.handleToken(...args) }
          handleLoading={ (...args) => this.props.loadingPlayer(...args) }
          { ...this.props }
        />
      </Elements>
    );
  }

}

BillingTab.propTypes = {
  attemptUpdateBilling: PropTypes.func.isRequired,
  loadingPlayer: PropTypes.func.isRequired,
  player: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  player: { current, loading, problem },
}) => ({ loading, problem, player: current });
const mapDispatchToProps = { attemptUpdateBilling, loadingPlayer };
export default connect(mapStateToProps, mapDispatchToProps)(BillingTab);
