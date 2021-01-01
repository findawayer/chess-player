import { ChessBoardColor } from '@prisma/client';
import map from 'lodash/map';
import React from 'react';

import { objectifySquare } from '../../utils';
import {
  ChessLegalMove,
  ChessPieces,
  ChessSquare,
  ChessSquareName,
} from '../../types';
import ChessGuide from '../ChessGuide';
import ChessLegalSquare from '../ChessLegalSquare';
import ChessPiece from '../ChessPiece';

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
  color: ChessBoardColor,
): JSX.Element | null {
  return square ? (
    <ChessGuide variant="active" color={color} square={square} />
  ) : null;
}

/* Render currently hovered square during a piece drag action. */
export function renderHoveredSquare(
  square: ChessSquareName | null,
  color: ChessBoardColor,
): JSX.Element | null {
  return square ? (
    <ChessGuide variant="hover" color={color} square={square} />
  ) : null;
}

/* Render currently hovered square during a piece drag action. */
export function renderLegalSquares(
  legalMoves: ChessLegalMove[],
  {
    isVisible,
    handleSelect,
  }: {
    isVisible: boolean;
    handleSelect(square: ChessSquare): void;
  },
): JSX.Element[] {
  return legalMoves.map(({ square, flags }) => (
    <ChessLegalSquare
      key={square}
      square={square}
      flags={flags}
      isVisible={isVisible}
      handleSelect={handleSelect}
    />
  ));
}

/* Redner recentmost move's source & target squares. */
export function renderRecentSquares(
  squares: ChessSquareName[] | null,
  color: ChessBoardColor,
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
