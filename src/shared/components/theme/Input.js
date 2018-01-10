import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

const InputStyled = styled.input`
  background-color: blue;
  border: 1px solid green;
  color: white;
`;

const InputTextarea = InputStyled.withComponent('textarea');

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
