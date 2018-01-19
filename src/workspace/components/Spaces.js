import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Button, Icon } from '../../shared/components/theme';
import LoadingCircles from '../../shared/components/LoadingCircles';

const Wrap = styled.div`
  margin-bottom: 10px;
  position: relative;
  flex-grow: 1;
`;

const Segment = styled.div`
  border-radius: ${props => props.theme.size.radius};
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.offer};
  color: ${props => props.theme.colors.grey};
  padding: 14px;
  box-sizing: border-box;
`;

const Space = Segment.extend`
  font-weight: bold;
  font-size: 11px;
  text-transform: uppercase;
  margin-bottom: 10px;
  cursor: pointer;
  transition: .2s;
  display: flex;
  align-items: center;
  ${props => props.active && css`
    background-color: ${props.theme.colors.electric};
    color: ${props.theme.colors.white};
    font-weight: normal;
  `}
`;

export const Popup = Segment.extend`
  position: absolute;
  left: 10px;
  bottom: 20px;
`;

const Spaces = ({ workspaces, handleSelect, handleOpen, children, workspace, loading }) => (
  <Wrap>
    { workspaces.map(({ id, name }) => (
      <Space
        key={ id }
        onClick={ () => handleSelect(id) }
        active={ workspace && id === workspace.id }
      >
        { name }
        { loading && workspace && id === workspace.id && <LoadingCircles color="white" /> }
      </Space>
    )) }
    <Button onClick={ handleOpen }>
      <Icon name="plus" /> Workspace
    </Button>
    { children }
  </Wrap>
);

Spaces.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node,
  workspaces: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),

};

Spaces.defaultProps = {
  workspaces: [],
  workspace: null,
  children: null,
};

export default Spaces;
