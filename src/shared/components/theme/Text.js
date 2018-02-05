import styled, { css } from 'styled-components';

const flatten = css`
  margin-bottom: 2px;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #333333;
  margin: 0 0 20px;
  ${props => props.flatten && flatten}
  ${props => props.inverted && css`
    color: ${props.theme.colors.white};
  `}
`;

export const Heading = styled.div`
  font-size: 18px;
  color: ${props => props.theme.colors.grey};
  margin: 0 0 20px;
  ${props => props.flatten && flatten}
  ${props => props.inverted && css`
    color: ${props.theme.colors.white};
  `}
`;

export const Subheading = styled.div`
  font-size: 12px;
  color: #cccccc;
  margin: 0 0 20px;
  ${props => props.flatten && flatten}
  ${props => props.inverted && css`
    color: ${props.theme.colors.white};
  `}
`;

export const RegularText = styled.div`
  font-size: 13px;
  color: #cccccc;
  margin: 0 0 20px;
  line-height: 1.6em;
  ${props => props.flatten && flatten}
  ${props => props.inverted && css`
    color: ${props.theme.colors.white};
  `}
`;
