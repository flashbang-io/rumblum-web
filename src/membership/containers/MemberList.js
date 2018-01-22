import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptGetMemberships, attemptUpdateMembership, attemptRemoveMembership, setMembership } from '../membership.reducer';
import Member from '../components/Member';

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
    const { memberships, auth } = this.props;
    const playerMembership = memberships.find(membership => membership.player.id === auth.userId);
    return (
      <div>
        { memberships.map(membership => (
          <Member
            key={ membership.id }
            membership={ membership }
            playerMembership={ playerMembership }
            handleRole={ (...args) => this.handleRole(...args) }
            handleRemove={ (...args) => this.handleRemove(...args) }
          />
        )) }
      </div>
    );
  }

}

MemberList.propTypes = {
  attemptGetMemberships: PropTypes.func.isRequired,
  attemptUpdateMembership: PropTypes.func.isRequired,
  attemptRemoveMembership: PropTypes.func.isRequired,
  setMembership: PropTypes.func.isRequired,
  memberships: PropTypes.array.isRequired,
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  auth: PropTypes.shape({
    userId: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  membership: { memberships, loading, problem },
  workspace: { current },
  player: { auth },
}) => ({ memberships, loading, problem, workspace: current, auth });
const mapDispatchToProps = {
  attemptGetMemberships,
  attemptUpdateMembership,
  attemptRemoveMembership,
  setMembership,
};
export default connect(mapStateToProps, mapDispatchToProps)(MemberList);
