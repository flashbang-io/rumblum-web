import chroma from 'chroma-js';

const theme = {
  size: {
    radius: '3px',
  },
  colors: {
    dark: '#282a2d',
    darker: chroma('#282a2d').darken(1),
    off: chroma('#ffffff').darken(1),
  },
};

export default theme;
