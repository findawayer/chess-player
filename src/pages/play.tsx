import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

import ChessGame from '~/features/chess/containers/ChessGame';
import ChessSidebar from '~/features/chess/containers/ChessSidebar';
import { createBackendOptions } from '~/features/chess/react-dnd';

/** Customize Material UI components */
const useStyles = makeStyles({
  root: {
    height: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
  },
  main: {
    display: 'flex',
    flexFlow: 'column',
  },
  sidebar: {
    width: 320,
    marginLeft: 30,
    flex: '0 0 auto',
  },
});

const Play: React.FC = () => {
  /** CSS classes via Material UI */
  const classes = useStyles();
  /** Create backend options asynchronously to work with SSR. */
  const backendOptions = useMemo(() => createBackendOptions(), []);

  return (
    <DndProvider backend={TouchBackend} options={backendOptions}>
      <Container maxWidth={false} className={classes.root}>
        <div className={classes.main}>
          <ChessGame />
        </div>
        <div className={classes.sidebar}>
          <ChessSidebar />
        </div>
      </Container>
    </DndProvider>
  );
};

export default Play;
