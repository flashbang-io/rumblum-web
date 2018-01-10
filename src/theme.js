import chroma from 'chroma-js';

const theme = {
  size: {
    radius: '3px',
  },
  colors: {
    dark: '#282a2d',
    darkless: chroma('#282a2d').brighten(0.5),
    darker: chroma('#282a2d').darken(1),
    off: chroma('#ffffff').darken(0.5),
    offer: chroma('#ffffff').darken(1),
    grey: '#888888',
    white: '#ffffff',
  },
};

export default theme;
