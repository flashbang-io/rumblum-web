import React from 'react';
import { Button, Input, Container, Title, Heading, Subheading, Modal } from '../components/theme/index';

const App = () => (
  <Container>
    <header className="App-header">
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <Button big>Nice Button</Button><br /><br />
    <Button>Nice Button</Button><br /><br />
    <Button danger>Nice Button</Button><br /><br />
    <Button small>Nice Button</Button><br /><br />
    <Button tiny>Nice Button</Button><br /><br />
    <Title>Heading here</Title>
    <Heading>Heading here</Heading>
    <Subheading>Heading here</Subheading>
    <Input type="text" />
  </Container>
);

export default App;
