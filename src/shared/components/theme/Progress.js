import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const ProgressWrap = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 20px;
  background-color: ${props => props.theme.colors.dark};
  border: 1px solid ${props => props.theme.colors.darker};
  border-radius: ${props => props.theme.size.radius};
`;

const Bar = styled.div`
  height: 20px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colors.info};
  border-radius: ${props => props.theme.size.radius};
  width: ${props => props.progress}%;
  box-sizing: border-box;
  ${props => props.danger && css`
    background-color: ${props.theme.colors.danger};
  `}
`;

const Indicator = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.white};
`;

const Progress = ({ progress, hideIndicator, indicator, ...props }) => {
  const distance = Math.trunc(progress * 10000) / 100;
  return (
    <ProgressWrap>
      <Bar progress={ distance } { ...props }>
        { !hideIndicator && <Indicator>{ indicator || `${distance}%` }</Indicator> }
      </Bar>
    </ProgressWrap>
  );
};

Progress.propTypes = {
  progress: PropTypes.number.isRequired,
  hideIndicator: PropTypes.bool,
  indicator: PropTypes.string,
};

Progress.defaultProps = {
  hideIndicator: false,
  indicator: null,
};

export default Progress;
