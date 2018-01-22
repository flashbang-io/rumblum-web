import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from './theme';

const Wrap = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${props => props.theme.colors.off};
  color: ${props => props.theme.colors.darkless};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
`;

const Heading = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Subheading = styled.div`
  font-size: 14px;
  line-height: 2em;
  color: ${props => props.theme.colors.grey};
  margin-bottom: 20px;
`;

const Pending = ({ handleLogout, loading }) => (
  <Wrap>
    <Content>
      <Heading>Account Pending Invitation</Heading>
      <Subheading>Hi there! Sorry but at the moment we are accepting new accounts by <strong>invitation only</strong>.</Subheading>
      <Subheading>¯\_(ツ)_/¯</Subheading>
      <Subheading>No need to fret. We will be releasing the app to the public very soon and we will let you know.</Subheading>
      <Subheading>Have a great day!</Subheading>
      <Button onClick={ handleLogout } disabled={ loading }>{ loading ? 'Loading...' : 'Logout' }</Button>
    </Content>
  </Wrap>
);

Pending.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Pending;
