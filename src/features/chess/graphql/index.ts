import { gql } from '@apollo/client';

export const UPDATE_CHESS_SETTINGS_MUTATION = gql`
  mutation updateChessSettings(
    $chessAutoQueen: Boolean!
    $chessBoardColor: ChessBoardColor!
    $chessShowLegal: Boolean!
    $chessShowRecent: Boolean!
  ) {
    updateChessSettings(
      chessAutoQueen: $chessAutoQueen
      chessBoardColor: $chessBoardColor
      chessShowLegal: $chessShowLegal
      chessShowRecent: $chessShowRecent
    ) {
      id
    }
  }
`;
