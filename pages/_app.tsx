import 'nprogress/nprogress.css';

import { ApolloProvider } from '@apollo/client';
// import App, { AppContext, AppProps } from 'next/app';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { Provider as ReactReduxProvider } from 'react-redux';

import { useApollo } from '~app/vendors/apollo-client';
import { useStore } from '~app/vendors/redux';
import { CurrentUser } from '~app/graphql';

/** Load progressbar only in the browser. */
const ProgressBar = dynamic(() => import('~app/components/ProgressBar'), {
  ssr: false,
});

interface MyAppProps extends AppProps {
  me: CurrentUser | null;
}

/** Custom client-side markup for `next.js` */
export default function MyApp({ Component, pageProps }: MyAppProps) {
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

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>Chess Player</title>
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
          <Component {...pageProps} />
          <ProgressBar />
        </ApolloProvider>
      </ReactReduxProvider>
    </>
  );
}

// // Disable user
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // Simulate the default behavior.
//   const appProps = await App.getInitialProps(appContext);
//   // const apolloClient = initializeApollo();
//   // const { data } = await apolloClient.query<{ me: CurrentUser | null }>({
//   //   query: CURRENT_USER_QUERY,
//   // });
//   return { ...appProps };
// };
