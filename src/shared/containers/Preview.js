import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import Frame from '../components/Frame';

class RenderPage extends Component {

  constructor(props) {
    super(props);
    const { url } = queryString.parse(props.location.search);
    if (!url) {
      this.props.history.push('/');
    }
    this.state = { url };
  }

  render() {
    const { url } = this.state;
    return (
      <Frame src={ `https://docs.google.com/viewer?url=${url}&embedded=true` } title="Rumblum Document" />
    );
  }

}

RenderPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

RenderPage.defaultProps = {
};

const mapStateToProps = ({
  template: { loading, problem },
}) => ({ loading, problem });
const mapDispatchToProps = {};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(RenderPage);
