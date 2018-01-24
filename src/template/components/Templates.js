import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { Icon, Group, Label } from '../../shared/components/theme';
import { Ghost } from '../../shared/components/Level';
import config from '../../config';

const Item = styled.div`
  box-shadow: ${props => props.theme.shadows.off};
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.size.radius};
  colors: ${props => props.theme.size.greyer};
  border: 1px solid #dee8f1;
  display: flex;
  padding: 15px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const Badge = styled.div`
  height: 90px;
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => props.theme.colors.offer};
  border-radius: ${props => props.theme.size.radius};
  color: ${props => props.theme.colors.greyless};
  font-size: 30px;
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

const Name = styled.div`
  font-size: 16px;
  margin-bottom: 4px;
`;

const Meta = styled.div`
  font-size: 11px;
  color: ${props => props.theme.colors.grey};
  flex-grow: 1;
`;

const Action = styled.a`
  height: 30px;
  width: 30px;
  background-color: ${props => props.theme.colors.offer};
  color: ${props => props.theme.colors.greyless};
  font-size: 14px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .2s;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: ${props => props.theme.colors.offest};
  }
`;

const Template = ({ handleInspect, handleRender, handleDefaults, template: { id, name, updatedAt, currentChronicleId, accessPublic } }) => (
  <Item>
    <Content>
      <Name>{ name }</Name>
      <Meta>Last updated { moment(updatedAt).format('ll') }</Meta>
      <Group>
        <Label title="Edit">
          <Action onClick={ () => handleInspect({ id }) }>
            <Icon name="edit" />
          </Action>
        </Label>
        { currentChronicleId && (
          <Label title="Render Document">
            <Action onClick={ () => handleRender({ id }) }>
              <Icon name="plus" />
            </Action>
          </Label>
        ) }
        { currentChronicleId && (
          <Label title="Default Tags">
            <Action onClick={ () => handleDefaults({ id }) }>
              <Icon name="bars" />
            </Action>
          </Label>
        ) }
        { accessPublic && (
          <Label title="Share">
            <Action href={ `${config.url}/share/${id}` } target="_blank">
              <Icon name="share-square-o" />
            </Action>
          </Label>
        ) }
      </Group>
    </Content>
    <Badge>
      <Icon name="file-word-o" />
    </Badge>
  </Item>
);

Template.propTypes = {
  handleInspect: PropTypes.func.isRequired,
  handleRender: PropTypes.func.isRequired,
  handleDefaults: PropTypes.func.isRequired,
  template: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const Wrap = styled.div`
  flex-grow: 1;
  min-width: 70%;
`;

const Templates = ({ templates, loading, ...props }) => (
  <Wrap>
    { templates.map(template => (
      <Template
        key={ template.id }
        template={ template }
        { ...props }
      />
    )) }
    { loading && (!templates || !templates.length) && <Ghost /> }
  </Wrap>
);

Templates.propTypes = {
  templates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Templates;
