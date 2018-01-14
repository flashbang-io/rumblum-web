import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { attemptGetChronicles } from '../chronicle.reducer';
import Level from '../../shared/components/Level';
import { Button, Heading, Subheading } from '../../shared/components/theme';

class ChronicleList extends Component {

  componentDidMount() {
    this.props.attemptGetChronicles(this.props.template.id);
  }

  render() {
    const { chronicles } = this.props;
    return (
      <div>
        { chronicles.map(({ id, location, tags, createdAt }) => (
          <Level key={ id } rows center>
            <div style={{ marginRight: 'auto' }}>
              <Heading inverted flatten>{ moment(createdAt).format('ll') }</Heading>
              <Subheading style={{ marginBottom: 0 }}>Tags: { tags && tags.length ? tags.length : 0 }</Subheading>
            </div>
            <Button tiny flatten href={ location } download>Download</Button>
          </Level>
        )) }
      </div>
    );
  }

}

ChronicleList.propTypes = {
  attemptGetChronicles: PropTypes.func.isRequired,
  chronicles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  template: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  chronicle: { chronicles, loading },
  template,
}) => ({
  chronicles,
  loading,
  template: template.current,
});
const mapDispatchToProps = { attemptGetChronicles };
export default connect(mapStateToProps, mapDispatchToProps)(ChronicleList);
