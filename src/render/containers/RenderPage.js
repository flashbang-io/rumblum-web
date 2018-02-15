import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { attemptCreateRender, resetRender } from '../render.reducer';
import { attemptGetTemplate, resetTemplate } from '../../template/template.reducer';
import { Heading, Container } from '../../shared/components/theme';
import RenderForm from './RenderForm';
import Page from '../components/Page';

class RenderPage extends Component {

  componentDidMount() {
    this.props.attemptGetTemplate(this.props.match.params.templateId);
  }

  componentWillReceiveProps({ templateProblem }) {
    if (templateProblem) {
      if (templateProblem.statusCode === 401) {
        this.props.history.push('/login'); // user not authorised to access
      }
      if (templateProblem.statusCode === 404) {
        this.props.history.push('/login'); // template not found for id
      }
    }
  }

  componentWillUnmount() {
    this.props.resetRender();
    this.props.resetTemplate();
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.template) {
      this.props.attemptCreateRender(this.props.template.id);
    }
  }

  render() {
    const { template } = this.props;
    const tags = template && template.tags ? template.tags : [];
    const defaults = tags.reduce((accum, next) => ({
      ...accum,
      [next.name]: next.placeholder || '',
    }), {});
    return (
      <DocumentTitle title={ `${template && template.name ? template.name : 'Render Document'} | Rumblum` }>
        <Page>
          <Container>
            <Heading inverted>Render Document</Heading>
            { template && <RenderForm
              handleSubmit={ event => this.handleSubmit(event) }
              initialValues={{ defaults }}
              tags={ tags }
              { ...this.props }
            /> }
          </Container>
        </Page>
      </DocumentTitle>
    );
  }

}

RenderPage.propTypes = {
  attemptCreateRender: PropTypes.func.isRequired,
  resetRender: PropTypes.func.isRequired,
  attemptGetTemplate: PropTypes.func.isRequired,
  resetTemplate: PropTypes.func.isRequired,
  templateProblem: PropTypes.any,
  template: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

RenderPage.defaultProps = {
  template: null,
  templateProblem: null,
};

const mapStateToProps = ({
  render: { loading, problem },
  template,
}) => ({ loading, problem, template: template.current, templateProblem: template.problem });
const mapDispatchToProps = { attemptCreateRender, resetRender, attemptGetTemplate, resetTemplate };
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(RenderPage);
