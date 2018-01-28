import React from 'react';
import styled, { keyframes } from 'styled-components';

const stretch = keyframes`
  0%, 40%, 100% { 
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }
  20% { 
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
`;

const Spinner = styled.div`
  height: 50px;
`;

const Line = styled.div`
  background-color: ${props => props.theme.colors.grey};
  height: 100%;
  width: 6px;
  margin: 2px;
  display: inline-block;
  animation: ${stretch} 1.2s infinite ease-in-out;
  animation-delay: ${props => props.delay};
`;

export default () => (
  <Spinner>
    <Line delay="-1.1s" />
    <Line delay="-1.0s" />
    <Line delay="-0.9s" />
    <Line delay="-0.8s" />
    <Line delay="-0.7s" />
  </Spinner>
);
