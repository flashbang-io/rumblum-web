import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { pulse } from '../../shared/util.helper';
import { Icon, Group, Label } from '../../shared/components/theme';
import config from '../../config';

const Item = styled.div`
  box-shadow: ${props => props.theme.shadows.off};
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.size.radius};
  border: 1px solid #dee8f1;
  display: flex;
  padding: 15px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const Placeholder = Item.extend`
  height: 120px;
  background-color: ${props => props.theme.colors.offer};
  border: 1px solid ${props => props.theme.colors.offest};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${props => props.theme.colors.greyless};
  i {
    margin-left: 5px;
  }
`;

const Ghost = Placeholder.extend`
  animation: ${props => pulse(props.theme.colors.offer, props.theme.colors.offest)} 2s linear infinite;
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
  transition: .2s;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.offest};
  }
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

const Template = ({ handleInspect, handleRender, handleDefaults, handleUpload, template: { id, name, updatedAt, currentChronicleId, currentChronicle, accessPublic } }) => (
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
        { currentChronicle && (
          <Label title="Preview File">
            <Action href={ `${config.url}/preview?url=${encodeURIComponent(currentChronicle.location)}` } target="_blank">
              <Icon name="search-plus" />
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
    <Badge onClick={ () => handleUpload({ id }) }>
      <Icon name="file-word-o" />
    </Badge>
  </Item>
);

Template.propTypes = {
  handleInspect: PropTypes.func.isRequired,
  handleRender: PropTypes.func.isRequired,
  handleDefaults: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
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
    { loading && !templates.length && <Ghost /> }
    { !loading && !templates.length && (
      <Placeholder>
        Make your first template by clicking the button up there <Icon name="chevron-up" />
      </Placeholder>
    ) }
  </Wrap>
);

Templates.propTypes = {
  templates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Templates;
