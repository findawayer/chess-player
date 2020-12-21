import React, { useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import ErrorBoundary from '@components/ErrorBoundary';
import Layout from '@components/Layout';
import Routes from '@pages/Routes';
import { flipColorMode } from '@slices/preferences';
import { getTheme } from '@themes';
import { ColorMode } from '@types';
import { backendOptions } from '@vendors/react-dnd';
import { AppDispatch, AppState } from '@vendors/redux';

/**
 * Generic app component representing basic structure of the page
 * along with global settings and their providers.
 */
const App: React.FC = () => {
  /** Color mode state fetched from Redux store. */
  const colorMode = useSelector<AppState, ColorMode>(
    state => state.preferences.colorMode,
  );
  /** Action dispatcher to Redux store. */
  const dispatch = useDispatch<AppDispatch>();
  /** light or dark theme based on user selection. */
  const theme = useMemo(() => getTheme(colorMode), [colorMode]);
  /** Toggle the color mode. */
  const toggleColorMode = () => dispatch(flipColorMode());

  /**
   * Core hierarchy of React components.
   *
   * ThemeProvider: Exposes material UI theme.
   * DndProvider: Exposes react-dnd API.
   * CssBaseline: Inject global CSS provided by material-ui. (Customized by `baseTheme`)
   * Layout: Outmost presentional layer. Remains static regardless of current route.
   */
  return (
    <ThemeProvider theme={theme}>
      <DndProvider backend={TouchBackend} options={backendOptions}>
        <CssBaseline />
        <Layout colorMode={colorMode} toggleColorMode={toggleColorMode}>
          <ErrorBoundary>
            <Routes />
          </ErrorBoundary>
        </Layout>
      </DndProvider>
    </ThemeProvider>
  );
};

export default App;
