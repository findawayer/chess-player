import { CssBaseline } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useMemo, useState } from 'react';

import { useUser } from '~/hooks';
import { createGlobalTheme, useGlobalTheme } from '~/themes';
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
  /** GraphQL: currently authenticated user. */
  const me = useUser();
  // Local state: component's mount state.
  const [mounted, setMounted] = useState(false);
  /** App's global theme — dark or light, memoized inside the hook. */
  const globalTheme = useGlobalTheme(me?.colorMode);
  /* CSS classes via Material UI */
  const classes = useStyles();

  // Detect if the component is mounted.
  useEffect(() => {
    setMounted(true);
  }, []);

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
        <Header />
        <div className={classes.body}>{children}</div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
