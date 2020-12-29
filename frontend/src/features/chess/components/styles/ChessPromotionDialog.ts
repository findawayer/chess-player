import { makeStyles } from '@material-ui/core/styles';

import { SQUARE_SIZE } from '~/config/chess';

export default makeStyles({
  promotion: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 10,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  pieceWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${SQUARE_SIZE}%`,
    height: `${SQUARE_SIZE * 4}%`,
    display: 'flex',
    flexFlow: 'column',
    backgroundColor: '#fff',
    boxShadow: '0 3px 10px rgba(0 0 0 / 50%)',
    // Direction
    '&.bottom': {
      top: 'auto',
      bottom: 0,
      flexFlow: 'column-reverse',
    },
  },
  piece: {
    position: 'static',
    width: '100%',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    // Hovered
    '&:hover': {
      backgroundColor: 'rgba(0 0 0 / 8%)',
    },
  },
});
