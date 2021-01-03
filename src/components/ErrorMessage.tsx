import type { ApolloError } from '@apollo/client';
import { Alert } from '@material-ui/lab';
import React from 'react';

export interface ErrorMessageProps {
  error?: ApolloError | Error;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  // Display only if `Error` object is provided with a message property.
  // This reduces repetitive conditional statements of this component.
  // [X] {error && <Erorr />}
  // [O] <Error />
  if (!error || !error.message) {
    return null;
  }
  // if (error.networkError?.result?.errors.length) {
  //   return error.networkError.result.errors.map((error, i) => (
  //     // eslint-disable-next-line react/no-array-index-key
  //     <Alert key={i} severity="error" variant="filled">
  //       {error.message.replace('GraphQL error: ', '')}
  //     </Alert>
  //   ));
  // }
  return (
    <Alert severity="error" variant="filled">
      {error.message.replace('GraphQL error: ', '')}
    </Alert>
  );
};

export default ErrorMessage;
