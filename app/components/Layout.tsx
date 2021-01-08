import { Box, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Head from 'next/head';
import type { FunctionComponent, ReactNode } from 'react';

import { ColorModeApiProvider, useColorMode } from '~app/hooks';
import { useMuiTheme } from '~app/themes';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

/** Outmost presentional layer. Should be wrapping all pages. */
const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  // Local state: Restore color mode from client cache.
  const colorModeApi = useColorMode();
  /** Material UI theme */
  const theme = useMuiTheme(colorModeApi.colorMode);

  // CssBaseline: global CSS created with Material UI.
  return (
    <ThemeProvider theme={theme}>
      <ColorModeApiProvider value={colorModeApi}>
        <Head>
          <meta name="theme-color" content={theme.palette.background.default} />
        </Head>
        <CssBaseline />
        <Box
          display="flex"
          flexDirection="column"
          role="presentation"
          style={{ height: '100%' }}
        >
          <Header />
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
      </ColorModeApiProvider>
    </ThemeProvider>
  );
};

export default Layout;
