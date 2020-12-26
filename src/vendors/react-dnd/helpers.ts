import { DropTargetMonitor } from 'react-dnd';

import { isValidSquare, stringifySquare } from '~/helpers';
import { ChessSquareName } from '~/types';
import { DraggedPiece } from './dragItems';

/**
 * Find the chess board square where the dragged piece is dropped at.
 * `item` and `monitor` parameters are forwarded from `drop` method of
 * `useDrop` hook in `react-dnd` API.
 *
 * @param item - Current drag item object.
 * @param monitor - `DropTargetMonitor` object. (https://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor)
 * @param isFlipped - Whether the chess board is upside down.
 * @returns The name of the square where the drop event is fired.
 */
export function getDropTargetSquare(
  item: DraggedPiece,
  monitor: DropTargetMonitor,
  isFlipped: boolean,
): ChessSquareName | null {
  const offset = monitor.getDifferenceFromInitialOffset()!;
  const xyModifier = isFlipped ? -1 : 1;
  const targetSquare = {
    x: item.x + Math.round(offset.x / item.size) * xyModifier,
    y: item.y + Math.round(offset.y / item.size) * xyModifier,
  };
  return isValidSquare(targetSquare) ? stringifySquare(targetSquare) : null;
}
