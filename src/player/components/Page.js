import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrap = styled.div`
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Centered = styled.div`
  width: 400px;
  max-width: 100%;
  padding: 15px;
  box-sizing: border-box;
`;

const Page = ({ children }) => (
  <Wrap>
    <Centered>{ children }</Centered>
  </Wrap>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
