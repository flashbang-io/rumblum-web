import React from 'react';
import styled, { css } from 'styled-components';
import { RegularText, Row, Icon } from './theme';
import { ButtonStyled } from './theme/Button';

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
    background-size: auto 45px;
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
    <Row center>
      <Connect
        target="_blank"
        href="https://zapier.com/platform/public-invite/1470/76554a06e929894983f7271a0dcf7d74/"
        style={{ marginRight: '10px' }}
      >
        <Icon name="exclamation-circle" /> Request Access
      </Connect>
      <RegularText style={{ marginBottom: '10px' }}>
        <strong style={{ color: 'white' }}><Icon name="bullhorn" /> Important -</strong> you must request access before connecting any apps.
      </RegularText>
    </Row>
    <div>
      <Connection>
        <AppIcon src="https://www.axxun-evalua.com/wp-content/uploads/ico-sheets.png" />
        <Content>
          <AppName>Google Sheets to Rumblum</AppName>
          <RegularText flatten>Create a Rumblum document when a Google Sheets row is updated.</RegularText>
        </Content>
        <Connect
          flatten
          small
          target="_blank"
          alt="Connect Google Sheets to Rumblum"
          href="https://zapier.com/app/editor?template__0__type_of=read&template__0__selected_api=GoogleSheetsV2API&template__0__action=updated_row&template__0__title=Create%20a%20Rumblum%20document%20when%20a%20Google%20Sheets%20row%20is%20updated&template__1__type_of=write&template__1__selected_api=App1470CLIAPI%401.0.0&template__1__action=renderCreate&template__1__params__pdf=no&template__1__params__send=yes&template__1__meta__paramamp__pdf=&template__1__meta__paramamp__send="
        >
          Connect
        </Connect>
      </Connection>
      <Connection>
        <AppIcon src="https://avatars2.githubusercontent.com/u/1652745?s=280&v=4" />
        <Content>
          <AppName>Typeform to Rumblum</AppName>
          <RegularText flatten>Create a Rumblum document when a Typeform is submitted.</RegularText>
        </Content>
        <Connect
          flatten
          small
          target="_blank"
          alt="Connect Typeform to Rumblum"
          href="https://zapier.com/app/editor?template__0__type_of=read&template__0__selected_api=TypeformDevAPI&template__0__action=entries_resthook&template__0__title=Create%20a%20Rumblum%20document%20when%20a%20Typeform%20is%20submitted&template__1__type_of=write&template__1__selected_api=App1470CLIAPI%401.0.0&template__1__action=renderCreate&template__1__params__pdf=no&template__1__params__send=yes&template__1__meta__paramamp__pdf=&template__1__meta__paramamp__send="
        >
          Connect
        </Connect>
      </Connection>
      <Connection>
        <AppIcon src="https://www.ascora.com.au/Assets/img/icon_xero.png" />
        <Content>
          <AppName>Xero to Rumblum</AppName>
          <RegularText flatten>Create a Rumblum document when a new Xero invoice is created.</RegularText>
        </Content>
        <Connect
          flatten
          small
          target="_blank"
          alt="Connect Xero to Rumblum"
          href="https://zapier.com/app/editor?template__0__type_of=read&template__0__selected_api=XeroAPI&template__0__action=sales_invoice&template__0__title=Create%20a%20Rumblum%20document%20when%20a%20new%20Xero%20invoice%20is%20created&template__0__params__status=submitted&template__0__meta__paramamp__status=&template__1__type_of=write&template__1__selected_api=App1470CLIAPI%401.0.0&template__1__action=renderCreate&template__1__params__pdf=yes&template__1__params__send=yes&template__1__meta__paramamp__pdf=&template__1__meta__paramamp__send="
        >
          Connect
        </Connect>
      </Connection>
    </div>
  </div>
);

export default ConnectionsTab;
