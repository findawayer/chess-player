import React, { memo, useEffect, useRef } from 'react';
import { List, ListItem, Typography } from '@material-ui/core';
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';

import { ChessMoveLog } from '../typings';

interface ChessMoveListProps {
  // Collection of `ChessMoveLog`s splitted in chunks of 2 items.
  // Each subarray contains moves played by white and black side.
  moveList: ChessMoveLog[][];
}

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
    fullmove: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      display: 'flex',
      alignItems: 'center',
      // Highlight the latest move.
      // last child is the scroller x(
      '&:nth-last-child(2) span:last-child': {
        backgroundColor: fade('#fc0', 0.4),
      },
    },
    count: {
      width: 50,
      paddingRight: '1em',
      color: fade(theme.palette.text.secondary, 0.6),
      fontSize: '92%',
      textAlign: 'right',
    },
    halfmove: {
      display: 'block',
      width: 'calc(50% - 25px)',
      color: 'inherit',
      padding: theme.spacing(0, 2),
      boxSizing: 'border-box',
      textAlign: 'left',
      textTransform: 'none',
    },
  });
});

const ChessMoveList: React.FC<ChessMoveListProps> = ({ moveList }) => {
  /** Scroller element ref. */
  const scrollerRef = useRef<HTMLLIElement>(null);
  /** CSS classes created via Material-UI. */
  const classes = useStyles();
  /** Keep the scroll to the bottom as the new list item adds up. */
  const scrollToEnd = () => {
    scrollerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToEnd, [moveList]);

  return (
    <Typography variant="body1" component="div">
      <List className={classes.root}>
        {moveList.map(row => (
          <ListItem key={row[0].fullmove} className={classes.fullmove}>
            <span className={classes.count}>{row[0].fullmove}.</span>
            {row.map(({ halfmove, san }) => (
              <span key={halfmove} className={classes.halfmove}>
                {san}
              </span>
            ))}
          </ListItem>
        ))}
        <li ref={scrollerRef} role="presentation" />
      </List>
    </Typography>
  );
};

export default memo(ChessMoveList);
