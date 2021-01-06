import { Box, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';

import { useColorMode } from '~app/hooks';
import { useUser } from '~app/hooks/useUser';
import { useMuiTheme } from '~app/themes';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Outmost presentional layer. Remains static regardless of current route.
 * @todo Think about updating `theme-color` metadata dynamically to match the color mode? Does this improve SEO?
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const me = useUser();
  // Local state: Restore color mode from client cache.
  const { colorMode, updateColorMode } = useColorMode(me?.colorMode);
  /** App's global theme */
  const theme = useMuiTheme(colorMode);
  /** User is authenticated */
  const hasAuthUser = Boolean(me);

  // ThemeProvider: Exposes material UI theme.
  // CssBaseline: Inject global CSS provided by material-ui.
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        role="presentation"
        style={{ height: '100%' }}
      >
        <Header
          hasAuthUser={hasAuthUser}
          colorMode={colorMode}
          updateColorMode={updateColorMode}
        />
        <Box
          component="main"
          flexGrow={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
