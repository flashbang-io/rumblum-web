import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { Icon } from '../../shared/components/theme';
import { pulse } from '../../shared/util.helper';

const Wrap = styled.div`
  padding: 10px;
  box-sizing: border-box;
  background-color: ${props => props.theme.colors.darkless};
  border-radius: ${props => props.theme.size.radius};
  overflow: hidden;
  display: flex;
`;

const Ghost = styled.div`
  height: 70px;
  box-sizing: border-box;
  border-radius: ${props => props.theme.size.radius};
  background-color: ${props => props.theme.colors.off};
  animation: ${props => pulse(props.theme.colors.off, props.theme.colors.offer)} 2s linear infinite;
`;

const Badge = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => props.theme.colors.darker};
  border-radius: ${props => props.theme.size.radius};
  border: 1px solid ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.grey};
  font-size: 25px;
`;

const Content = styled.div`
  flex-grow: 1;
  margin-left: 10px;
`;

const Name = styled.div`
  font-size: 16px;
  color: ${props => props.theme.colors.white};
  margin-bottom: 2px;
`;

const Meta = styled.div`
  font-size: 11px;
  color: ${props => props.theme.colors.grey};
  text-transform: uppercase;
`;

const Template = ({ template: { name, updatedAt } }) => (
  <Wrap>
    <Badge>
      <Icon name="file-word-o" />
    </Badge>
    <Content>
      <Name>{ name }</Name>
      <Meta>Updated { moment(updatedAt).format('ll') }</Meta>
    </Content>
  </Wrap>
);

Template.propTypes = {
  template: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

Template.defaultProps = {
};

const List = styled.div`
  min-width: 70%;
  flex-grow: 1;
`;

const Templates = ({ templates, loading }) => (
  <List>
    { loading && <Ghost /> }
    { templates.map(template => <Template key={ template.id } template={ template } />) }
  </List>
);

Templates.propTypes = {
  templates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Templates;
