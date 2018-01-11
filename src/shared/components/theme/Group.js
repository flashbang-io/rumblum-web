import styled, { css } from 'styled-components';

export default styled.div`
  display: flex;
  & > * {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
  ${props => props.space && css`
    margin: 10px 0;
  `}
`;
