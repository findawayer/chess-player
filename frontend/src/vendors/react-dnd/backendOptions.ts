type GetDropTargetElementsAtPoint = (
  x: number,
  y: number,
  dropTargets: HTMLElement[],
) => HTMLElement[];

interface ReactDndBackendOptions {
  enableMouseEvents?: boolean;
  enableHoverOutsideTarget?: boolean;
  getDropTargetElementsAtPoint?: GetDropTargetElementsAtPoint;
}

/**
 * Find drop target elements at the given point.
 * Fallbacks `document.elementsFromPoint`.
 */
const getDropTargetElementsAtPoint = (
  x: number,
  y: number,
  dropTargets: HTMLElement[],
): HTMLElement[] =>
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
