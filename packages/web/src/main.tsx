import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { RelayEnvironmentProvider } from 'react-relay';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from './App';
import theme from './modules/common/theme';
import { environment } from './relay';

ReactDOM.render(
  <StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  </StrictMode>,
  document.getElementById('root'),
);
