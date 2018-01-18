import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
  }
  40% { 
    transform: scale(1.0);
  }
`;

const Spinner = styled.div`
  width: 70px;
  text-align: center;
`;

const Ball = styled.div`
  width: 10px;
  height: 10px;
  margin-right: 4px;
  background-color: ${props => props.color || 'white'};
  border-radius: 100%;
  display: inline-block;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  animation-delay: ${props => props.delay};
  &:last-child {
    margin-right: 0;
  }
`;

const Loading = ({ ...props }) => (
  <Spinner>
    <Ball { ...props } />
    <Ball delay="-0.16s" { ...props } />
    <Ball delay="-0.32s" { ...props } />
  </Spinner>
);

export default Loading;
