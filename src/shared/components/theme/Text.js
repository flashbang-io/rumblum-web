import styled, { css } from 'styled-components';

export const Title = styled.h1`
  font-size: 24px;
  color: #333333;
  margin: 0 0 10px;
`;

export const Heading = styled.div`
  font-size: 18px;
  color: ${props => props.theme.colors.grey};
  margin: 0 0 10px;
  ${props => props.inverted && css`
    color: ${props.theme.colors.white};
  `}
`;

export const Subheading = styled.div`
  font-size: 12px;
  color: #cccccc;
  margin: 0 0 10px;
`;

export const Error = styled.div`
  font-size: 12px;
  color: red;
  margin: 0 0 10px;
`;
