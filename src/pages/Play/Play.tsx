import React from 'react';
import Container from '@material-ui/core/Container';

import ChessGame from '@containers/ChessGame';
import ChessSidebar from '@containers/ChessSidebar';
import useStyles from './styles';

export const Play: React.FC = () => {
  /* CSS classes via Material UI */
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.root}>
      <div className={classes.main}>
        <ChessGame />
      </div>
      <div className={classes.sidebar}>
        <ChessSidebar />
      </div>
    </Container>
  );
};
