import styled, { css } from 'styled-components';

export const Row = styled.div`
  display: flex;
  ${props => props.center && css`
    align-items: center;
  `}
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  ${props => props.center && css`
    align-items: center;
  `}
`;
