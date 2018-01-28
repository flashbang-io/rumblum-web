import React from 'react';
import styled, { keyframes, css } from 'styled-components';

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
  width: 0.7em;
  height: 0.7em;
  margin-right: 0.5em;
  background-color: ${props => props.color || props.theme.colors.white};
  border-radius: 100%;
  display: inline-block;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  animation-delay: ${props => props.delay};
  &:last-child {
    margin-right: 0;
  }
  ${props => props.dark && css`
    background-color: ${props.color || props.theme.colors.greyless};
  `}
`;

const Loading = ({ ...props }) => (
  <Spinner>
    <Ball { ...props } />
    <Ball delay="-0.16s" { ...props } />
    <Ball delay="-0.32s" { ...props } />
  </Spinner>
);

export default Loading;
