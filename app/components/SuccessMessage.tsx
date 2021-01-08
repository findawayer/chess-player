import { Alert } from '@material-ui/lab';
import type { FunctionComponent } from 'react';

export interface SuccessMessageProps {
  isSuccessful: boolean;
  message: string;
}

const SuccessMessage: FunctionComponent<SuccessMessageProps> = ({
  isSuccessful,
  message,
}) => {
  return !isSuccessful ? null : <Alert severity="success">{message}</Alert>;
};

export default SuccessMessage;
