import clsx from 'clsx';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { withResizeDetector } from 'react-resize-detector';

import ChessPieceDragLayer from '@components/ChessPieceDragLayer';
import ChessBoardGrid from '@components/ChessBoardGrid';
import { ChessValidatorContext } from '@contexts';
import {
  areSameSquares,
  findLegalMoves,
  isEdgeRank,
  stringifySquare,
} from '@helpers';
import { useChessGuides, useChessPromotion } from '@hooks';
import { NUMBER_OF_FILES } from '@settings/chess-config';
import { movePiece, playMove } from '@slices/chess';
import {
  DragItem,
  DraggedPiece,
  getDropTargetSquare,
} from '@vendors/react-dnd';
import { AppDispatch } from '@vendors/redux';
import {
  ChessPieces,
  ChessSquare,
  ChessSquareName,
  GameSettings,
} from '@types';
import useStyles from './styles';
import {
  renderPieces,
  renderActiveSquare,
  renderHoveredSquare,
  renderLegalSquares,
  renderRecentSquares,
  renderPromotionDialog,
} from './render';

interface BoardProps extends Omit<GameSettings, 'boardColor'> {
  // Game data
  pieces: ChessPieces;
  recentMovePath: ChessSquareName[] | null;
  isFlipped: boolean;
  isFrozen: boolean;
  // Props below are received from `react-resize-detector`
  height: number;
  width: number;
}

export const Board: React.FC<BoardProps> = ({
  pieces,
  recentMovePath,
  isFlipped,
  isFrozen,
  autoPromoteToQueen,
  highlightMoves,
  showLegalMoves,
  width,
}) => {
  /** Chess game validotor */
  const validator = useContext(ChessValidatorContext);
  /** Action dispatcher to Redux store. */
  const dispatch = useDispatch<AppDispatch>();
  /** The size of a single square. */
  const squareSize = useMemo(() => width / NUMBER_OF_FILES, [width]);
  // Local state: Highlights on user interacted sqaures.
  const [
    activeSquare,
    hoveredSquare,
    legalMoves,
    setActive,
    setHover,
  ] = useChessGuides();
  // Pawn promotion confirm dialog.
  const [
    promotion,
    promptPromotion,
    selectPromotion,
    abortPromotion,
  ] = useChessPromotion();
  /** CSS classes created via Material-UI. */
  const classes = useStyles();

  const handlePieceSelect = useCallback(
    (square: ChessSquare) => {
      if (!isFrozen) {
        const legalMoves = findLegalMoves(validator, square);
        setActive(square, legalMoves);
      }
    },
    [isFrozen, setActive, validator],
  );
  // Handle click event on a legal move lighlight.
  // (Wrapped by another handler transmitting required data.)0
  const handleSquareSelect = useCallback(
    (square: ChessSquare) => {
      // Skip if gameplay is not allowed, or no source square is found.
      if (isFrozen || !activeSquare) {
        return;
      }
      // Selecting the very same square is considered as a blur event.
      if (areSameSquares(activeSquare, square)) {
        setHover(null);
      }
      // Try to move piece to the target square.
      else {
        const activePieceId = pieces.positions[activeSquare];
        const activePiece = pieces.byId[activePieceId];
        const isPromotion = activePiece.variant === 'p' && isEdgeRank(square);
        const from = activeSquare;
        const to = stringifySquare(square);
        // Prompt promotion confirm dialog
        if (isPromotion && !autoPromoteToQueen) {
          dispatch(movePiece({ from, to }));
          promptPromotion({ color: activePiece.color, from, to });
        } else {
          // Validate the move.
          const move = validator.move({
            from,
            to,
            promotion: isPromotion ? 'q' : undefined,
          });
          // If the move is valid, commmit the move.
          if (move) {
            dispatch(playMove(move));
          }
        }
        // Clear active & legal square highlights.
        setActive(null);
      }
    },
    [
      activeSquare,
      autoPromoteToQueen,
      dispatch,
      isFrozen,
      pieces,
      promptPromotion,
      setActive,
      setHover,
      validator,
    ],
  );
  // Reset the guides by clicking anything else than the legal sqaures.
  const handleBlur = useCallback(() => setActive(null), [setActive]);

  // `react-dnd` bindings for droppability.
  const [, drop] = useDrop({
    accept: DragItem.PIECE,
    // canDrop: () => !isFrozen,
    hover: (item: DraggedPiece, monitor: DropTargetMonitor) => {
      // Hovered square can have 2 possible values.
      // `string`: Cursor is over a square within the board.
      // `null`: Cursor has gone off the board.
      const hoveredSquare = getDropTargetSquare(item, monitor, isFlipped);
      setHover(hoveredSquare);
    },
    drop(item: DraggedPiece, monitor: DropTargetMonitor) {
      // Dropped square cannot be `null`.
      // We assume that the returned value is non-nullable.
      const droppedSquare = getDropTargetSquare(item, monitor, isFlipped)!;
      handleSquareSelect(droppedSquare);
    },
  });

  // Handle confirmation of pawn promotion.
  useEffect(() => {
    // If player has selected which piece to promote their pawn,
    if (promotion && promotion.variant) {
      // Validate the promotion first.
      const move = validator.move({
        from: promotion.from,
        to: promotion.to,
        promotion: promotion.variant,
      });
      // If the move is valid, then commmit the move.
      if (move) dispatch(playMove(move));
    }
  }, [dispatch, promotion, validator]);

  return (
    <>
      <div
        ref={drop}
        className={clsx(classes.board, isFlipped && 'is-flipped')}
      >
        <ChessBoardGrid handleBlur={handleBlur} />
        {highlightMoves && renderRecentSquares(recentMovePath)}
        {highlightMoves && renderActiveSquare(activeSquare)}
        {renderHoveredSquare(hoveredSquare)}
        {renderPieces(pieces, {
          size: squareSize,
          isFrozen,
          handleSelect: handlePieceSelect,
        })}
        {renderLegalSquares(legalMoves, {
          showLegalMoves,
          handleSelect: handleSquareSelect,
        })}
        {renderPromotionDialog(promotion, { abortPromotion, selectPromotion })}
      </div>
      <ChessPieceDragLayer />
    </>
  );
};

// Bind `react-resize-detector` to monitor the size of the board.
export const ResizeAwareBoard = withResizeDetector(Board);
