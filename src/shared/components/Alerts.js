import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Icon } from './theme';

const hook = document.getElementById('hook');

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrap = styled.div`
  position: fixed;
  left: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  z-index: 1500;
`;

const Item = styled.div`
  background-color: ${props => props.theme.colors.darkless};
  border: 1px solid ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.size.radius};
  padding: 10px 14px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 12px;
  animation: ${fadeIn} .5s;
  i {
    margin-left: 10px;
    cursor: pointer;
  }
`;

class Alerts extends Component {

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

  render() {
    const { campaigns } = this.props;
    const modal = (
      <Wrap>
        { campaigns.map(({ id, message }) => (
          <Item key={ id }>
            { message }
            <Icon name="times" onClick={ () => this.props.handleClose(id) } />
          </Item>
        )) }
      </Wrap>
    );
    return ReactDOM.createPortal(
      modal,
      this.state.wrap,
    );
  }

}

Alerts.propTypes = {
  handleClose: PropTypes.func.isRequired,
  campaigns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string,
  })).isRequired,
};

export default Alerts;
