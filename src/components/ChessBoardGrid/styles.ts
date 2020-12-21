import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { ChessBoardTheme } from '@themes';
import { SQUARE_SIZE } from '@settings/chess-config';

export default makeStyles<Theme, ChessBoardTheme>({
  grid: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
  },
  square: {
    width: `${SQUARE_SIZE}%`,
    height: `${SQUARE_SIZE}%`,
    flex: '0 0 auto',
    // Square colors
    '&.light': {
      backgroundColor: ({ lightSquare }) => lightSquare,
    },
    '&.dark': {
      backgroundColor: ({ darkSquare }) => darkSquare,
    },
  },
});
