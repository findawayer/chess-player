import { createStyles, makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { SQUARE_SIZE } from '@settings';

export interface ChessGuideProps {
  variant: 'active' | 'hover' | 'recent';
}

export default makeStyles<Theme, ChessGuideProps>(theme =>
  createStyles({
    guide: {
      position: 'absolute',
      width: `${SQUARE_SIZE}%`,
      height: `${SQUARE_SIZE}%`,
      backgroundColor: ({ variant }) =>
        /(?:active|recent)/.test(variant)
          ? fade(theme.chessSquare.highlight, 0.5)
          : 'transparent',
      boxShadow: ({ variant }) =>
        variant === 'hover'
          ? `inset 0 0 0 4px ${fade(theme.chessSquare.hover, 0.5)}`
          : 'none',
    },
  }),
);
