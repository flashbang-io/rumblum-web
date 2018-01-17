import styled from 'styled-components';

export const Segment = styled.div`
  background-color: ${props => props.theme.colors.offer};
  border-radius: ${props => props.theme.size.radius};
  color: ${props => props.theme.colors.grey};
  padding: 10px;
  font-size: 12px;
  min-width: 30%;
  flex-grow: 1;
  margin-right: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
  display: inline-block;
  height: 100px;
  &:nth-child(3n) {
    margin-right: 0;
  }
`;

export const Coloured = Segment.extend`
  background-color: ${props => props.theme.colors.grey};
  color: ${props => props.theme.colors.white};
`;

export const Workspaces = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
