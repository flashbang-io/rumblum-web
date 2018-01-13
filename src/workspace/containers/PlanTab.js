import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptUpdateWorkspace } from '../workspace.reducer';
import PlanForm from './PlanForm';

class PlanTab extends Component {

  handleSubscription({ plan }) {
    console.log('Plan selected:', plan);
    // this.props.attemptUpdateSubscription(this.props.workspace.id, { plan });
  }

  render() {
    const { workspace } = this.props;
    return (
      <PlanForm
        handleSubmit={ (...args) => this.handleSubscription(...args) }
        initialValues={ workspace }
        { ...this.props }
      />
    );
  }

}

PlanTab.propTypes = {
  attemptUpdateWorkspace: PropTypes.func.isRequired,
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  workspace: { current, loading, problem },
}) => ({ loading, problem, workspace: current });
const mapDispatchToProps = { attemptUpdateWorkspace };
export default connect(mapStateToProps, mapDispatchToProps)(PlanTab);
