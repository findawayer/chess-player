import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SelectGame from '@/containers/SelectGame';

/** Customize Material UI components */
const useStyles = makeStyles({
  root: {
    height: '100%',
    margin: '0 auto',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
  },
});

const Home: React.FC = () => {
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

export default Home;
