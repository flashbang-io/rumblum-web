import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Button, Group } from '../../shared/components/theme';
import config from '../../config';

export const ExampleWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
`;

const Wrap = styled.div`
  min-width: 30%;
  max-width: 180px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: ${props => props.theme.colors.darklesser};
  border: 1px solid ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.size.radius};
  flex-basis: 0;
  flex-grow: 1;
  ${props => props.active && css`
    border: 1px solid ${props.theme.colors.info};
  `}
`;

const Heading = styled.div`
  font-size: 14px;
  margin-bottom: 2px;
`;

const Subheading = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.grey};
  margin-bottom: 40px;
`;

const Example = ({ document: { id, title, location, description }, handleSelect, ...props }) => (
  <Wrap { ...props }>
    <Heading>{ title }</Heading>
    <Subheading>{ description }</Subheading>
    <Group>
      <Button flatten grow tiny onClick={ () => handleSelect(id) }>Select</Button>
      <Button flatten grow tiny href={ `${config.url}/preview?url=${encodeURIComponent(location)}` } target="_blank">Preview</Button>
    </Group>
  </Wrap>
);

Example.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  document: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
};

export default Example;
