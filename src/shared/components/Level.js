import styled, { css } from 'styled-components';
import { pulse } from '../../shared/util.helper';

const Level = styled.div`
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 10px;
  background-color: ${props => props.theme.colors.darklesser};
  border-radius: ${props => props.theme.size.radius};
  display: flex;
  flex-direction: columns;
  ${props => props.rows && css`
    flex-direction: rows;
  `}
  ${props => props.center && css`
    align-items: center;
  `}
`;

export default Level;

export const Ghost = Level.extend`
  height: ${props => props.heigh || '100px'};
  background-color: ${props => props.theme.colors.off};
  animation: ${props => pulse(props.theme.colors.off, props.theme.colors.offer)} 2s linear infinite;
`;
