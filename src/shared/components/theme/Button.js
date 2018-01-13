import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { sizeBig, sizeNormal, sizeSmall, sizeTiny } from './style';

const ButtonStyled = styled.button`
  text-decoration: none;
  outline: none;
  border-radius: ${props => props.theme.size.radius};
  margin-bottom: 10px;
  border: none;
  display: inline-block;
  cursor: pointer;
  transition: .2s;
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.info};
  &:disabled {
    background-color: ${props => props.theme.colors.grey};
    cursor: default;
  }
  &:hover {
    background-color: ${props => props.theme.colors.infoDark};
  }
  ${sizeNormal}
  ${props => props.big && sizeBig}
  ${props => props.small && sizeSmall}
  ${props => props.tiny && sizeTiny}
  ${props => props.danger && css`
    background-color: ${props.theme.colors.danger};
  `}
  ${props => props.info && css`
    color: ${props.theme.colors.grey};
    background-color: ${props.theme.colors.offer};
    &:hover {
      background-color: ${props.theme.colors.off};
    }
  `}
  ${props => props.float && css`
    margin-left: auto;
  `}
  ${props => props.uppercase && css`
    text-transform: uppercase;
  `}
`;

const ButtonRoute = ButtonStyled.withComponent(NavLink);

const ButtonLink = ButtonStyled.withComponent('a');

const Button = ({ children, to, href, ...props }) => {
  if (to) {
    return <ButtonRoute to={ to } { ...props }>{ children }</ButtonRoute>;
  }
  if (href) {
    return <ButtonLink href={ href } { ...props }>{ children }</ButtonLink>;
  }
  return <ButtonStyled type="button" { ...props }>{ children }</ButtonStyled>;
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
