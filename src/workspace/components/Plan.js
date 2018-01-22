import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Icon from '../../shared/components/theme/Icon';

const Wrap = styled.div`
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
  border-radius: ${props => props.theme.size.radius};
  background-color: ${props => props.theme.colors.darklesser};
  border: 1px solid ${props => props.theme.colors.darkless};
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  position: relative;
  transition: .2s;
  overflow: hidden;
  ${props => props.active ? css`
    background-color: ${props.theme.colors.electric};
    border: 1px solid ${props.theme.colors.info};
  ` : css`
    &:hover {
      background-color: #344148;
    }
  `}
`;

const Content = styled.div`
  margin-top: auto;
  position: relative;
`;

const Title = styled.div`
  font-size: 16px;
  color: ${props => props.theme.colors.white};
`;

const Price = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.offer};
  margin-top: 2px;
`;

const Watermark = styled.div`
  font-size: 200px;
  width: 200px;
  text-align: center;
  color: ${props => props.theme.colors.darkless};
  position: absolute;
  left: 10%;
  top: -20px;
  transition: .2s;
  ${props => props.active && css`
    font-size: 220px;
    color: ${props.theme.colors.dark};
  `}
`;

const Features = styled.div`
  margin-left: auto;
  text-align: right;
  color: #b3b3b3;
  position: relative;
`;

const Feature = styled.div`
  font-size: 16px;
  margin-bottom: 6px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Plan = ({ handleClick, title, price, icon, features, ...props }) => (
  <Wrap onClick={ handleClick } { ...props }>
    <Watermark className="watermark" { ...props }>
      <Icon name={ icon } />
    </Watermark>
    <Content>
      <Title>{ title }</Title>
      <Price>{ price }</Price>
    </Content>
    <Features>
      { features.map(feature => <Feature key={ feature }>{ feature }</Feature>) }
    </Features>
  </Wrap>
);

Plan.propTypes = {
  handleClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string),
};

Plan.defaultProps = {
  features: [],
};

export default Plan;

export const PlanGroup = styled.div`
  display: flex;
  & > * {
    flex-direction: column;
    flex-grow: 1;
    margin-right: 20px;
    .watermark {
      left: 60%;
    }
    & > * {
      text-align: left;
      margin-left: 0;
      margin-bottom: 10px;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`;
