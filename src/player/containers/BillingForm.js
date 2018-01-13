import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from 'react-stripe-elements';
import { Input, Button, Error, Control, Group, InputStyled } from '../../shared/components/theme';

const CardNumber = InputStyled.withComponent(CardNumberElement);
const CardExpiry = InputStyled.withComponent(CardExpiryElement);
const CardCVC = InputStyled.withComponent(CardCVCElement);

class BillingForm extends Component {

  constructor(props) {
    super(props);
    const { player } = props;
    this.state = {
      error: null,
      name: player ? `${player.firstName} ${player.lastName}` : '',
    };
  }

  handleError(error = null) {
    this.props.handleLoading(!error);
    this.setState({ error });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handleError();
    this.props.stripe.createToken({ name: this.state.name })
      .then(({ error, token }) => error ? this.handleError(error) : this.props.handleToken(token));
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    const { loading, problem } = this.props;
    const { error, name } = this.state;
    const style = {
      base: {
        color: 'white',
      },
    };
    return (
      <form onSubmit={ (...args) => this.handleSubmit(...args) }>
        <div>
          <Control
            label="Name"
            help="The name on the card."
          >
            <Input
              name="name"
              placeholder="Jack Scott"
              value={ name }
              onChange={ (...args) => this.handleNameChange(...args) }
            />
          </Control>
          <Control
            label="Card Number"
            help="Please double check this value."
          >
            <CardNumber style={ style } />
          </Control>
          <Control
            label="Expiry"
            help="E.g. 12/20"
          >
            <CardExpiry style={ style } />
          </Control>
          <Control
            label="CVC"
            help="E.g. 123"
          >
            <CardCVC style={ style } />
          </Control>
        </div>
        { (error || problem) && <Error>{ (error || problem).message || (error || problem) }</Error> }
        <Group>
          <Button float type="submit" disabled={ loading }>{ loading ? 'Loading...' : 'Update' }</Button>
        </Group>
      </form>
    );
  }

}

BillingForm.propTypes = {
  handleToken: PropTypes.func.isRequired,
  handleLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  problem: PropTypes.shape({
    message: PropTypes.string,
  }),
  player: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  stripe: PropTypes.shape({
    createToken: PropTypes.func.isRequired,
  }).isRequired,
};

BillingForm.defaultProps = {
  problem: null,
  player: null,
};

export default injectStripe(BillingForm);
