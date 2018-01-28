const env = process.env.REACT_APP_NODE_ENV || 'development';

const defaults = {
  website: 'https://www.rumblum.com',
  beta: true,
};

const environment = require(`./${env}`);

export default Object.assign(defaults, environment);

