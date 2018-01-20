import chroma from 'chroma-js';
import { keyframes } from 'styled-components';
import { NO_CONTENT } from 'http-status';
import config from '../config';

export const handleResponse = async res => {
  if (res.status === NO_CONTENT) return {};
  const data = await res.json();
  if (res.ok) return data;
  throw data.error;
};

export const thunkify = ({ start, end, error }) => work => async (dispatch, getState) => {
  let result;
  let problem;
  if (start) {
    start(dispatch, getState);
  }
  try {
    result = await work(dispatch, getState);
  } catch (e) {
    if (config.environment !== 'production') {
      console.warn(e);
    }
    if (e.code === 'AUTHORIZATION_REQUIRED') {
      problem = {
        ...e,
        message: 'User does not have sufficient privileges to make action.',
      };
    } else {
      problem = e;
    }
    if (error) {
      error(problem, dispatch, getState);
    }
  }
  if (end) {
    end(dispatch, getState);
  }
  return { error: problem, data: result };
};

export const standardHeaders = otherHeaders => Object.assign({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}, otherHeaders || {});

export const textToDecimal = text => {
  const total = text.split('').reduce((count, char) => {
    const code = char.charCodeAt(0);
    if (Number.isNaN(code)) return count;
    return count + code;
  }, 0);
  return (total % 100) / 100;
};

export const textToColor = word => chroma.scale('Spectral')(textToDecimal(word)).hex();

export const pulse = (start, end) => keyframes`
  0% {
    background-color: ${start};
  }
  50% {
    background-color: ${end};
  }
  100% {
    background-color: ${start};
  }
`;
