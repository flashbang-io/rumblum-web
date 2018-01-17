import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../../shared/components/theme';

const Wrap = styled.div`
  background-color: ${props => props.theme.colors.off};
  border-radius: ${props => props.theme.size.radius};
  border: 1px solid ${props => props.theme.colors.offer};
  color: ${props => props.theme.colors.grey};
  padding: 10px 0;
  font-size: 12px;
  margin-bottom: 10px;
  box-sizing: border-box;
  position: relative;
  flex-grow: 1;
`;

const Space = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.offer};
  margin: 0 10px;
  padding: 10px;
`;

const Popup = Wrap.extend`
  background-color: ${props => props.theme.colors.white};
  padding: 20px;
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

class Spaces extends Component {

  constructor(props) {
    super(props);
    this.state = {
      popup: false,
    };
  }

  togglePopup() {
    this.setState({ popup: !this.state.popup });
  }

  render() {
    const { popup } = this.state;
    const { workspaces, handleSelect, children } = this.props;
    return (
      <Wrap>
        { workspaces.map(({ id, name }) => (
          <Space
            key={ id }
            onClick={ () => handleSelect(id) }
          >
            { name }
          </Space>
        )) }
        <Button onClick={ () => this.togglePopup() }>Edit</Button>
        { popup && <Popup>{ children }</Popup> }
      </Wrap>
    );
  }

}

Spaces.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  workspaces: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
};

Spaces.defaultProps = {
  workspaces: [],
};

export default Spaces;
