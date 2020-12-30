// Bootstrapped from: https://github.com/vercel/next.js/blob/canary/examples/with-apollo-and-redux/lib/apollo.js
/* eslint-disable no-underscore-dangle */
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';

export type ApolloState = Record<string, unknown>;

// Cached apollo client to prevent duplicate instance.
let apolloClient: ApolloClient<unknown>;

// Create apollo client instance.
function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // Server URL and CORS settings
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_ENDPOINT}/api/graphql`, // must be absolute
      credentials: 'include', // fetch() options goes into `credentials` or `headers`
    }),
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
}

export function initializeApollo(
  initialState: ApolloState = null,
): ApolloClient<unknown> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If the has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
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
}

// Create Apollo client dynamically.
export function useApollo(initialState: ApolloState): ApolloClient<unknown> {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
