import React from 'react';
import styled from 'styled-components';

const Window = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: ${props => props.theme.colors.darkless};
  position: relative;
  box-sizing: border-box;
`;

const IFrame = styled.iframe`
  border: none;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const Square = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 2px;
  background-color: ${props => props.theme.colors.darkless};
  border: 1px solid ${props => props.theme.colors.darker};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  font-size: 10px;
  color: ${props => props.theme.colors.white};
`;

const Badge = styled.a`
  padding: 6px;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid #c1c1c1;
  color: ${props => props.theme.colors.dark};
  border-radius: 3px;
  font-size: 11px;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.15);
  text-decoration: none;
  position: absolute;
  bottom: 20px;
  right: 30px;
  display: flex;
  align-items: center;
  font-weight: bold;
  transition: .2s;
  &:hover {
    box-shadow: 0 0 30px 1px rgba(0, 0, 0, 0.3);
  }
`;

const Frame = ({ ...props }) => (
  <Window>
    <IFrame { ...props } />
    <Badge href="/">
      <Square>R</Square>
      Powered by Rumblum
    </Badge>
  </Window>
);

export default Frame;
