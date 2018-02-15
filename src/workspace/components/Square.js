import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { textToColor } from '../../shared/util.helper';

const Wrap = styled.div`
  height: ${props => props.size || '70px'};
  width: ${props => props.size || '70px'};
  border-radius: ${props => props.theme.size.radius};
  box-shadow: ${props => props.theme.shadows.off};
  background-color: ${props => props.theme.colors.white};
  cursor: pointer;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TopLine = styled.div`
  position: absolute;
  transform: rotate(-45deg) translateY(-70%);
  background-color: ${props => props.color};
  width: 200%;
  height: 100%;
`;

const BottomLine = TopLine.extend`
  transform: rotate(-45deg) translateY(70%);
  background-color: ${props => props.color};
`;

const Square = ({ workspace, children, ...props }) => (
  <Wrap { ...props }>
    { workspace && <TopLine color={ textToColor(workspace.name) } /> }
    { workspace && <BottomLine color={ textToColor(workspace.createdAt) } /> }
    { children }
  </Wrap>
);

Square.propTypes = {
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  children: PropTypes.node,
};

Square.defaultProps = {
  workspace: null,
  children: null,
};

export default Square;
