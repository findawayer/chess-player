import { SQUARE_SIZE } from '~/settings';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

interface LegalSquareProps {
  isCapture: boolean;
  showLegalMoves: boolean;
}

export default makeStyles<Theme, LegalSquareProps>({
  legalSquare: {
    position: 'absolute',
    width: `${SQUARE_SIZE}%`,
    height: `${SQUARE_SIZE}%`,
    padding: '4%',
    boxSizing: 'border-box',
    backgroundColor: ({ isCapture }) =>
      isCapture ? 'transparent' : 'rgba(0 0 0 / 20%)',
    border: ({ isCapture }) => (isCapture ? '8px solid rgba(0 0 0 / 20%)' : 0),
    backgroundClip: 'content-box',
    borderRadius: '50%',
    opacity: ({ showLegalMoves }) => (showLegalMoves ? 1 : 0),
  },
});
