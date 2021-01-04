import { NoSsr } from '@material-ui/core';
import { ChessInstance } from 'chess.js';
import clsx from 'clsx';
import map from 'lodash/map';
import React, { useCallback, useEffect, useMemo } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { withResizeDetector } from 'react-resize-detector';

import { NUMBER_OF_FILES } from '~/features/chess/constants';
import {
  ChessSettings,
  useChessGuides,
  useChessPromotion,
} from '~/features/chess/hooks';
import {
  DraggedPiece,
  DragItem,
  getDropTargetSquare,
} from '~/features/chess/react-dnd';
import { movePiece, playMove } from '~/features/chess/slice';
import {
  ChessPieces,
  ChessSquare,
  ChessSquareName,
} from '~/features/chess/types';
import {
  findLegalMoves,
  isPromotingPawn,
  objectifySquare,
  stringifySquare,
} from '~/features/chess/utils';
import { AppDispatch } from '~/vendors/redux';
import BoardGrid from './BoardGrid';
import Guide from './Guide';
import LegalSquare from './LegalSquare';
import Piece from './Piece';
import PieceDragLayer from './PieceDragLayer';
import PromotionDialog from './PromotionDialog';
import useStyles from './styles/Board';

/* Render chess pieces. */
const renderPieces = (
  pieces: ChessPieces,
  options: {
    size: number;
    isFrozen: boolean;
    handleSelect: (square: ChessSquare) => void;
  },
) => {
  const { byId, positions } = pieces;
  const { size, isFrozen, handleSelect } = options;

  return map(positions, (id, square) => {
    const { color, variant } = byId[id];
    const { x, y } = objectifySquare(square as ChessSquareName);
    return (
      <Piece
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
};

interface BoardProps {
  // Game data
  validator: ChessInstance;
  pieces: ChessPieces;
  recentMovePath: ChessSquareName[] | null;
  isFlipped: boolean;
  isFrozen: boolean;
  isGameOver: boolean;
  // Game settings
  settings: ChessSettings;
  // For `react-resize-detector`
  targetRef: React.Ref<HTMLDivElement>;
  width: number;
}

const Board: React.FC<BoardProps> = ({
  validator,
  pieces,
  recentMovePath,
  isFlipped,
  isFrozen,
  isGameOver,
  settings,
  targetRef,
  width,
}) => {
  /** Action dispatcher to Redux store. */
  const dispatch = useDispatch<AppDispatch>();
  /** The size of a single square. */
  const squareSize = useMemo(() => width / NUMBER_OF_FILES, [width]);
  // Local state: Highlights on user interacted sqaures.
  const {
    active: activeSquare,
    hover: hoveredSquare,
    legal: legalMoves,
    setActive,
    setHover,
  } = useChessGuides();
  // Pawn promotion confirm dialog.
  const {
    promotion,
    promptPromotion,
    selectPromotion,
    abortPromotion,
  } = useChessPromotion();
  /** CSS classes created via Material-UI. */
  const classes = useStyles();

  /** Handle click event on a piece. */
  const handlePieceSelect = useCallback(
    (sourceSquare: ChessSquare) => {
      if (!isFrozen) {
        const legalSquares = findLegalMoves(validator, sourceSquare);
        setActive(sourceSquare, legalSquares);
      }
    },
    [isFrozen, setActive, validator],
  );
  /**
   * Handle click event on a legal move lighlight.
   * (Wrapped by another handler transmitting the paylod.)
   */
  const handleSquareSelect = useCallback(
    (targetSquare: ChessSquare) => {
      const from = activeSquare;
      const to = stringifySquare(targetSquare);
      const isLegalMove = legalMoves.find(({ square }) => square === to);
      // Skip if
      // 1. Gameplay is not allowed. (Due to gameover?)
      // 2. Cannot find the square that the current move is originated from.
      // 3. The current move is illegal.
      if (isFrozen || !from || !isLegalMove) {
        return;
      }
      // Selecting the very same square is considered as a blur event.
      if (from === to) {
        setHover(null);
      }
      // Try to move piece to the target square.
      else {
        const activePieceId = pieces.positions[from];
        const activePiece = pieces.byId[activePieceId];
        const isPromotion = isPromotingPawn(activePiece, to);
        // Prompt promotion confirm dialog
        if (isPromotion && !settings.autoQueen) {
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
      dispatch,
      isFrozen,
      legalMoves,
      pieces,
      promptPromotion,
      setActive,
      setHover,
      validator,
      settings,
    ],
  );
  /** Reset the guides by clicking anything else than the legal sqaures. */
  const handleBlur = () => setActive(null);

  // `react-dnd` bindings for droppability.
  const [, drop] = useDrop({
    accept: DragItem.PIECE,
    // canDrop: () => !isFrozen,
    hover: (item: DraggedPiece, monitor: DropTargetMonitor) => {
      // Hovered square can have 2 possible values.
      // `string`: Cursor is over a square within the board.
      // `null`: Cursor has gone off the board.
      const hoverSquare = getDropTargetSquare(item, monitor, isFlipped);
      setHover(hoverSquare);
    },
    drop(item: DraggedPiece, monitor: DropTargetMonitor) {
      // Dropped square cannot be `null`.
      // We assume that the returned value is non-nullable.
      const droppedSquare = getDropTargetSquare(item, monitor, isFlipped)!;
      handleSquareSelect(droppedSquare);
    },
  });

  // Clear guides on unmount.
  useEffect(() => {
    return () => setActive(null);
  }, [setActive]);

  // Clear guides on game end.
  useEffect(() => {
    if (isGameOver) {
      setActive(null);
    }
  }, [isGameOver, setActive]);

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

  // targetRef -> `react-resize-detector` binding
  // drop -> `react-dnd` binding
  return (
    <NoSsr>
      <div ref={targetRef}>
        <div
          ref={drop}
          className={clsx(classes.board, isFlipped && 'is-flipped')}
        >
          <BoardGrid color={settings.boardColor} />
          <div onClick={handleBlur} />
          {settings.showRecent &&
            recentMovePath.map(square => (
              <Guide
                key={square}
                variant="recent"
                color={settings.boardColor}
                square={square}
              />
            ))}
          <Guide
            variant="active"
            color={settings.boardColor}
            square={activeSquare}
          />
          <Guide
            variant="hover"
            color={settings.boardColor}
            square={hoveredSquare}
          />
          {renderPieces(pieces, {
            size: squareSize,
            isFrozen,
            handleSelect: handlePieceSelect,
          })}
          {legalMoves.map(({ square, flags }) => (
            <LegalSquare
              key={square}
              square={square}
              flags={flags}
              isVisible={settings.showLegal}
              handleSelect={handleSquareSelect}
            />
          ))}
          {promotion && !promotion.variant ? (
            <PromotionDialog
              color={promotion.color}
              square={promotion.to}
              abortPromotion={abortPromotion}
              selectPromotion={selectPromotion}
            />
          ) : null}
        </div>
        <PieceDragLayer />
      </div>
    </NoSsr>
  );
};

// Bind `react-resize-detector` to monitor the size of the board.
export default withResizeDetector(Board);
