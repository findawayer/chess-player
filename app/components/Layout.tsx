import { Box, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';

import { useColorMode, useMounted } from '~app/hooks';
import { useGlobalTheme } from '~app/themes';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Outmost presentional layer. Remains static regardless of current route.
 * @todo Think about updating `theme-color` metadata dynamically to match the color mode? Does this improve SEO?
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Local state: Restore color mode from database or client cache.
  const [colorMode, updateColorMode] = useColorMode();
  /** App's global theme */
  const globalTheme = useGlobalTheme(colorMode);
  /** Flag used to hide FOUC caused by color mode mismatch after rehydration. */
  const mounted = useMounted();

  // ThemeProvider: Exposes material UI theme.
  // CssBaseline: Inject global CSS provided by material-ui.
  return (
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        style={{
          height: '100%',
          visibility: mounted ? 'visible' : 'hidden',
        }}
      >
        <Header colorMode={colorMode} updateColorMode={updateColorMode} />
        <Box
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
