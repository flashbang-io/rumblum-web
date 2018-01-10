import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ name, className, ...props }) => (
  <i className={ `fa fa-${name} ${className}` } { ...props } />
);

Icon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
};

Icon.defaultProps = {
  name: null,
  className: null,
};

export default Icon;
