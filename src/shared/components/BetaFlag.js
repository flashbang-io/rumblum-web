import React from 'react';
import styled from 'styled-components';

const Flag = styled.div`
  position: fixed;
  top: 0;
  right: 30px;
  padding: 6px 10px;
  text-transform: uppercase;
  font-size: 8px;
  letter-spacing: 0.1em;
  font-weight: bold;
  background-color: ${props => props.theme.colors.pinch};
  border-bottom-right-radius: ${props => props.theme.size.radius};
  border-bottom-left-radius: ${props => props.theme.size.radius};
  color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.off};
`;

export default () => (
  <Flag>Invite Only Beta</Flag>
);

