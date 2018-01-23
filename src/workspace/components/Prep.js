import React from 'react';
import styled from 'styled-components';
import { Icon, Label } from '../../shared/components/theme';

export const SpaceWrap = styled.div`
  position: relative;
`;

const Wrap = styled.div`
  height: 70px;
  width: 70px;
  border-radius: ${props => props.theme.size.radius};
  background-color: ${props => props.theme.colors.grey};
  box-shadow: ${props => props.theme.shadows.off};
  cursor: pointer;
  transition: .2s;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: transparent;
  &:hover {
    background-color: ${props => props.theme.colors.greyer};
    color: ${props => props.theme.colors.white};
  }
`;

const Prep = ({ ...props }) => (
  <Label title="Workspace">
    <Wrap { ...props }>
      <Icon name="circle-o" />
    </Wrap>
  </Label>
);

Prep.propTypes = {
};

Prep.defaultProps = {
};

export default Prep;
