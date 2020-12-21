import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import SelectGame from '@containers/SelectGame';
import useStyles from './styles';

export const Landing: React.FC = () => {
  /* CSS classes via Material UI */
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <SelectGame />
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Container>
  );
};
