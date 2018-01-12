import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { StripeProvider } from 'react-stripe-elements';
import App from './shared/containers/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import theme from './theme';
import config from './config';

const app = (
  <Provider store={ store }>
    <StripeProvider apiKey={ config.stripeKey }>
      <ThemeProvider theme={ theme }>
        <BrowserRouter>
          <Route path="/" component={ App } />
        </BrowserRouter>
      </ThemeProvider>
    </StripeProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();
