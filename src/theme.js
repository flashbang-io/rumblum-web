import chroma from 'chroma-js';

const theme = {
  size: {
    radius: '3px',
  },
  colors: {
    white: '#ffffff',
    off: chroma('#ffffff').darken(0.5),
    offer: chroma('#ffffff').darken(1),
    dark: '#16191A',
    darkless: '#202426',
    darklesser: chroma('#202426').darken(0.5),
    darker: '#151515',
    grey: '#888888',
    greyer: '#333333',
    info: '#28b0ff',
    infoHover: chroma('#28b0ff').darken(1),
    success: '#2fce3a',
    danger: '#fc0f3e',
  },
};

export default theme;
