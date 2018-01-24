import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import styled, { css } from 'styled-components';
import { Icon } from '../../shared/components/theme';
import LoadingCircles from '../../shared/components/LoadingCircles';
import Square from './Square';

const Wrap = styled.div`
  box-shadow: ${props => props.theme.shadows.off};
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.size.radius};
  colors: ${props => props.theme.size.greyer};
  border: 1px solid #dee8f1;
  padding: 10px;
  position: relative;
  z-index: 500;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 10px;
  top: 10px;
  min-width: 260px;
`;

const Space = styled.div`
  border-radius: ${props => props.theme.size.radius};
  color: ${props => props.theme.colors.greyer};
  padding: 10px;
  box-sizing: border-box;
  font-size: 13px;
  margin-bottom: 5px;
  cursor: pointer;
  transition: .2s;
  display: flex;
  align-items: center;
  ${props => props.active ? css`
    background-color: ${props.theme.colors.off};
  ` : css`
    &:hover {
      background-color: ${props.theme.colors.offer};
    }
  `}
`;

const Content = styled.div`
  margin-left: 10px;
  span {
    color: ${props => props.theme.colors.grey};
    font-size: 11px;
  }
`;

export const Popup = styled.div`
  background-color: ${props => props.theme.colors.off};
  border-radius: ${props => props.theme.size.radius};
  border: 1px solid ${props => props.theme.colors.offer};
  color: ${props => props.theme.colors.grey};
  position: absolute;
  left: 10px;
  bottom: 20px;
  padding: 20px;
`;

const SpaceButton = styled.button`
  font-size: 13px;
  background-color: ${props => props.theme.colors.pinch};
  border-radius: ${props => props.theme.size.radius};
  color: ${props => props.theme.colors.white};
  padding: 15px 0;
  border: none;
  margin: 15px 10px 10px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  outline: none;
  transition: .2s;
  &:hover {
    background-color: ${props => props.theme.colors.pinchHover};
  }
`;

class Spaces extends Component {

  handleClickOutside() {
    this.props.handleClose();
  }

  render() {
    const { workspaces, handleSelect, handleOpen, workspace, loading } = this.props;
    return (
      <Wrap>
        { workspaces.map(({ id, name, subscription, createdAt }) => (
          <Space
            key={ id }
            onClick={ () => handleSelect(id) }
            active={ workspace && id === workspace.id }
          >
            <Square size="50px" workspace={{ id, name, createdAt }} />
            <Content>
              { name }
              <br />
              <span>{ subscription ? 'No Plan' : 'Subscribed' }</span>
            </Content>
          </Space>
        )) }
        <SpaceButton disabled={ loading } onClick={ handleOpen }>
          { loading ? <LoadingCircles color="white" /> : <div><Icon name="plus" /> Workspace</div> }
        </SpaceButton>
      </Wrap>
    );
  }

}

Spaces.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
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
};

export default onClickOutside(Spaces);
