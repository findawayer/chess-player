import map from 'lodash/map';
import React from 'react';

import ChessGuide from '@/components/ChessGuide';
import ChessLegalSquare from '@/components/ChessLegalSquare';
import ChessPiece from '@/components/ChessPiece';
import ChessPromotionDialog from '@/components/ChessPromotionDialog';
import { objectifySquare } from '@/helpers';
import { AbortPromotion, SelectPromotion } from '@/hooks';
import {
  ChessBoardThemeVariant,
  ChessLegalMove,
  ChessPieces,
  ChessPromotion,
  ChessSquare,
  ChessSquareName,
} from '@/types';

/* Render chess pieces. */
export function renderPieces(
  pieces: ChessPieces,
  options: {
    size: number;
    isFrozen: boolean;
    handleSelect: (square: ChessSquare) => void;
  },
): JSX.Element[] {
  const { byId, positions } = pieces;
  const { size, isFrozen, handleSelect } = options;

  return map(positions, (id, square) => {
    const { color, variant } = byId[id];
    const { x, y } = objectifySquare(square as ChessSquareName);
    return (
      <ChessPiece
        key={id}
        id={id}
        color={color}
        variant={variant}
        x={x}
        y={y}
        size={size}
        isFrozen={isFrozen}
        handleSelect={handleSelect}
      />
    );
  });
}

/* Render user selected square during a piece drag action. */
export function renderActiveSquare(
  square: ChessSquareName | null,
  color: ChessBoardThemeVariant,
): JSX.Element | null {
  return square ? (
    <ChessGuide variant="active" color={color} square={square} />
  ) : null;
}

/* Render currently hovered square during a piece drag action. */
export function renderHoveredSquare(
  square: ChessSquareName | null,
  color: ChessBoardThemeVariant,
): JSX.Element | null {
  return square ? (
    <ChessGuide variant="hover" color={color} square={square} />
  ) : null;
}

/* Render currently hovered square during a piece drag action. */
export function renderLegalSquares(
  legalMoves: ChessLegalMove[],
  options: {
    showLegalMoves: boolean;
    handleSelect(square: ChessSquare): void;
  },
): JSX.Element[] {
  const { showLegalMoves, handleSelect } = options;
  return legalMoves.map(({ square, flags }) => (
    <ChessLegalSquare
      key={square}
      square={square}
      flags={flags}
      showLegalMoves={showLegalMoves}
      handleSelect={handleSelect}
    />
  ));
}

/* Redner recentmost move's source & target squares. */
export function renderRecentSquares(
  squares: ChessSquareName[] | null,
  color: ChessBoardThemeVariant,
): JSX.Element[] | null {
  return squares
    ? squares.map(square => (
        <ChessGuide
          key={square}
          variant="recent"
          color={color}
          square={square}
        />
      ))
    : null;
}

export function renderPromotionDialog(
  promotion: ChessPromotion | null,
  options: { abortPromotion: AbortPromotion; selectPromotion: SelectPromotion },
): JSX.Element | null {
  const { abortPromotion, selectPromotion } = options;

  return promotion && !promotion.variant ? (
    <ChessPromotionDialog
      color={promotion.color}
      square={promotion.to}
      abortPromotion={abortPromotion}
      selectPromotion={selectPromotion}
    />
  ) : null;
}
