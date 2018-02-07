import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { RegularText, Row, Icon } from './theme';
import { ButtonStyled } from './theme/Button';
import zaps from '../zaps.json';

const Connect = ButtonStyled.withComponent('a').extend`
  white-space: nowrap;
  background-color: #FF4A00;
  &:hover:not(:disabled) {
    background-color: #F43E00;
  }
`;

const Content = styled.div`
  margin: 0 20px;
  flex-grow: 1;
`;

const Connection = styled.div`
  display: flex;
  align-items: center;
  border-radius: ${props => props.theme.size.radius};
  background-color: ${props => props.theme.colors.darklesser};
  padding: 10px;
  margin: 10px 0;
`;

const AppName = styled.div`
  font-size: 16px;
  color: ${props => props.theme.colors.white};
  margin: 0 0 2px;
`;

const AppIcon = styled.div`
  height: 60px;
  width: 60px;
  min-width: 60px;
  border-radius: ${props => props.theme.size.radius};
  background-color: ${props => props.theme.colors.offest};
  ${props => props.src && css`
    background-size: auto ${props.size || '75%'};
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${props.src});
  `}
`;

const Zap = ({ name, description, alt, logo, link, size }) => (
  <Connection>
    <AppIcon src={ logo } size={ size } />
    <Content>
      <AppName>{ name }</AppName>
      <RegularText flatten>{ description }</RegularText>
    </Content>
    <Connect flatten small target="_blank" alt={ alt } href={ link }>
      Connect
    </Connect>
  </Connection>
);

Zap.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  size: PropTypes.string,
};

Zap.defaultProps = {
  size: null,
};

const ConnectionsTab = () => (
  <div>
    <RegularText>
      Rumblum can connect to many of your favourite apps. Just accept the invite to use Zapier and you will be able to get data from over 1000 different apps.
    </RegularText>
    <Row center>
      <Connect
        target="_blank"
        href="https://zapier.com/platform/public-invite/1470/76554a06e929894983f7271a0dcf7d74/#app"
        style={{ marginRight: '10px' }}
      >
        <Icon name="exclamation-circle" /> Request Access
      </Connect>
      <RegularText style={{ marginBottom: '10px' }}>
        <strong style={{ color: 'white' }}><Icon name="bullhorn" /> Important -</strong> you must request access before connecting. Once you have accepted, you may connect your apps.
      </RegularText>
    </Row>
    <div>
      { zaps.map(zap => <Zap { ...zap } />) }
    </div>
  </div>
);

export default ConnectionsTab;
