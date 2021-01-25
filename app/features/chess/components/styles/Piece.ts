import { makeStyles } from '@material-ui/core/styles';

import { SQUARE_SIZE } from '~app/features/chess/constants';

export default makeStyles({
  piece: {
    padding: 0,
    backgroundColor: 'transparent',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '80%',
    border: 0,
    appearance: 'none',
    touchAction: 'none',
    // Keep 1:1 aspect ratio
    '&::before': {
      content: '""',
      display: 'block',
      paddingTop: '100%',
    },
  },
  playablePiece: {
    position: 'absolute',
    width: `${SQUARE_SIZE}%`,
    // transition: 'transform .1s linear',
    cursor: 'grab',
    // Hide original piece while dragging; the piece is replaced with a custom
    // drag layer, which is programtically hidden on modern browsers except for IE.
    '&.is-dragging': {
      visibility: 'hidden',
    },
  },
});
