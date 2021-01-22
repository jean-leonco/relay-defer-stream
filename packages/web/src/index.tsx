import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import { Environment } from '@workspace/relay';

import theme from './modules/common/theme';

import Routes from './routes';

const App = () => {
  return (
    <Router>
      <RelayEnvironmentProvider environment={Environment}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </RelayEnvironmentProvider>
    </Router>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
