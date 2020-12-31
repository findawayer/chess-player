import times from 'lodash/times';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

import { NUMBER_OF_FILES, NUMBER_OF_RANKS } from '../../constants';
import { squareClass } from '../../helpers';

// Generate helper classes for positionning of squares & pieces
export const createSquareCSS = (): CSSProperties => {
  const css: CSSProperties = {};
  // Files
  times(NUMBER_OF_FILES, x => {
    css[`& .file-${x}`] = { transform: `translateX(${x * 100}%)` };
  });
  // Ranks
  times(NUMBER_OF_RANKS, y => {
    css[`& .rank-${y}`] = { transform: `translateY(${y * 100}%)` };
  });
  // Squares
  times(NUMBER_OF_FILES, x => {
    times(NUMBER_OF_RANKS, y => {
      const flipX = NUMBER_OF_FILES - 1 - x;
      const flipY = NUMBER_OF_RANKS - 1 - y;
      css[`& .${squareClass({ x, y })}`] = {
        transform: `translate(${x * 100}%, ${y * 100}%)`,
      };
      css[`&.is-flipped .${squareClass({ x, y })}`] = {
        transform: `translate(${flipX * 100}%, ${flipY * 100}%)`,
      };
    });
  });
  return css;
};

export default makeStyles<Theme>(theme =>
  createStyles({
    board: {
      position: 'relative',
      width: '70vh',
      height: '70vh',
      minWidth: 500,
      minHeight: 500,
      overflow: 'hidden',
      borderRadius: theme.shape.borderRadius,
      flex: '0 0 auto',
      ...createSquareCSS(),
    },
  }),
);
