import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Wrap = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: ${props => props.theme.size.radius};
  background-color: ${props => props.theme.colors.darklesser};
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  cursor: pointer;
  ${props => props.active && css`
    background-color: ${props.theme.colors.electric};
  `}
`;

const Plan = ({ handleClick, title, ...props }) => (
  <Wrap onClick={ handleClick } { ...props }>
    { title }
  </Wrap>
);

Plan.propTypes = {
  handleClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Plan;
