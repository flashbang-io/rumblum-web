import React from 'react';
import PropTypes from 'prop-types';
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

const Download = styled.button`
  border: none;
  background-color: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.white};
  padding: 6px 10px;
  margin-left: 10px;
  border-radius: 3px;
  font-size: 11px;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: .2s;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.darkless};
  }
`;

const Badge = Download.withComponent('a').extend`
  border: 1px solid #c1c1c1;
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.dark};
  font-weight: bold;
  &:hover {
    background-color: ${props => props.theme.colors.white};
  }
`;

const Group = styled.div`
  position: absolute;
  bottom: 20px;
  right: 30px;
  display: flex;
`;

const Frame = ({ handleDownload, ...props }) => (
  <Window>
    <IFrame { ...props } />
    <Group>
      <Download onClick={ handleDownload }>Download</Download>
      <Badge href="/">
        <Square>R</Square>
        Powered by Rumblum
      </Badge>
    </Group>
  </Window>
);

Frame.propTypes = {
  handleDownload: PropTypes.func.isRequired,
};

export default Frame;
