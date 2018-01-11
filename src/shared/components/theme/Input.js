import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { sizeBig, sizeNormal, sizeSmall, sizeTiny } from './style';

const InputStyled = styled.input`
  background-color: ${props => props.theme.colors.dark};
  border: 1px solid ${props => props.theme.colors.darker};
  color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.size.radius};
  outline: none;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
  ${sizeNormal}
  ${props => props.big && sizeBig}
  ${props => props.small && sizeSmall}
  ${props => props.tiny && sizeTiny}
`;

const InputTextarea = InputStyled.withComponent('textarea').extend`
  height: 100px;
  resize: none;
`;

const Input = ({ type, input, ...props }) => {
  if (type === 'textarea') {
    return (
      <InputTextarea
        type={ type }
        { ...input }
        { ...props }
      />
    );
  }
  if (type === 'date') {
    return (
      <InputStyled
        type={ type }
        { ...input }
        value={ moment(input.value).format('YYYY-MM-DD') }
        { ...props }
      />
    );
  }
  return (
    <InputStyled
      type={ type }
      { ...input }
      { ...props }
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  input: PropTypes.object,
};

Input.defaultProps = {
  type: 'text',
  input: {},
};

export default Input;
