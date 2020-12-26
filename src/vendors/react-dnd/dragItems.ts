import { ChessPiece } from '~/types';

/**
 * Drag item types for `react-dnd` library.
 * (The enum values should be a string as the API requires.)
 */
export enum DragItem {
  PIECE = 'piece',
}

/**
 * Drag item object passed to `useDrag` of `react-dnd` API.
 * @api https://react-dnd.github.io/react-dnd/docs/api/use-drag
 */
export interface DraggedPiece extends ChessPiece {
  type: DragItem.PIECE;
  x: number;
  y: number;
  size: number;
}
