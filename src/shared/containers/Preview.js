import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import DocumentTitle from 'react-document-title';
import Frame from '../components/Frame';
import Splash from '../components/Splash';

class RenderPage extends Component {

  constructor(props) {
    super(props);
    const { url } = queryString.parse(props.location.search);
    if (!url) {
      this.props.history.push('/');
    }
    this.state = {
      url,
      display: false,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ display: true }), 1000);
  }

  handleDownload() {
    const a = document.createElement('a');
    a.href = this.state.url;
    a.download = true;
    a.click();
  }

  render() {
    const { url, display } = this.state;
    if (!display) {
      return <Splash />;
    }
    return (
      <DocumentTitle title="Preview | Rumblum">
        <Frame
          handleDownload={ () => this.handleDownload() }
          src={ `https://docs.google.com/viewer?url=${url}&embedded=true` }
          title="Rumblum Document"
        />
      </DocumentTitle>
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
