import ApolloClient, { InMemoryCache } from 'apollo-boost';
import withApollo from 'next-with-apollo';

import {
  SERVER_ENDPOINT,
  SERVER_ENDPOINT_DEVELOPMENT,
} from '~/settings/endpoints';

export const withApolloClient = withApollo(({ initialState }) => {
  // Create Apollo client.
  // @api: https://www.apollographql.com/docs/react/api/core/ApolloClient/
  return new ApolloClient({
    // Backend URI to connect the Apollo client to.
    uri:
      process.env.SERVER_ENDPOINT === 'development'
        ? SERVER_ENDPOINT_DEVELOPMENT
        : SERVER_ENDPOINT,
    // Cache the results of GraphQL queries. Read more about caching on:
    // https://www.apollographql.com/docs/react/api/cache/InMemoryCache/
    cache: new InMemoryCache().restore(initialState || {}),
    // Set CORS header to every request that apollo client sends to the server.
    // Read more about credentials on:
    // https://www.apollographql.com/docs/react/networking/authentication/
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        initialState,
      });
    },
  });
});
