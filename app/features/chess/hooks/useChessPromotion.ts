import update from 'immutability-helper';
import { useCallback, useEffect, useState } from 'react';

import { stringifySquare } from '~app/features/chess/utils';
import type {
  ChessPromotion,
  ChessPromotionVariant,
} from '~app/features/chess/types';

/**
 * Create a confirmation prompt to let the player decide which piece to
 * promote their promoting pawn.
 *
 * @returns Array of:
 * - promotion: Chess promotion object. `null` means there is no active promotion.
 * - prompt: Create the confirmation prompt.
 * - select: Confirm the promotion variant.
 * - abort: Dismiss the confirmation prompt.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useChessPromotion = () => {
  const [promotion, setPromotion] = useState<ChessPromotion | null>(null);

  /**
   * Open a confirm dialog to let the player decide
   * which piece to promote the pawn to.
   */
  const promptPromotion = useCallback(
    ({ color, from, to }: Omit<ChessPromotion, 'variant'>) => {
      setPromotion({
        color,
        from: stringifySquare(from),
        to: stringifySquare(to),
      });
    },
    [],
  );
  /** Select the piece variant to promote the current pawn to. */
  const selectPromotion = useCallback(
    (variant: ChessPromotionVariant) => {
      if (promotion) {
        setPromotion(update(promotion, { $merge: { variant } }));
      }
    },
    [promotion],
  );
  /** Close the promotion dialog without doing anything. */
  const abortPromotion = useCallback(() => {
    setPromotion(null);
  }, []);

  // Reset the promotion status on unmount.
  useEffect(() => {
    return () => setPromotion(null);
  }, []);

  return { promotion, promptPromotion, selectPromotion, abortPromotion };
};
