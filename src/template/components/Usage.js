import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Button, Group } from '../../shared/components/theme';
import { Item } from './Templates';

const Wrap = Item.extend`
  align-items: center;
`;

const Details = styled.div`
  flex-grow: 1;
`;

const Content = styled.div`
  color: ${props => props.theme.colors.grey};
  font-size: 11px;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
`;

const Progress = styled.div`
  background-color: ${props => props.theme.colors.offest};
  border-radius: 100px;
  padding: 3px;
  box-sizing: border-box;
  height: 11px;
  width: 100%;
  overflow: hidden;
`;

const Bar = styled.div`
  background-color: ${props => props.theme.colors.pinch};
  width: ${props => props.value}%;
  height: 100%;
  border-radius: 100px;
  ${props => props.nearly && css`
    background-color: ${props.theme.colors.danger};
  `}
`;

const Usage = ({ handleUpgrade, workspace, total, usage, ...props }) => {
  const percent = !!total && (usage / total) * 100;
  const value = !percent ? 0 : percent > 100 ? 100 : percent;
  const nearly = value && value > 80;
  return (
    <Wrap { ...props }>
      <Details>
        <Content>
          <div>Documents created this month</div>
          { !!total && <div>{ usage } / { total }</div> }
        </Content>
        <Progress>
          { !!value && <Bar value={ value } nearly={ nearly } { ...props } /> }
        </Progress>
      </Details>
      { (nearly || !workspace.subscription) && (
        <Group style={{ marginLeft: '15px' }}>
          <Button flatten small dull onClick={ handleUpgrade }>Upgrade</Button>
        </Group>
      ) }
    </Wrap>
  );
};

Usage.propTypes = {
  handleUpgrade: PropTypes.func.isRequired,
  workspace: PropTypes.shape({
    subscription: PropTypes.string,
  }),
  total: PropTypes.number,
  usage: PropTypes.number,
};

Usage.defaultProps = {
  total: null,
  usage: null,
  workspace: null,
};

export default Usage;
