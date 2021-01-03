import { CssBaseline } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

import { useColorMode, useUser } from '~/hooks';
import { useGlobalTheme } from '~/themes';
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
  /** Currently authenticated user. */
  const me = useUser();
  // Local state: Restore color mode from database or client cache.
  const [colorMode, updateColorMode] = useColorMode(me?.colorMode);
  /** App's global theme */
  const globalTheme = useGlobalTheme(colorMode);
  /** CSS classes via Material UI */
  const classes = useStyles();
  // Avoid FOUC caused by SSR + rehydration on client side.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ThemeProvider: Exposes material UI theme.
  // CssBaseline: Inject global CSS provided by material-ui.
  return (
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />
      <div
        className={classes.root}
        style={mounted ? undefined : { visibility: 'hidden' }}
      >
        <Header
          hasAuthUser={!!me}
          colorMode={colorMode}
          updateColorMode={updateColorMode}
        />
        <div className={classes.body}>{children}</div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
