import { makeStyles } from '@material-ui/core/styles';

import { SQUARE_SIZE } from '~/features/chess/constants';

export default makeStyles({
  piece: {
    padding: 0,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '85%',
    border: 0,
    appearance: 'none',
    touchAction: 'none',
    // Keep 1:1 aspect ratio
    '&::before': {
      content: '""',
      display: 'block',
      paddingTop: '100%',
    },
    // Black King
    '&.piece-bk': {
      backgroundImage: 'url(/graphics/BlackKing.svg)',
    },
    // Black Queen
    '&.piece-bq': {
      backgroundImage: 'url(/graphics/BlackQueen.svg)',
    },
    // Black Rook
    '&.piece-br': {
      backgroundImage: 'url(/graphics/BlackRook.svg)',
    },
    // Black Bishop
    '&.piece-bb': {
      backgroundImage: 'url(/graphics/BlackBishop.svg)',
    },
    // Black Knight
    '&.piece-bn': {
      backgroundImage: 'url(/graphics/BlackKnight.svg)',
    },
    // Black Pawn
    '&.piece-bp': {
      backgroundImage: 'url(/graphics/BlackPawn.svg)',
    },
    // White King
    '&.piece-wk': {
      backgroundImage: 'url(/graphics/WhiteKing.svg)',
    },
    // White Queen
    '&.piece-wq': {
      backgroundImage: 'url(/graphics/WhiteQueen.svg)',
    },
    // White Rook
    '&.piece-wr': {
      backgroundImage: 'url(/graphics/WhiteRook.svg)',
    },
    // White Bishop
    '&.piece-wb': {
      backgroundImage: 'url(/graphics/WhiteBishop.svg)',
    },
    // White Knight
    '&.piece-wn': {
      backgroundImage: 'url(/graphics/WhiteKnight.svg)',
    },
    // White Pawn
    '&.piece-wp': {
      backgroundImage: 'url(/graphics/WhitePawn.svg)',
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
