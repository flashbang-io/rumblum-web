import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Error, Control, Input, Group } from '../../shared/components/theme';
import Plan from '../components/Plan';
import { SUBSCRIPTION_PLAN_BASIC } from '../workspace.constants';

class PlanForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      plan: null,
      coupon: '',
    };
  }

  handleSelect({ plan }) {
    this.setState({ plan });
  }

  handleCouponChange(event) {
    this.setState({ coupon: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubscription(this.state);
  }

  render() {
    const { loading, problem } = this.props;
    const { plan, coupon } = this.state;
    return (
      <form onSubmit={ (...args) => this.handleSubmit(...args) }>
        <div>
          <Plan
            title="Basic Plan"
            price="$29/month"
            features={ ['500 Renders', 'Unlimited templates', 'Unlimited workspaces', 'Unlimited team members', 'Unlimited versions'] }
            active={ plan === SUBSCRIPTION_PLAN_BASIC }
            handleClick={ () => this.handleSelect({ plan: SUBSCRIPTION_PLAN_BASIC }) }
          />
          <Control
            label="Coupon Code"
            help="This is optional."
          >
            <Input
              name="coupon"
              placeholder="Code"
              value={ coupon }
              onChange={ (...args) => this.handleCouponChange(...args) }
            />
          </Control>
        </div>
        { problem && <Error problem={ problem } /> }
        <Group>
          <Button float type="submit" disabled={ loading || !plan }>{ loading ? 'Loading...' : 'Confirm' }</Button>
        </Group>
      </form>
    );
  }

}

PlanForm.propTypes = {
  handleSubscription: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  problem: PropTypes.shape({
    message: PropTypes.string,
  }),
};

PlanForm.defaultProps = {
  problem: null,
};

export default PlanForm;
