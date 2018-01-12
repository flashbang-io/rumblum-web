import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import onClickOutside from 'react-onclickoutside';
import { sizeNormal } from './theme/style';

const DropWrap = styled.div`
  width: 200px;
  background-color: ${props => props.theme.colors.dark};
  border-radius: ${props => props.theme.size.radius};
  overflow: hidden;
  display: none;
  position: absolute;
  right: 0;
  top: 30px;
  padding: 10px 0;
  ${props => props.open && css`
    display: block;
  `}
`;

export const DropItem = styled.div`
  ${sizeNormal}
  width: 100%;
  margin: 0 5px;
  box-sizing: border-box;
  color: ${props => props.theme.colors.white};
  &:hover {
    margin-left: 0;
    border-left: 5px solid ${props => props.theme.colors.info};
    background-color: ${props => props.theme.colors.electric};
  }
`;

class Dropdown extends Component {

  handleClickOutside() {
    if (this.props.active) {
      this.props.handleClose();
    }
  }

  render() {
    const { children, active } = this.props;
    return (
      <DropWrap open={ active }>{ children }</DropWrap>
    );
  }

}

Dropdown.propTypes = {
  handleClose: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default onClickOutside(Dropdown);
