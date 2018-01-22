import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
  margin-bottom: 4px;
`;

const Email = styled.div`
  color: ${props => props.theme.colors.grey};
`;

const Role = styled.div`
  border-radius: ${props => props.theme.size.radius};
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.darkless};
  font-weight: bold;
  padding: 2px 4px;
  font-size: 10px;
  margin-left: 10px;
  display: inline-block;
`;

const Member = ({ handleRole, handleRemove, playerMembership, membership: { id, role, email, name, player, playerId }, ...props }) => {
  const isOwner = playerMembership.role === MEMBERSHIP_ROLE_OWNER;
  const notOwner = playerMembership.role !== MEMBERSHIP_ROLE_OWNER;
  const notCurrentUser = playerMembership.id !== id;
  return (
    <Wrap { ...props }>
      <Name>
        { player ? `${player.firstName} ${player.lastName}` : name || 'Name Unknown' }
        { !player && !playerId && ' - Pending' }
        <Role>{ role }</Role>
      </Name>
      <Email>{ player ? player.email : email }</Email>
      <Group style={{ marginTop: '10px' }}>
        { isOwner && notCurrentUser && role !== MEMBERSHIP_ROLE_USER && <Button flatten tiny uppercase onClick={ () => handleRole(id, { role: MEMBERSHIP_ROLE_USER }) }>Make User</Button> }
        { isOwner && notCurrentUser && role !== MEMBERSHIP_ROLE_EDITOR && <Button flatten tiny uppercase onClick={ () => handleRole(id, { role: MEMBERSHIP_ROLE_EDITOR }) }>Make Editor</Button> }
        { isOwner && notCurrentUser && role !== MEMBERSHIP_ROLE_OWNER && <Button flatten tiny uppercase onClick={ () => handleRole(id, { role: MEMBERSHIP_ROLE_OWNER }) }>Make Owner</Button> }
        { ((isOwner && notCurrentUser) || notOwner) && <Button flatten tiny uppercase danger float onClick={ () => handleRemove(id) }>Remove</Button> }
      </Group>
    </Wrap>
  );
};

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
