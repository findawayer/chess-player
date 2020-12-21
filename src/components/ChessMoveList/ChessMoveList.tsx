import React, { memo, useEffect, useRef } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import { ChessMoveLog } from '@types';
import useStyles from './styles';

interface ChessMoveListProps {
  // Collection of `ChessMoveLog`s splitted in chunks of 2 items.
  // Each subarray contains moves played by white and black side.
  moveList: ChessMoveLog[][];
}

export const ChessMoveList: React.FC<ChessMoveListProps> = ({ moveList }) => {
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

/* Comparator function for props changes. Decide when to re-render. */
// function areEqual(
//   previousProps: ChessMoveListProps,
//   nextProps: ChessMoveListProps,
// ): boolean {
//   const previousList = previousProps.moveList;
//   const nextList = nextProps.moveList;
//   const arrayLengthsAreEqual = previousList.length === nextList.length;
//   const subArrayLengthsAreEqual =
//     previousList[previousList.length - 1].length ===
//     nextList[nextList.length - 1].length;

//   return arrayLengthsAreEqual && subArrayLengthsAreEqual;
// }

export const MemoizedChessMoveList = memo(ChessMoveList);
