import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { RelayEnvironmentProvider } from 'react-relay';

import relayEnvironment from '../relay/relayEnvironment';

import theme from './modules/common/theme';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);