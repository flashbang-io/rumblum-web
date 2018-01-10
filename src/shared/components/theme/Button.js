import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

const ButtonStyled = styled.button`
  text-decoration: none;
  outline: none;
  border-radius: ${props => props.theme.size.radius};
  background-color: ${props => props.theme.colors.grey};
  color: ${props => props.theme.colors.dark};
  border: none;
  font-size: 14px;
  padding: 10px 14px;
  ${props => props.big && css`
    font-size: 16px;
    padding: 14px 24px;
  `}
  ${props => props.small && css`
    font-size: 12px;
    padding: 8px 14px;
  `}
  ${props => props.tiny && css`
    font-size: 10px;
    padding: 6px 10px;
  `}
  ${props => props.danger && css`
    background-color: red;
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
  return <ButtonStyled { ...props }>{ children }</ButtonStyled>;
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
