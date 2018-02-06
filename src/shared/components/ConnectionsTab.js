import React from 'react';
import styled, { css } from 'styled-components';
import { RegularText } from './theme';
import { ButtonStyled } from './theme/Button';

const Connect = ButtonStyled.withComponent('a').extend`
  background-color: #FF4A00;
  &:hover:not(:disabled) {
    background-color: #F43E00;
  }
`;

const Connections = styled.div`
  display: flex;
  margin: 10px 0;
`;

const Connection = styled.div`
  height: 80px;
  width: 80px;
  border-radius: ${props => props.theme.size.radius};
  background-color: ${props => props.theme.colors.offest};
  margin-right: 10px;
  ${props => props.src && css`
    background-size: auto 60px;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${props.src});
  `}
`;

const ConnectionsTab = () => (
  <div>
    <RegularText>
      Rumblum can connect to many of your favourite apps. Just accept the invite to use Zapier and you will be able to get data from over 1000 different apps.
    </RegularText>
    <Connect
      target="_blank"
      href="https://zapier.com/platform/public-invite/1470/76554a06e929894983f7271a0dcf7d74/"
    >
      Connect Your Apps
    </Connect>
    <Connections>
      <Connection src="https://formcraft-wp.com/wp-content/uploads/2016/11/logo.png" />
      <Connection src="https://www.axxun-evalua.com/wp-content/uploads/ico-sheets.png" />
      <Connection src="https://avatars2.githubusercontent.com/u/1652745?s=280&v=4" />
      <Connection src="https://www.ascora.com.au/Assets/img/icon_xero.png" />
    </Connections>
  </div>
);

export default ConnectionsTab;
