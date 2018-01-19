import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptCreateChronicle, erroredChronicle } from '../../chronicle/chronicle.reducer';
import { modalCampaign } from '../../shared/campaign.reducer';
import ChronicleForm from '../../chronicle/containers/ChronicleForm';

class ChronicleTab extends Component {

  componentWillUnmount() {
    this.props.erroredChronicle();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptCreateChronicle(this.props.template.id)
      .then(() => this.props.modalCampaign());
  }

  render() {
    return (
      <ChronicleForm
        handleSubmit={ event => this.handleSubmit(event) }
        { ...this.props }
      />
    );
  }

}

ChronicleTab.propTypes = {
  attemptCreateChronicle: PropTypes.func.isRequired,
  erroredChronicle: PropTypes.func.isRequired,
  modalCampaign: PropTypes.func.isRequired,
  template: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  template: { current },
  chronicle: { loading, problem },
}) => ({ loading, problem, template: current });
const mapDispatchToProps = { attemptCreateChronicle, erroredChronicle, modalCampaign };
export default connect(mapStateToProps, mapDispatchToProps)(ChronicleTab);
