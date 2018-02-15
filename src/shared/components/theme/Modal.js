import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const hook = document.getElementById('hook');

const Shadow = styled.div`
  padding: 60px 15px;
  box-sizing: border-box;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: ${props => props.hidden ? 'none' : 'flex'};
  justify-content: center;
  align-items: flex-start;
  z-index: 1000;
`;

class Modal extends Component {

  constructor(props) {
    super(props);
    const wrap = document.createElement('div');
    this.state = { wrap };
  }

  componentDidMount() {
    hook.appendChild(this.state.wrap);
  }

  componentWillUnmount() {
    hook.removeChild(this.state.wrap);
  }

  handleClick(e) {
    if (e.target === e.currentTarget) {
      this.props.handleClose();
    }
  }

  render() {
    const { children, hidden } = this.props;
    const modal = (
      <Shadow
        onClick={ (e) => this.handleClick(e) }
        hidden={ hidden }
      >
        { children }
      </Shadow>
    );
    return ReactDOM.createPortal(
      modal,
      this.state.wrap,
    );
  }

}

Modal.propTypes = {
  children: PropTypes.node,
  handleClose: PropTypes.func,
  hidden: PropTypes.bool,
};

Modal.defaultProps = {
  children: null,
  handleClose: () => {},
  hidden: false,
};

export default Modal;
