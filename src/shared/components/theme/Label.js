import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Wrap = styled.div`
  position: relative;
`;

const Center = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateY(110%);
  display: flex;
  flex-direction: column;
  align-items: center;
  ${props => props.right && css`
    transform: translateY(110%);
  `}
`;

const Bubble = styled.div`
  border-radius: ${props => props.theme.size.radius};
  background-color: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.white};
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  box-sizing: border-box;
  padding: 6px 10px;
  text-align: center;
`;

const Arrow = styled.div`
  width: 0; 
  height: 0; 
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid ${props => props.theme.colors.dark};
  margin-bottom: -1px;
`;

class Label extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleOpen() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  render() {
    const { title, children } = this.props;
    const { show } = this.state;
    return (
      <Wrap
        onMouseEnter={ () => this.handleOpen() }
        onMouseLeave={ () => this.handleClose() }
      >
        { children }
        { show && (
          <Center>
            <Arrow />
            <Bubble { ...this.props }>{ title }</Bubble>
          </Center>
        ) }
      </Wrap>
    );
  }

}

Label.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Label;
