import styled, { css } from 'styled-components';

const Level = styled.div`
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 10px;
  background-color: ${props => props.theme.colors.darklesser};
  border-radius: ${props => props.theme.size.radius};
  display: flex;
  flex-direction: columns;
  ${props => props.across && css`
    flex-direction: rows;
  `}
  ${props => props.center && css`
    align-items: center;
  `}
`;

export default Level;
