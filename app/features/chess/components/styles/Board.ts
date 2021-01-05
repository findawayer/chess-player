import { makeStyles } from '@material-ui/core/styles';
import times from 'lodash/times';

import {
  NUMBER_OF_FILES,
  NUMBER_OF_RANKS,
} from '~app/features/chess/constants';
import { squareClass } from '~app/features/chess/utils';

// Generate helper classes for positionning of squares & pieces
export const createSquareCSS = () => {
  const css: Record<string, unknown> = {};
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

export default makeStyles({
  // This keeps 1:1 aspect ratio
  root: {
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      content: '""', // ! Preserve double quotes !
      display: 'block',
      paddingTop: '100%',
    },
  },
  board: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    ...createSquareCSS(),
  },
});
