import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { SQUARE_SIZE } from '@/settings/chess-config';
import { ChessBoardThemeVariant } from '@/types';
import { chessBoardTheme } from '@/vendors/material-ui/themes';

interface ChessBoardGridProps {
  color: ChessBoardThemeVariant;
}

export default makeStyles<Theme, ChessBoardGridProps>({
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
      backgroundColor: ({ color }) => chessBoardTheme[color].lightSquare,
    },
    '&.dark': {
      backgroundColor: ({ color }) => chessBoardTheme[color].darkSquare,
    },
  },
});
