import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Error } from '../../shared/components/theme';
import Plan from '../components/Plan';

class MembershipForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  handleSelect({ plan }) {
    this.setState({ selected: plan });
  }

  render() {
    const { handleSubmit, loading, problem } = this.props;
    const { selected } = this.state;
    return (
      <form onSubmit={ handleSubmit }>
        <div>
          <Plan
            title="THISONE"
            active={ selected === 'THISONE' }
            handleClick={ () => this.handleSelect({ plan: 'THISONE' }) }
          />
        </div>
        { problem && <Error>{ problem.message || problem }</Error> }
        <Button type="submit" disabled={ loading || !selected }>{ loading ? 'Loading...' : 'Confirm' }</Button>
      </form>
    );
  }

}

MembershipForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  problem: PropTypes.shape({
    message: PropTypes.string,
  }),
};

MembershipForm.defaultProps = {
  problem: null,
};

export default MembershipForm;
