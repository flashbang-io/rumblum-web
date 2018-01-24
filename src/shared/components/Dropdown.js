import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import onClickOutside from 'react-onclickoutside';

const DropWrap = styled.div`
  width: 200px;
  background-color: ${props => props.theme.colors.darkless};
  border-radius: ${props => props.theme.size.radius};
  overflow: hidden;
  display: none;
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 10px 0;
  ${props => props.open && css`
    display: block;
  `}
`;

export const DropItem = styled.div`
  font-size: 12px;
  padding: 12px 10px;
  width: 100%;
  margin: 0 5px;
  box-sizing: border-box;
  color: ${props => props.theme.colors.white};
  i {
    width: 20px;
    text-align: center;
  }
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
