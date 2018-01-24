import React from 'react';
import styled from 'styled-components';
import { Icon, Label } from '../../shared/components/theme';
import Square from './Square';

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

const Prep = ({ ...props }) => (
  <Label title="Workspace">
    <Square { ...props }>
      <Shadow>
        <Icon name="circle-o" />
      </Shadow>
    </Square>
  </Label>
);

export default Prep;
