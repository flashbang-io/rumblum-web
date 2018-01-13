import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptGetMemberships, attemptUpdateMembership, attemptRemoveMembership, setMembership } from '../membership.reducer';

class MemberList extends Component {

  componentDidMount() {
    this.props.attemptGetMemberships(this.props.workspace.id);
  }

  componentWillUnmount() {
    this.props.setMembership();
  }

  handleRole(id, { role }) {
    this.props.attemptUpdateMembership(id, { role });
  }

  handleRemove(id) {
    this.props.attemptRemoveMembership(id);
  }

  render() {
    const { memberships, loading } = this.props;
    return (
      <ul>
        { loading && <li>Loading...</li> }
        { memberships.map(({ id, player }) => <li>{ id }: { player.email }</li>) }
      </ul>
    );
  }

}

MemberList.propTypes = {
  attemptGetMemberships: PropTypes.func.isRequired,
  attemptUpdateMembership: PropTypes.func.isRequired,
  attemptRemoveMembership: PropTypes.func.isRequired,
  setMembership: PropTypes.func.isRequired,
  memberships: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  membership: { memberships, loading },
  workspace: { current },
}) => ({ memberships, loading, workspace: current });
const mapDispatchToProps = {
  attemptGetMemberships,
  attemptUpdateMembership,
  attemptRemoveMembership,
  setMembership,
};
export default connect(mapStateToProps, mapDispatchToProps)(MemberList);
