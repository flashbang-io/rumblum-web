import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon, Label } from '../../shared/components/theme';
import Square from './Square';
import { MODAL_SPACE_TAB_EDIT, MODAL_SPACE, MODAL_SPACE_TAB_PLAN, MODAL_SPACE_TAB_MEMBERS } from '../../shared/shared.constants';

const Wrap = styled.div`
  position: relative;
  z-index: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Nav = styled.div`
  margin-top: 10px;
`;

const Item = styled.div`
  height: 40px;
  width: 40px;
  margin-top: 10px;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.offer};
  color: ${props => props.theme.colors.greyless};
  box-shadow: ${props => props.theme.shadows.off};
  font-size: 14px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .2s;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: ${props => props.theme.colors.off};
  }
`;

export const SpaceWrap = styled.div`
  position: relative;
`;

const Shadow = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${props => props.theme.colors.white};
  opacity: 0;
  transition: .2s;
  &:hover {
    opacity: 1;
  }
`;

const Prep = ({ handleModal, ...props }) => (
  <Wrap>
    <Label title="Workspace" sideways>
      <Square { ...props }>
        <Shadow>
          <Icon name="circle-o" />
        </Shadow>
      </Square>
    </Label>
    <Nav>
      <Label title="Edit Workspace" sideways>
        <Item onClick={ () => handleModal({ modal: MODAL_SPACE, tab: MODAL_SPACE_TAB_EDIT }) }>
          <Icon name="suitcase" />
        </Item>
      </Label>
      <Label title="Workspace Members" sideways>
        <Item onClick={ () => handleModal({ modal: MODAL_SPACE, tab: MODAL_SPACE_TAB_MEMBERS }) }>
          <Icon name="users" />
        </Item>
      </Label>
      <Label title="Subscription Plan" sideways>
        <Item onClick={ () => handleModal({ modal: MODAL_SPACE, tab: MODAL_SPACE_TAB_PLAN }) }>
          <Icon name="trophy" />
        </Item>
      </Label>
    </Nav>
  </Wrap>
);

Prep.propTypes = {
  handleModal: PropTypes.func.isRequired,
};

export default Prep;
