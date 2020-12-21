import { SQUARE_SIZE } from '@settings/chess-config';
import { makeStyles } from '@material-ui/core/styles';

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
      backgroundImage: 'url(/assets/svg/BlackKing.svg)',
    },
    // Black Queen
    '&.piece-bq': {
      backgroundImage: 'url(/assets/svg/BlackQueen.svg)',
    },
    // Black Rook
    '&.piece-br': {
      backgroundImage: 'url(/assets/svg/BlackRook.svg)',
    },
    // Black Bishop
    '&.piece-bb': {
      backgroundImage: 'url(/assets/svg/BlackBishop.svg)',
    },
    // Black Knight
    '&.piece-bn': {
      backgroundImage: 'url(/assets/svg/BlackKnight.svg)',
    },
    // Black Pawn
    '&.piece-bp': {
      backgroundImage: 'url(/assets/svg/BlackPawn.svg)',
    },
    // White King
    '&.piece-wk': {
      backgroundImage: 'url(/assets/svg/WhiteKing.svg)',
    },
    // White Queen
    '&.piece-wq': {
      backgroundImage: 'url(/assets/svg/WhiteQueen.svg)',
    },
    // White Rook
    '&.piece-wr': {
      backgroundImage: 'url(/assets/svg/WhiteRook.svg)',
    },
    // White Bishop
    '&.piece-wb': {
      backgroundImage: 'url(/assets/svg/WhiteBishop.svg)',
    },
    // White Knight
    '&.piece-wn': {
      backgroundImage: 'url(/assets/svg/WhiteKnight.svg)',
    },
    // White Pawn
    '&.piece-wp': {
      backgroundImage: 'url(/assets/svg/WhitePawn.svg)',
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
