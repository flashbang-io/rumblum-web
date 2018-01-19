import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { titleCase } from 'change-case';
import { Group, Button } from '../../shared/components/theme';
import { MEMBERSHIP_ROLE_USER, MEMBERSHIP_ROLE_EDITOR, MEMBERSHIP_ROLE_OWNER } from '../membership.constants';

const Wrap = styled.div`
  background-color: ${props => props.theme.colors.darklesser};
  border-radius: ${props => props.theme.size.radius};
  font-size: 13px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Name = styled.div`
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const Email = styled.div`
  color: ${props => props.theme.colors.grey};
  margin-bottom: 2px;
`;

const Role = styled.div`
  color: ${props => props.theme.colors.grey};
  margin-bottom: 10px;
`;

const Member = ({ handleRole, handleRemove, playerMembership, membership: { id, role, email, name, player }, ...props }) => (
  <Wrap { ...props }>
    <Name>{ player ? `${player.firstName} ${player.lastName}` : name || 'Unknown User' }{ !player && ' - Pending' }</Name>
    <Email>Email: { player ? player.email : email }</Email>
    <Role>Role: { titleCase(role) }</Role>
    { playerMembership.role === MEMBERSHIP_ROLE_OWNER && (
      <Group>
        { role !== MEMBERSHIP_ROLE_USER && <Button flatten tiny uppercase onClick={ () => handleRole(id, { role: MEMBERSHIP_ROLE_USER }) }>Make User</Button> }
        { role !== MEMBERSHIP_ROLE_EDITOR && <Button flatten tiny uppercase onClick={ () => handleRole(id, { role: MEMBERSHIP_ROLE_EDITOR }) }>Make Editor</Button> }
        { role !== MEMBERSHIP_ROLE_OWNER && <Button flatten tiny uppercase onClick={ () => handleRole(id, { role: MEMBERSHIP_ROLE_OWNER }) }>Make Owner</Button> }
        <Button flatten tiny uppercase danger float onClick={ () => handleRemove(id) }>Remove</Button>
      </Group>
    ) }
  </Wrap>
);

Member.propTypes = {
  handleRole: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  membership: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    email: PropTypes.string,
    player: PropTypes.shape({
      email: PropTypes.string.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  }).isRequired,
  playerMembership: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default Member;
