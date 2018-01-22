import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { Icon, Button, Group } from '../../shared/components/theme';
import Level, { Ghost } from '../../shared/components/Level';
import config from '../../config';

const Badge = styled.div`
  height: 80px;
  width: 80px;
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
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Name = styled.div`
  font-size: 16px;
  color: ${props => props.theme.colors.white};
  margin-bottom: 4px;
`;

const Meta = styled.div`
  font-size: 11px;
  color: ${props => props.theme.colors.grey};
  flex-grow: 1;
`;

const Template = ({ handleInspect, handleRender, handleDefaults, template: { id, name, updatedAt, currentChronicleId, accessPublic } }) => (
  <Level across>
    <Badge>
      <Icon name="file-word-o" />
    </Badge>
    <Content>
      <Name>{ name }</Name>
      <Meta>Last updated { moment(updatedAt).format('ll') }</Meta>
      <Group>
        <Button flatten tiny onClick={ () => handleInspect({ id }) }>Edit</Button>
        { currentChronicleId && <Button flatten tiny onClick={ () => handleRender({ id }) }>Render Document</Button> }
        { currentChronicleId && <Button flatten tiny onClick={ () => handleDefaults({ id }) }>Default Tags</Button> }
        { accessPublic && <Button flatten tiny href={ `${config.url}/share/${id}` } target="_blank">Share</Button> }
      </Group>
    </Content>
  </Level>
);

Template.propTypes = {
  handleInspect: PropTypes.func.isRequired,
  handleRender: PropTypes.func.isRequired,
  handleDefaults: PropTypes.func.isRequired,
  template: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const List = styled.div`
  min-width: 70%;
  flex-grow: 1;
`;

const Templates = ({ templates, loading, ...props }) => (
  <List>
    { templates.map(template => (
      <Template
        key={ template.id }
        template={ template }
        { ...props }
      />
    )) }
    { loading && (!templates || !templates.length) && <Ghost /> }
  </List>
);

Templates.propTypes = {
  templates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Templates;
