import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptCreateMembership } from '../membership.reducer';
import MemberForm from '../../membership/containers/MemberForm';
import MemberList from '../../membership/containers/MemberList';

class MemberTab extends Component {

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
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  workspace: { current },
  membership: { loading, problem },
}) => ({ loading, problem, workspace: current });
const mapDispatchToProps = { attemptCreateMembership };
export default connect(mapStateToProps, mapDispatchToProps)(MemberTab);
