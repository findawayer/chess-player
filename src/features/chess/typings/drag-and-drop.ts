import { DragItem } from '~/vendors/react-dnd';
import { ChessPiece } from './pieces';

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
