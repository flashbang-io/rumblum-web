import React from 'react';
import { Button } from '../components/theme/index';

const App = () => (
  <div className="App">
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
  </div>
);

export default App;
