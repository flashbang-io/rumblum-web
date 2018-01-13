import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptUpdateSubscription } from '../workspace.reducer';
import PlanForm from './PlanForm';

class PlanTab extends Component {

  handleSubscription(data) {
    this.props.attemptUpdateSubscription(this.props.workspace.id, data);
  }

  render() {
    const { workspace } = this.props;
    return (
      <PlanForm
        handleSubscription={ (...args) => this.handleSubscription(...args) }
        initialValues={ workspace }
        { ...this.props }
      />
    );
  }

}

PlanTab.propTypes = {
  attemptUpdateSubscription: PropTypes.func.isRequired,
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  workspace: { current, loading, problem },
}) => ({ loading, problem, workspace: current });
const mapDispatchToProps = { attemptUpdateSubscription };
export default connect(mapStateToProps, mapDispatchToProps)(PlanTab);
