/**
 * Drag item types for `react-dnd` library.
 * (The enum values should be a string as the API requires.)
 */
export const enum DragItem {
  PIECE = 'PIECE',
}

type ReactDndBackendOptions = {
  enableMouseEvents?: boolean;
  enableHoverOutsideTarget?: boolean;
  getDropTargetElementsAtPoint?<T extends HTMLElement>(
    x: number,
    y: number,
    dropTargets: T[],
  ): T[];
};

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
export const createBackendOptions = (): ReactDndBackendOptions => ({
  enableMouseEvents: true,
  enableHoverOutsideTarget: false,
  getDropTargetElementsAtPoint: supportsElementsFromPoint()
    ? getDropTargetElementsAtPoint
    : undefined,
});
