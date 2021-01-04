import { DropTargetMonitor } from 'react-dnd';

import { ChessPiece } from './types';
import { isValidSquare, stringifySquare } from './utils';

/**
 * Drag item types for `react-dnd` library.
 * (The enum values should be a string as the API requires.)
 */
export const DRAG_ITEM = 'PIECE' as const;

/**
 * Drag item object passed to `useDrag` of `react-dnd` API.
 * @api https://react-dnd.github.io/react-dnd/docs/api/use-drag
 */
export interface DraggedPiece extends ChessPiece {
  type: typeof DRAG_ITEM;
  x: number;
  y: number;
  size: number;
}

/**
 * Find drop target elements at the given point.
 * Fallbacks `document.elementsFromPoint`.
 */
const getDropTargetElementsAtPoint = <T extends HTMLElement>(
  x: number,
  y: number,
  dropTargets: T[],
): T[] =>
  dropTargets.filter(dropTarget => {
    const rect = dropTarget.getBoundingClientRect();
    return (
      x >= rect.left && x <= rect.right && y <= rect.bottom && y >= rect.top
    );
  });

/** Check if native `document.elementsFromPoint` API is availabble. */
const supportsElementsFromPoint = (): boolean =>
  typeof document !== 'undefined' &&
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  !!(document.elementsFromPoint || (<any>document).msElementsFromPoint);

/**
 * Backend options for `react-dnd` library.
 * @api https://react-dnd.github.io/react-dnd/docs/backends/touch
 */
export const createBackendOptions = () => ({
  enableMouseEvents: true,
  enableHoverOutsideTarget: false,
  getDropTargetElementsAtPoint: supportsElementsFromPoint()
    ? getDropTargetElementsAtPoint
    : undefined,
});

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
export const getDropTargetSquare = (
  item: DraggedPiece,
  monitor: DropTargetMonitor,
  isFlipped: boolean,
) => {
  const offset = monitor.getDifferenceFromInitialOffset()!;
  const modifier = isFlipped ? -1 : 1;
  const targetSquare = {
    x: item.x + Math.round(offset.x / item.size) * modifier,
    y: item.y + Math.round(offset.y / item.size) * modifier,
  };
  return isValidSquare(targetSquare) ? stringifySquare(targetSquare) : null;
};
