import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptCreateChronicle } from '../../chronicle/chronicle.reducer';
import { modalCampaign } from '../../shared/campaign.reducer';
import ChronicleForm from '../../chronicle/containers/ChronicleForm';

class ChronicleTab extends Component {

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptCreateChronicle(this.props.template.id)
      .then(chronicle => chronicle && this.props.modalCampaign());
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
  modalCampaign: PropTypes.func.isRequired,
  template: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  template: { current },
  chronicle: { loading, problem },
}) => ({ loading, problem, template: current });
const mapDispatchToProps = { attemptCreateChronicle, modalCampaign };
export default connect(mapStateToProps, mapDispatchToProps)(ChronicleTab);
