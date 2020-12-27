// This file provides the endpoint reference for the client.
// This data should not come from an `.env` file, because the `dotenv` loader
// requires Node.js `fs` module, which is not present in browser environment.

/** GraphQL server endpoint for production */
export const SERVER_ENDPOINT = '';
/** GraphQL server endpoint for development */
export const SERVER_ENDPOINT_DEVELOPMENT = 'http://localhost:4000/graphql';
