import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptUpdateWorkspace, attemptRemoveWorkspace } from '../workspace.reducer';
import { modalCampaign } from '../../shared/campaign.reducer';
import SpaceForm from './SpaceForm';
import { Control, Button, Group } from '../../shared/components/theme';

class SpaceTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sure: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.attemptUpdateWorkspace(this.props.workspace.id);
  }

  handleDelete() {
    if (this.state.sure) {
      this.props.attemptRemoveWorkspace(this.props.workspace.id)
        .then(() => this.props.modalCampaign());
    } else {
      this.setState({ sure: true });
    }
  }

  render() {
    const { workspace } = this.props;
    return (
      <div>
        <SpaceForm
          handleSubmit={ event => this.handleSubmit(event) }
          initialValues={ workspace }
          { ...this.props }
        />
        <Control
          label="Delete Workspace"
          help="Warning, this can not be undone."
          upline
        >
          <Group>
            { this.state.sure && <Button dull onClick={ () => this.toggleSure() }>Cancel</Button> }
            <Button danger onClick={ () => this.handleDelete() }>{ this.state.sure ? 'Are you sure?' : 'Delete' }</Button>
          </Group>
        </Control>
      </div>
    );
  }

}

SpaceTab.propTypes = {
  attemptUpdateWorkspace: PropTypes.func.isRequired,
  attemptRemoveWorkspace: PropTypes.func.isRequired,
  modalCampaign: PropTypes.func.isRequired,
  workspace: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  workspace: { current, loading, problem },
}) => ({ loading, problem, workspace: current });
const mapDispatchToProps = { attemptUpdateWorkspace, attemptRemoveWorkspace, modalCampaign };
export default connect(mapStateToProps, mapDispatchToProps)(SpaceTab);
