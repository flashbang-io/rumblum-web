import React from 'react';
import styled from 'styled-components';
import LoadingCircles from './LoadingCircles';

const Wrap = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: ${props => props.theme.colors.off};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

export default () => (
  <Wrap>
    <LoadingCircles dark />
  </Wrap>
);
