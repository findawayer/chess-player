import { useCallback, useEffect, useState } from 'react';
import update from 'immutability-helper';

import { stringifySquare } from '~/helpers';
import { ChessPromotionVariant, ChessPromotion } from '~/types';

export type PromptPromotion = (
  promotion: Omit<ChessPromotion, 'variant'>,
) => void;

export type SelectPromotion = (variant: ChessPromotionVariant) => void;

export type AbortPromotion = () => void;

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
export const useChessPromotion = (): [
  ChessPromotion | null,
  PromptPromotion,
  SelectPromotion,
  AbortPromotion,
] => {
  const [promotion, setPromotion] = useState<ChessPromotion | null>(null);

  /**
   * Open a confirm dialog to let the player decide
   * which piece to promote the pawn to.
   */
  const promptPromotion = useCallback<PromptPromotion>(
    ({ color, from, to }) => {
      setPromotion({
        color,
        from: stringifySquare(from),
        to: stringifySquare(to),
      });
    },
    [],
  );
  /** Select the piece variant to promote the current pawn to. */
  const selectPromotion = useCallback<SelectPromotion>(
    variant => {
      if (promotion) {
        setPromotion(update(promotion, { $merge: { variant } }));
      }
    },
    [promotion],
  );
  /** Close the promotion dialog without doing anything. */
  const abortPromotion = useCallback<AbortPromotion>(() => {
    setPromotion(null);
  }, []);

  // Reset the promotion status on unmount.
  useEffect(() => {
    return () => setPromotion(null);
  }, []);

  return [promotion, promptPromotion, selectPromotion, abortPromotion];
};
