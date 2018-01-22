import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Heading, Icon } from './theme';

const Wrap = styled.div`
  background-color: ${props => props.theme.colors.darkless};
  color: ${props => props.theme.colors.off};
  border-radius: ${props => props.theme.size.radius};
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
`;

const Menu = styled.div`
  padding: 20px;
  min-width: 160px;
  background-color: ${props => props.theme.colors.dark};
`;

const MenuItem = styled.div`
  padding: 6px 10px;
  margin-bottom: 4px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  color: ${props => props.theme.colors.grey};
  transition: .2s;
  border-radius: ${props => props.theme.size.radius};
  &:hover {
    background-color: ${props => props.theme.colors.darkless};
  }
  i {
    width: 20px;
    text-align: center;
  }
  ${props => props.active && css`
    background-color: ${props.theme.colors.info};
    color: ${props.theme.colors.white};
    &:hover {
      background-color: ${props.theme.colors.info};
    }
  `}
`;

const Padding = styled.div`
  padding: 20px 20px 10px;
  position: relative;
  flex-grow: 1;
`;

class Popup extends Component {

  constructor(props) {
    super(props);
    const { children, tabs } = props;
    if (tabs) {
      this.state = {
        items: children.length ? children.map(tab => ({
          tab,
          ...tab.props,
        })) : [{
          tab: children,
          ...children.props,
        }],
      };
    } else {
      this.state = {};
    }
  }

  render() {
    const { children, tabs, active, handleTab, title } = this.props;
    const { items } = this.state;
    if (tabs) {
      const current = items.find(tab => tab.id === active) || {};
      return (
        <Wrap>
          <Menu>
            <Heading inverted>Menu</Heading>
            { items.map(item => (
              <MenuItem
                key={ item.title }
                onClick={ () => handleTab(item.id) }
                active={ item.id === active }
              >
                { item.icon && <Icon name={ item.icon } /> } { item.title }
              </MenuItem>
            )) }
          </Menu>
          <Padding>
            { current.title && <Heading inverted>{ current.title }</Heading> }
            { current.component ? <current.component /> : current.tab }
          </Padding>
        </Wrap>
      );
    }
    return (
      <Wrap>
        <Padding>
          { title && <Heading inverted>{ title }</Heading> }
          { children }
        </Padding>
      </Wrap>
    );
  }

}

Popup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  tabs: PropTypes.bool,
  active: PropTypes.string,
  title: PropTypes.string,
  handleTab: PropTypes.func,
};

Popup.defaultProps = {
  tabs: false,
  active: null,
  title: null,
  handleTab: () => {},
};

export default Popup;

export const Tab = styled.div``;
