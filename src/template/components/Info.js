import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Spread = styled.div`
  display: flex;
  & > * {
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const Sidebar = styled.div``;

const Wrap = styled.div`
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: ${props => props.theme.size.radius};
`;

const Heading = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 2px;
`;

const Subheading = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.grey};
`;

export const Info = ({ article: { title, sub } }) => (
  <Wrap>
    <Heading>{ title }</Heading>
    <Subheading>{ sub }</Subheading>
  </Wrap>
);

Info.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    sub: PropTypes.string.isRequired,
  }).isRequired,
};
