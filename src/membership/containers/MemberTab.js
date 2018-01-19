import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptCreateMembership, erroredMembership } from '../membership.reducer';
import MemberForm from '../../membership/containers/MemberForm';
import MemberList from '../../membership/containers/MemberList';

class MemberTab extends Component {

  componentWillUnmount() {
    this.props.erroredMembership();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptCreateMembership(this.props.workspace.id);
  }

  render() {
    return (
      <div>
        <MemberList />
        <MemberForm
          handleSubmit={ (...args) => this.handleSubmit(...args) }
          { ...this.props }
        />
      </div>
    );
  }

}

MemberTab.propTypes = {
  attemptCreateMembership: PropTypes.func.isRequired,
  erroredMembership: PropTypes.func.isRequired,
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  workspace: { current },
  membership: { loading, problem },
}) => ({ loading, problem, workspace: current });
const mapDispatchToProps = { attemptCreateMembership, erroredMembership };
export default connect(mapStateToProps, mapDispatchToProps)(MemberTab);
