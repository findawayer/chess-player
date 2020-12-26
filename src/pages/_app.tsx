import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Provider as ReactReduxProvider } from 'react-redux';

import ErrorBoundary from '~/components/ErrorBoundary';
import Layout from '~/components/Layout';
import { useStore } from '~/vendors/redux';

import 'nprogress/nprogress.css';

/** Load progressbar only in the browser. */
const ProgressBar = dynamic(() => import('~/components/Layout/ProgressBar'), {
  ssr: false,
});

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  // Dynmically created Redux store to support SSR
  const store = useStore();

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
        <ErrorBoundary>
          <Layout>
            <ProgressBar />
            <Component {...pageProps} />
          </Layout>
        </ErrorBoundary>
      </ReactReduxProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};
