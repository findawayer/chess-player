import { Alert } from '@material-ui/lab';
import React from 'react';

export interface SuccessMessageProps {
  isSuccessful: boolean;
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  isSuccessful,
  message,
}) => {
  return !isSuccessful ? null : <Alert severity="success">{message}</Alert>;
};

export default SuccessMessage;
