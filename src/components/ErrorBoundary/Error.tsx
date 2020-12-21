import React from 'react';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

export const Error: React.FC = () => {
  /* CSS classes via Material UI */
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h2">
        Something went wrong. Please refresh x_X
      </Typography>
    </div>
  );
};
