import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { sizeBig, sizeNormal, sizeSmall, sizeTiny } from './style';

export const ButtonStyled = styled.button`
  text-decoration: none;
  outline: none;
  margin-bottom: 10px;
  border: none;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  transition: .2s;
  white-space: nowrap;
  border-radius: ${props => props.theme.size.radius};
  background-color: ${props => props.theme.colors.info};
  color: ${props => props.theme.colors.white};
  &:disabled {
    background-color: ${props => props.theme.colors.grey};
    cursor: default;
  }
  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.infoHover};
  }
  ${sizeNormal}
  ${props => props.big && sizeBig}
  ${props => props.small && sizeSmall}
  ${props => props.tiny && sizeTiny}
  ${props => props.danger && css`
    background-color: ${props.theme.colors.danger};
    &:hover:not(:disabled) {
      background-color: ${props.theme.colors.dangerHover};
    }
  `}
  ${props => props.dull && css`
    color: ${props.theme.colors.grey};
    background-color: ${props.theme.colors.offest};
    &:hover:not(:disabled) {
      background-color: ${props.theme.colors.offer};
    }
  `}
  ${props => props.float && css`
    margin-left: auto;
  `}
  ${props => props.uppercase && css`
    text-transform: uppercase;
  `}
  ${props => props.flatten && css`
    margin-bottom: 0;
  `}
  ${props => props.grow && css`
    flex-grow: 1;
  `}
`;

const ButtonRoute = ButtonStyled.withComponent(NavLink);

const ButtonLink = ButtonStyled.withComponent('a');

const Button = ({ children, to, href, ...props }) => {
  if (to) {
    return <ButtonRoute title="" to={ to } { ...props }>{ children }</ButtonRoute>;
  }
  if (href) {
    return <ButtonLink title="" href={ href } { ...props }>{ children }</ButtonLink>;
  }
  return <ButtonStyled title="" type="button" { ...props }>{ children }</ButtonStyled>;
};

Button.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  to: null,
  href: null,
  children: null,
};

export default Button;
