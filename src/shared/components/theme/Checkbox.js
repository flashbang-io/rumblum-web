import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

export const Wrap = styled.div`
  background-color: ${props => props.theme.colors.dark};
  border: 1px solid ${props => props.theme.colors.darker};
  color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.size.radius};
  outline: none;
  margin: 10px 0;
  padding: 2px;
  display: flex;
  cursor: pointer;
  width: 60px;
  transition: .2s;
  ${props => props.active && css`
    background-color: ${props.theme.colors.info};
  `}
`;

export const Square = styled.div`
  background-color: ${props => props.theme.colors.off};
  border-radius: ${props => props.theme.size.radius};
  height: 20px;
  width: 20px;
  transition: .2s;
  ${props => props.active && css`
    margin-left: 40px;
  `}
`;

class Checkbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: props.checked || false,
    };
  }

  componentWillReceiveProps({ value }) {
    this.setState({ status: typeof value === 'boolean' ? value : this.state.status });
  }

  toggle() {
    const status = !this.state.status;
    if (this.props.onChange) {
      this.props.onChange(status);
    } else {
      this.setState({ status });
    }
  }

  render() {
    const { status } = this.state;
    return (
      <Wrap active={ status } onClick={ () => this.toggle() }>
        <Square active={ status } />
      </Wrap>
    );
  }

}

Checkbox.propTypes = {
  value: PropTypes.any,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  value: false,
  checked: false,
  onChange: null,
};

export default Checkbox;
