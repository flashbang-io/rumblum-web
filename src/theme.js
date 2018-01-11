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
    darker: '#151515',
    grey: '#888888',
  },
};

export default theme;
