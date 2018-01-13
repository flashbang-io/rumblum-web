import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Wrap = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  border-radius: ${props => props.theme.size.radius};
  background-color: ${props => props.theme.colors.darklesser};
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
  width: 50%;
  box-sizing: border-box;
  ${props => props.active && css`
    background-color: ${props.theme.colors.electric};
  `}
`;

const Plan = ({ handleClick, title }) => (
  <Wrap onClick={ handleClick }>
    { title }
  </Wrap>
);

Plan.propTypes = {
  handleClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Plan;
