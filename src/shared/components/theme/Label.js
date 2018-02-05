import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Wrap = styled.div`
  position: relative;
  &:hover .help-label {
    ${props => typeof props.override === 'boolean' ? css`
      display: ${props.override ? 'flex' : 'none'};
    ` : css`
      display: flex;
    `}
  }
`;

const Center = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateY(110%);
  display: none;
  flex-direction: column;
  align-items: center;
  z-index: 750;
  ${props => props.sideways && css`
    transform: translateX(105%);
    flex-direction: row;
    top: 0;
  `}
`;

const Bubble = styled.div`
  border-radius: ${props => props.theme.size.radius};
  background-color: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.white};
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  box-sizing: border-box;
  padding: 10px 14px;
  text-align: center;
  white-space: nowrap;
`;

const Arrow = styled.div`
  width: 0; 
  height: 0; 
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid ${props => props.theme.colors.dark};
  margin-bottom: -1px;
  ${props => props.sideways && css`
    border: none;
    margin: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 6px solid ${props.theme.colors.dark};
    margin-right: -1px;
  `}
`;

const Label = ({ title, children, override, ...props }) => (
  <Wrap override={ override }>
    { children }
    <Center className="help-label" { ...props }>
      <Arrow { ...props } />
      <Bubble { ...this.props }>{ title }</Bubble>
    </Center>
  </Wrap>
);

Label.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  override: PropTypes.bool,
};

Label.defaultProps = {
  override: null,
};

export default Label;
