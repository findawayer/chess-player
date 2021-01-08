import type { ApolloError } from '@apollo/client';
import { Alert } from '@material-ui/lab';
import React from 'react';

interface ErrorMessageProps {
  error?: ApolloError;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  // Display only if `Error` object is provided with a message property.
  // This reduces repetitive conditional statements of this component.
  // [X] {error && <Erorr />}
  // [O] <Error />
  if (!error?.message) {
    return null;
  }

  return (
    <Alert severity="error" variant="filled" icon={false}>
      {error.message.replace('GraphQL error: ', '')}
    </Alert>
  );
};

export default ErrorMessage;
