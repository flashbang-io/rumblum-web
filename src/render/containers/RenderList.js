import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { attemptGetRenders } from '../render.reducer';
import Level from '../../shared/components/Level';
import { Button, Heading, Subheading, Group } from '../../shared/components/theme';

class RenderList extends Component {

  componentDidMount() {
    this.props.attemptGetRenders(this.props.template.id);
  }

  render() {
    const { renders } = this.props;
    return (
      <div>
        { renders.map(({ id, filename, extension, location, createdAt }) => (
          <Level key={ id } across center>
            <div style={{ marginRight: 'auto' }}>
              <Heading inverted flatten>{ filename ? `${filename}${extension}` : id }</Heading>
              <Subheading style={{ marginBottom: 0 }}>Created on { moment(createdAt).format('ll') }</Subheading>
            </div>
            <Group>
              <Button tiny flatten to={ `/preview?url=${location}` } target="_blank">Preview</Button>
              <Button tiny flatten href={ location } download>Download</Button>
            </Group>
          </Level>
        )) }
      </div>
    );
  }

}

RenderList.propTypes = {
  attemptGetRenders: PropTypes.func.isRequired,
  renders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  template: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  render: { renders, loading },
  template,
}) => ({
  renders,
  loading,
  template: template.current,
});
const mapDispatchToProps = { attemptGetRenders };
export default connect(mapStateToProps, mapDispatchToProps)(RenderList);
