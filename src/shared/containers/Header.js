import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { attemptLogoutPlayer } from '../../player/player.reducer';
import { Wrap, Content, Menu, MenuItem, Brand } from '../components/Header';
import { Container, Icon } from '../components/theme';

class Header extends Component {

  handleLogout() {
    this.props.attemptLogoutPlayer();
  }

  render() {
    return (
      <Wrap>
        <Container>
          <Content>
            <Brand>
              Rumblum
              <br />
              <span>Document Templates</span>
            </Brand>
            <Menu>
              <MenuItem>Templates</MenuItem>
              <MenuItem onClick={ () => this.handleLogout() }>Logout</MenuItem>
              <MenuItem>
                <Icon name="cog" /> Settings
              </MenuItem>
            </Menu>
          </Content>
        </Container>
      </Wrap>
    );
  }
}

Header.propTypes = {
  attemptLogoutPlayer: PropTypes.func.isRequired,
};

const mapStateToProps = ({ player }) => ({ player: player.current });
const mapDispatchToProps = { attemptLogoutPlayer };
export default connect(mapStateToProps, mapDispatchToProps)(Header);

