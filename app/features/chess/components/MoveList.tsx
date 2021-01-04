import { Typography } from '@material-ui/core';
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import React, { memo, useEffect, useRef } from 'react';

import { ChessMoveLog } from '~app/features/chess/types';

const useStyles = makeStyles<Theme>(theme => {
  const scrollbarColor = theme.palette.type === 'dark' ? '#fff' : '#000';

  return createStyles({
    root: {
      display: 'block',
      maxHeight: 500,
      marginTop: 20,
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: 15,
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: fade(scrollbarColor, 0.05),
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: fade(scrollbarColor, 0.3),
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: fade(scrollbarColor, 0.4),
      },
    },
    list: {
      margin: 0,
      padding: 0,
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      borderBottom: `1px solid ${theme.palette.divider}`,
      fontSize: '1rem',
      // Highlight the latest move.
      '&:last-child span:last-child': {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.main,
      },
    },
    turn: {
      width: 50,
      paddingRight: '1em',
      color: fade(theme.palette.text.secondary, 0.6),
      textAlign: 'right',
    },
    halfmove: {
      display: 'block',
      width: 'calc(50% - 25px)',
      color: 'inherit',
      padding: theme.spacing(1, 2),
      boxSizing: 'border-box',
      textAlign: 'left',
      textTransform: 'none',
    },
  });
});

interface MoveListProps {
  // Collection of `ChessMoveLog`s splitted in chunks of 2 items.
  // Each subarray contains moves played by both player side.
  moveList: ChessMoveLog[][];
}

const MoveList: React.FC<MoveListProps> = ({ moveList }) => {
  /** Scroller element ref. */
  const scrollerRef = useRef<HTMLDivElement>(null);
  /** CSS classes created via Material-UI. */
  const classes = useStyles();
  /** Keep the scroll to the bottom as the new list item adds up. */
  const scrollToEnd = () => {
    scrollerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToEnd, [moveList]);

  return (
    <Typography variant="body1" component="div" className={classes.root}>
      <ul className={classes.list}>
        {moveList.map(row => (
          <li key={row[0].fullmove} className={classes.listItem}>
            <span className={classes.turn}>{row[0].fullmove}.</span>
            {row.map(({ halfmove, san }) => (
              <span key={halfmove} className={classes.halfmove}>
                {san}
              </span>
            ))}
          </li>
        ))}
      </ul>
      <div ref={scrollerRef} />
    </Typography>
  );
};

export default memo(MoveList);
