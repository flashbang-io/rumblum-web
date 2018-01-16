import chroma from 'chroma-js';

const theme = {
  size: {
    radius: '3px',
  },
  colors: {
    white: '#ffffff',
    black: '#000000',
    off: chroma('#ffffff').darken(0.5),
    offer: chroma('#ffffff').darken(1),
    dark: '#16191A',
    darkover: chroma('#16191A').brighten(0.1),
    darkless: '#202426',
    darklesser: chroma('#202426').brighten(0.5),
    darker: '#151515',
    grey: '#888888',
    greyer: '#333333',
    info: '#28b0ff',
    electric: '#0e4756',
    success: '#2fce3a',
    danger: '#fc0f3e',
  },
};

export default theme;
