import React from 'react';
import { render } from 'react-dom';
import { Provider as ReactReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

/**
 * Local imports are aliased by `@` symbol. The aliases should be declared
 * in both `scripts/aliases` and `tsconfig.json`.
 */
import App from '@containers/App';
import store from '@vendors/redux/store';

/**
 * This is the entry point of the entire app: only include here
 * generic components that represent the app's structure.
 * Components that are closely tied to React hierarchy go into `<App />`.
 */
render(
  <ReactReduxProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReactReduxProvider>,
  document.querySelector('#app'),
);
