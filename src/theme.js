import chroma from 'chroma-js';

const theme = {
  size: {
    radius: '3px',
  },
  shadows: {
    off: '0 0 5px 0 rgba(90, 90, 90, 0.10)',
    dark: '0 0 5px 0 rgba(0, 0, 0, 0.5)',
  },
  colors: {
    white: '#ffffff',
    black: '#000000',
    off: '#f3f7fd',
    offer: chroma('#f3f7fd').darken(0.3),
    offest: chroma('#f3f7fd').darken(0.5),
    dark: '#16191A',
    pinch: chroma('#3ecc8b').darken(0.3),
    pinchHover: '#3ecc8b',
    darkover: chroma('#16191A').brighten(0.1),
    darkless: '#202426',
    darklesser: chroma('#202426').brighten(0.5),
    darker: '#151515',
    grey: '#888888',
    greyer: '#333333',
    greyless: '#b3b3b3',
    info: '#28b0ff',
    infoHover: chroma('#28b0ff').brighten(0.3),
    electric: '#0e4756',
    success: '#2fce3a',
    danger: '#fc0f3e',
    dangerHover: chroma('#fc0f3e').darken(0.3),
  },
};

export default theme;

export const getSize = color => props => props.theme.size[color];
export const getShadow = color => props => props.theme.shadows[color];
export const getColor = color => props => props.theme.colors[color];
