import React from 'react';
import { Button, Input, Container, Title, Heading, Subheading, Modal } from '../components/theme/index';
import Header from '../components/Header';
import Footer from '../components/Footer';

const App = () => (
  <div>
    <Header />
    <Container>
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
      <Input type="text" placeholder="Text goes here..." />
    </Container>
    <Footer />
  </div>
);

export default App;
