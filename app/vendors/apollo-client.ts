// Bootstrapped from: https://github.com/vercel/next.js/blob/canary/examples/with-apollo-and-redux/lib/apollo.js
/* eslint-disable no-underscore-dangle */
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { concatPagination } from '@apollo/client/utilities';
import deepMerge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { useMemo } from 'react';
import urlJoin from 'url-join';

export type ApolloState = Record<string, unknown>;

// Cached apollo client to prevent duplicate instance.
let apolloClient: ApolloClient<unknown>;

// Create link to backend.
const link = new HttpLink({
  uri: urlJoin(process.env.NEXT_PUBLIC_ENDPOINT, 'api/graphql'), // must be absolute
  credentials: 'same-origin', // fetch() options goes into `credentials` or `headers`
});

// Log server errors.
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations,
        )}, Path: ${path}`,
      ),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Create apollo client instance.
const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // Server URL and CORS settings
    link: errorLink.concat(link),
    // Use cache for paginations.
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allUsers: concatPagination(),
          },
        },
      },
    }),
  });
};

export const initializeApollo = (
  initialState?: ApolloState,
): ApolloClient<unknown> => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If the has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract() as ApolloState;

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = deepMerge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

// Create Apollo client dynamically.
export const useApollo = (initialState: ApolloState): ApolloClient<unknown> => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
