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

/**
 * Backend options for `react-dnd` library.
 * @api https://react-dnd.github.io/react-dnd/docs/backends/touch
 */
export const backendOptions = {
  enableMouseEvents: true,
  enableHoverOutsideTarget: false,
  getDropTargetElementsAtPoint:
    document &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (document.elementsFromPoint || (<any>document).msElementsFromPoint)
      ? undefined
      : getDropTargetElementsAtPoint,
};
