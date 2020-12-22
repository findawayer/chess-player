import update from 'immutability-helper';
import { useCallback, useState } from 'react';

import { stringifySquare } from '@/helpers';
import { ChessGuides, ChessLegalMove, ChessSquare } from '@/types';

export type SetActive = (
  activeSquare: ChessSquare | null,
  legalSquare?: ChessLegalMove[],
) => void;

export type SetHover = (square: ChessSquare | null) => void;

/**
 * Reducer hook to manipulate chess square highlights collectively.
 *
 * @returns Array of:
 * - activeSquare: Square that the user is interacting.
 * - hoveredSquare: Square where the user's cursor is on.
 * - legalSquares: Squares where the user can move the piece to.
 * - setActive: Set or unset the active square.
 * - setHover: Set or unset the hovered square.
 */
export const useChessGuides = (): [
  ChessGuides['active'],
  ChessGuides['hover'],
  ChessGuides['legal'],
  SetActive,
  SetHover,
] => {
  const [guides, setGuides] = useState<ChessGuides>({
    active: null,
    hover: null,
    legal: [],
  });

  /**
   * Highlight the square that user is interacting,
   * and squares that the player can move the active piece to.
   */
  const setActive = useCallback<SetActive>((activeSquare, legalMoves) => {
    setGuides(previousGuides =>
      update(previousGuides, {
        $merge: {
          active: activeSquare ? stringifySquare(activeSquare) : null,
          legal: legalMoves || [],
          hover: null,
        },
      }),
    );
  }, []);
  /** Highlight the square that the user is moving the cursor onto. */
  const setHover = useCallback<SetHover>(square => {
    setGuides(previousGuides =>
      update(previousGuides, {
        $merge: { hover: square ? stringifySquare(square) : null },
      }),
    );
  }, []);

  return [guides.active, guides.hover, guides.legal, setActive, setHover];
};
