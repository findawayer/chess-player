import React from 'react';
import { ApolloError } from '@apollo/client';
import { Alert } from '@material-ui/lab';

export interface ServerErrorProps {
  error?: ApolloError;
}

const ServerError: React.FC<ServerErrorProps> = ({ error }) => {
  // Display only if `Error` object is provided with a message property.
  // This reduces repetitive conditional statements of this component.
  // [X] {error && <Erorr />}
  // [O] <Error />
  if (!error || !error.message) return null;
  return (
    <Alert severity="error" variant="filled">
      {error.message.replace('GraphQL error: ', '')}
    </Alert>
  );
};

export default ServerError;
