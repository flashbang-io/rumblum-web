import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { titleCase } from 'change-case';
import { sizeNormal } from './style';
import Icon from './Icon';

const Wrap = styled.div`
  border-radius: ${props => props.theme.size.radius};
  background-color: ${props => props.theme.colors.danger};
  color: ${props => props.theme.colors.white};
  ${sizeNormal}
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  line-height: 18px;
  width: 100%;
  max-width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: pre-wrap;
  ${props => !props.open && css`
    display: none;
  `}
`;

const Close = styled.div`
  font-size: 15px;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  min-width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: .2s;
  margin-left: 10px;
  margin-bottom: auto;
  &:hover {
    background-color: ${props => props.theme.colors.dangerover};
  }
`;

const formatProblem = (problem = {}) => {
  if (problem.details && problem.details.messages) {
    return `There was a problem with the following areas:
${Object.keys(problem.details.messages).map((code, index) => `${index + 1}. ${titleCase(code)}: ${problem.details.messages[code][0]}`).join('\n')}`;
  }
  return problem.message || problem;
};

class Error extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    const { children, problem } = this.props;
    const output = children || formatProblem(problem) || 'Oops.. There was a problem. Please refresh the page or contact our admins.';
    return (
      <Wrap open={ open }>
        { output }
        <Close onClick={ () => this.handleClose() }>
          <Icon name="times" />
        </Close>
      </Wrap>
    );
  }

}

Error.propTypes = {
  children: PropTypes.string,
  problem: PropTypes.any,
};

Error.defaultProps = {
  children: null,
  problem: null,
};

export default Error;
