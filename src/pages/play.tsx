import React, { useEffect, useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ChessGame from '~/features/chess/containers/ChessGame';
import ChessSidebar from '~/features/chess/containers/ChessSidebar';
import { useChessSettings } from '~/features/chess/hooks';
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
  // Local state: component's mount state.
  const [mounted, setMounted] = useState(false);
  // Local state: chess game settings and their API.
  const [
    chessSettings,
    rehydrateChessSettings,
    applyChessSettings,
  ] = useChessSettings();

  // Detect if the component is mounted.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Once the component is mounted, re-initialize user-selected game settings
  // from previously cached data in user's `localStorage`. This should be done
  // after the component is mounted or SSR rendering will break by output mismatch.
  useEffect(() => {
    if (mounted) rehydrateChessSettings();
  }, [mounted, rehydrateChessSettings]);

  return (
    <DndProvider backend={TouchBackend} options={backendOptions}>
      <Container maxWidth={false} className={classes.root}>
        <div className={classes.main}>
          <ChessGame settings={chessSettings} />
        </div>
        <div className={classes.sidebar}>
          <ChessSidebar
            settings={chessSettings}
            applySettings={applyChessSettings}
          />
        </div>
      </Container>
    </DndProvider>
  );
};

export default Play;
