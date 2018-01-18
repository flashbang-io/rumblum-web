import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeCampaign } from '../campaign.reducer';
import Alerts from '../components/Alerts';

class Helpers extends Component {

  handleClose(id) {
    this.props.removeCampaign(id);
  }

  render() {
    const { campaigns } = this.props;
    return (
      <Alerts
        campaigns={ campaigns }
        handleClose={ (...args) => this.handleClose(...args) }
      />
    );
  }

}

Helpers.propTypes = {
  removeCampaign: PropTypes.func.isRequired,
  campaigns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = ({
  campaign: { campaigns },
}) => ({ campaigns });
const mapDispatchToProps = {
  removeCampaign,
};
export default connect(mapStateToProps, mapDispatchToProps)(Helpers);

