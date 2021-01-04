import update from 'immutability-helper';
import { useCallback, useState } from 'react';

import { stringifySquare } from '~/features/chess/utils';
import {
  ChessGuides,
  ChessLegalMove,
  ChessSquare,
} from '~/features/chess/types';

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
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useChessGuides = () => {
  const [{ active, hover, legal }, setGuides] = useState<ChessGuides>({
    active: null,
    hover: null,
    legal: [],
  });
  /**
   * Highlight the square that user is interacting,
   * and squares that the player can move the active piece to.
   */
  const setActive = useCallback(
    (activeSquare: ChessSquare | null, legalMoves?: ChessLegalMove[]) => {
      setGuides(previousGuides =>
        update(previousGuides, {
          $merge: {
            active: activeSquare ? stringifySquare(activeSquare) : null,
            legal: legalMoves || [],
            hover: null,
          },
        }),
      );
    },
    [],
  );
  /** Highlight the square that the user is moving the cursor onto. */
  const setHover = useCallback((square: ChessSquare | null) => {
    setGuides(previousGuides =>
      update(previousGuides, {
        $merge: { hover: square ? stringifySquare(square) : null },
      }),
    );
  }, []);

  return {
    active,
    hover,
    legal,
    setActive,
    setHover,
  };
};
