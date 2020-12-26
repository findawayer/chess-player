import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { SQUARE_SIZE } from '~/settings';
import { ChessBoardThemeVariant } from '~/types';
import { chessBoardTheme } from '~/vendors/material-ui/themes';

interface ChessGuideProps {
  color: ChessBoardThemeVariant;
  variant: 'active' | 'hover' | 'recent';
}

export default makeStyles<Theme, ChessGuideProps>({
  guide: {
    position: 'absolute',
    width: `${SQUARE_SIZE}%`,
    height: `${SQUARE_SIZE}%`,
    backgroundColor: ({ color, variant }) =>
      /(?:active|recent)/.test(variant)
        ? fade(chessBoardTheme[color].highlight, 0.5)
        : 'transparent',
    boxShadow: ({ color, variant }) =>
      variant === 'hover'
        ? `inset 0 0 0 4px ${fade(chessBoardTheme[color].highlight, 0.5)}`
        : 'none',
  },
});
