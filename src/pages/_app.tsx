// Use Nprogress built-in CSS
import 'nprogress/nprogress.css';

import { ApolloProvider } from '@apollo/client';
// import { ColorMode } from '@prisma/client';
// import App, { AppContext, AppProps } from 'next/app';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { Provider as ReactReduxProvider } from 'react-redux';
// import CookieHandler from 'universal-cookie';

import Layout from '~/components/Layout';
import { useApollo } from '~/vendors/apollo-client';
import { useStore } from '~/vendors/redux';

/** Load progressbar only in the browser. */
const ProgressBar = dynamic(() => import('~/components/ProgressBar'), {
  ssr: false,
});

// interface MyAppProps extends AppProps {
//   initialColorMode: ColorMode;
// }

/** Custom client-side markup for `next.js` */
const MyApp = ({ Component, pageProps }: AppProps) => {
  // Create Redux store
  const store = useStore(pageProps.initialReduxState);
  // Create Apollo Client
  const apolloClient = useApollo(pageProps.initialApolloState);

  // Remove the server-side injected CSS.
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  /**
   * Core hierarchy of React components.
   *
   * ThemeProvider: Exposes material UI theme.
   * DndProvider: Exposes react-dnd API.
   * CssBaseline: Inject global CSS provided by material-ui. (Customized by `baseTheme`)
   * Layout: Outmost presentional layer. Remains static regardless of current route.
   */
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>Chess Player: Demo</title>
        <meta property="og:title" content="Chess Player" />
        <meta property="og:site_name" content="Chess Player Demo" />
        <meta
          property="og:url"
          content="https://findawayer.github.io/chess-player"
        />
        <meta
          property="og:description"
          content="In-browser chess game and simulation built with React."
        />
        <meta property="og:type" content="website" />
      </Head>
      <ReactReduxProvider store={store}>
        <ApolloProvider client={apolloClient}>
          <Layout>
            <ProgressBar />
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </ReactReduxProvider>
    </>
  );
};

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // Simulate the default behavior.
//   const defaultProps = await App.getInitialProps(appContext);

//   // Retrieve color mode from cookies, to prevent FOUC by client side re-render.
//   const cookies = new CookieHandler(appContext.ctx.req?.headers?.cookie);
//   const initialColorMode =
//     cookies.get(COLOR_MODE_CACHE_KEY) || DEFAULT_COLOR_MODE;

//   return {
//     ...defaultProps,
//     initialColorMode,
//   };
// };

export default MyApp;
