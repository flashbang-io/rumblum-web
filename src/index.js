import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import App from './shared/containers/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import theme from './theme';

const app = (
  <Provider store={ store }>
    <ThemeProvider theme={ theme }>
      <BrowserRouter>
        <Route path="/" component={ App } />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();
