import React, { useEffect, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import { useGlobalTheme } from '~/vendors/material-ui';
import { useColorMode } from '../hooks';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    overflow: 'auto',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/**
 * Outmost presentional layer. Remains static regardless of current route.
 * @todo Think about updating `theme-color` metadata dynamically to match the color mode? Does this improve SEO?
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Local state: component's mount state.
  const [mounted, setMounted] = useState(false);
  // Local state: app's color mode and its API.
  const [colorMode, rehydrateColorMode, toggleColorMode] = useColorMode();
  /** App's global theme — dark or light, memoized inside the hook. */
  const globalTheme = useGlobalTheme(colorMode);
  /* CSS classes via Material UI */
  const classes = useStyles();

  // Detect if the component is mounted.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Once the component is mounted, re-initialize user-selected color mode
  // from previously cached data in user's `localStorage`. This should be done
  // after the component is mounted or SSR rendering will break by output mismatch.
  useEffect(() => {
    if (mounted) rehydrateColorMode();
  }, [mounted, rehydrateColorMode]);

  // ThemeProvider: Exposes material UI theme.
  // CssBaseline: Inject global CSS provided by material-ui.
  // `visibility: hidden` is set to prevent SSR FOUC caused by
  // theme mismatch. The content gets revealed when the client rehydrates.
  return (
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />
      <div
        className={classes.root}
        style={!mounted ? { visibility: 'hidden' } : {}}
      >
        <Header colorMode={colorMode} toggleColorMode={toggleColorMode} />
        <div className={classes.body}>{children}</div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
