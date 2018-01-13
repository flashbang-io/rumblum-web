import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Group, Button } from '../../shared/components/theme';
import { MEMBERSHIP_ROLE_USER, MEMBERSHIP_ROLE_EDITOR, MEMBERSHIP_ROLE_OWNER } from '../membership.constants';

const Wrap = styled.div`
  background-color: ${props => props.theme.colors.darklesser};
  border-radius: ${props => props.theme.size.radius};
  font-size: 13px;
  padding: 10px 10px 0;
  margin-bottom: 10px;
`;

const Name = styled.div`
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const Email = styled.div`
  color: ${props => props.theme.colors.grey};
  margin-bottom: 10px;
`;

const Member = ({ handleRole, handleRemove, membership: { id, role, email, name, player }, ...props }) => (
  <Wrap { ...props }>
    <Name>{ player ? `${player.firstName} ${player.lastName}` : name || 'Unknown User' }{ !player && ' - Pending' }</Name>
    <Email>{ player ? player.email : email }</Email>
    <Group>
      { role !== MEMBERSHIP_ROLE_USER && <Button tiny uppercase onClick={ () => handleRole(id, { role: MEMBERSHIP_ROLE_USER }) }>Make User</Button> }
      { role !== MEMBERSHIP_ROLE_EDITOR && <Button tiny uppercase onClick={ () => handleRole(id, { role: MEMBERSHIP_ROLE_EDITOR }) }>Make Editor</Button> }
      { role !== MEMBERSHIP_ROLE_OWNER && <Button tiny uppercase onClick={ () => handleRole(id, { role: MEMBERSHIP_ROLE_OWNER }) }>Make Owner</Button> }
      <Button tiny uppercase danger float onClick={ () => handleRemove(id) }>Remove</Button>
    </Group>
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
};

export default Member;
