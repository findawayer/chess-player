import React, { memo, useEffect, useRef } from 'react';
import { List, ListItem, Typography } from '@material-ui/core';

import { ChessMoveLog } from '@/types';
import useStyles from './styles';

interface ChessMoveListProps {
  // Collection of `ChessMoveLog`s splitted in chunks of 2 items.
  // Each subarray contains moves played by white and black side.
  moveList: ChessMoveLog[][];
}

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
