import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptCreateRender, currentRender } from '../render.reducer';
import { currentTemplate } from '../../template/template.reducer';
import { Heading, Modal } from '../../shared/components/theme';
import Popup from '../../shared/components/Popup';
import RenderForm from './RenderForm';

class RenderModal extends Component {

  componentWillUnmount() {
    this.props.currentRender();
    this.props.currentTemplate();
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.template) {
      this.props.attemptCreateRender(this.props.template.id);
    }
  }

  render() {
    const { template } = this.props;
    return (
      <Modal handleClose={ this.props.handleClose }>
        <Popup>
          <Heading inverted>Render Document</Heading>
          { template && <RenderForm
            handleSubmit={ event => this.handleSubmit(event) }
            tags={ template && template.tags ? template.tags : [] }
            { ...this.props }
          /> }
        </Popup>
      </Modal>
    );
  }

}

RenderModal.propTypes = {
  attemptCreateRender: PropTypes.func.isRequired,
  currentRender: PropTypes.func.isRequired,
  currentTemplate: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  template: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

RenderModal.defaultProps = {
  template: null,
};

const mapStateToProps = ({
  render: { loading, problem },
  template,
}) => ({ loading, problem, template: template.current });
const mapDispatchToProps = { attemptCreateRender, currentRender, currentTemplate };
export default connect(mapStateToProps, mapDispatchToProps)(RenderModal);
