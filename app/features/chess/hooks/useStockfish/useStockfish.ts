import type { Move, ShortMove } from 'chess.js';
import clamp from 'lodash/clamp';
import { useCallback, useEffect, useState } from 'react';

import {
  calculateDepth,
  calculateErrorProbability,
  calculateMaxError,
  formatMoveString,
  formatTimeString,
} from './helpers';
import {
  ENGINE_IS_LOADED,
  ENGINE_IS_READY,
  FOUND_BEST_MOVE,
  IS_SYSTEM_MESSAGE,
} from './messages';
import { useEngine } from './useEngine';

/** Chess engine's status. */
export enum ChessEngineStatus {
  Loading,
  Loaded,
  Ready,
  Running,
}

/**
 * Latest chess move found by the chess engine.
 * `null` means the engine has not been running.
 */
export type ChessEngineMove = ShortMove | null;

/** Configurable options for `useStockfish` hook. */
export interface UseStockfishOptions {
  duration: number;
  increment: number;
  skillLevel?: number;
  filepath?: string;
}

/**
 * Make use of `stockfish` chess engine for move generation & evaluation.
 *
 * @param options.duration - Time given to each player side.
 * @param options.increment - Time increment per move.
 * @param options.skillLevel - The engine's strength.
 * @param options.filepath - Optional. File location of `stockfish.js`.
 * @returns Array of state and methods.
 * - move: The best move that engine has found.
 * - findMove: Command the engine to find the best move.
 * - isReady: The engine is ready.
 * - isRunning: The engine is running.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useStockfish = ({
  duration,
  increment,
  skillLevel = 20,
  filepath = 'stockfish.js',
}: UseStockfishOptions) => {
  // Main engine that generates chess moves.
  const { setHandler: setEngineHandler, command: commandEngine } = useEngine(
    filepath,
  );
  // Evaluator.
  const { setHandler: setEvalerHandler, command: commandEvaler } = useEngine(
    filepath,
  );
  // Load status of the main engine.
  const [status, setStatus] = useState(ChessEngineStatus.Loading);
  // Configuration
  const [depth, setDepth] = useState<number | null>(null);
  // The move that engine has found.
  const [move, setMove] = useState<ChessEngineMove>(null);
  /** Whether the main engine is loaded and ready to work. */
  const isReady = status === ChessEngineStatus.Ready;
  /** Whether the main engine is generating move. */
  const isRunning = status === ChessEngineStatus.Running;

  /** Set the engine's power level. */
  const setSkillLevel = useCallback(
    (skillLevel: number) => {
      const level = clamp(skillLevel, 0, 20);
      const depth = calculateDepth(level);
      const errorProbability = calculateErrorProbability(level);
      const maxError = calculateMaxError(level);
      // Update depth
      setDepth(depth);
      // Send command to the engine.
      commandEngine(`setoption name Skill Level value ${skillLevel}`);
      commandEngine(
        `setoption name Skill Level Maximum Error value ${maxError}`,
      );
      commandEngine(
        `setoption name Skill Level Probability value ${errorProbability}`,
      );
    },
    [commandEngine],
  );

  /**
   * Find the best move that the engine can come up with.
   * @param history - Array of all chess moves played.
   * @param accelerate - Make the engine find the move instantly.
   */
  const findMove = useCallback(
    ({ history, accelerate }: { history: Move[]; accelerate?: boolean }) => {
      if (isRunning) {
        return;
      }
      const moveString = formatMoveString(history);
      // Mark the engine as busy.
      setStatus(ChessEngineStatus.Running);
      // Flush the move slot.
      setMove(null);
      // Query the engine and the evaluator.
      commandEngine(`position startpos moves ${moveString}`);
      commandEvaler(`position startpos moves ${moveString}`);
      // Calculate instantly
      if (accelerate) {
        const timeString = formatTimeString({ depth, duration, increment });
        commandEngine(`go ${timeString}`);
      }
      // Otherwise, take more time to ponder.
      else {
        commandEngine(`go`);
      }
    },
    [commandEngine, commandEvaler, depth, duration, increment, isRunning],
  );

  /** `onmessage` handler for the engine. */
  const handleEngineMessage = useCallback(
    (event: MessageEvent) => {
      const line = typeof event === 'object' ? event.data : event;
      // Ignore system messages.
      if (IS_SYSTEM_MESSAGE.test(line)) {
        return;
      }
      // Engine is loaded.
      if (ENGINE_IS_LOADED.test(line)) {
        setStatus(ChessEngineStatus.Loaded);
        return;
      }
      // Engine is ready to go.
      if (ENGINE_IS_READY.test(line)) {
        setStatus(ChessEngineStatus.Ready);
        return;
      }
      // Engine has found the best move.
      if (FOUND_BEST_MOVE.test(line)) {
        const [, from, to, promotion] = line.match(FOUND_BEST_MOVE);
        // Save the found move.
        setMove({ from, to, promotion });
        // Refresh evaluation
        commandEvaler('eval');
        // Unset the engine's busy status.
        setStatus(ChessEngineStatus.Ready);
      }
      console.debug('engine', line);
    },
    [commandEvaler],
  );

  /** `onmessage` handler for the evaluator. */
  const handleEvalerMessage = useCallback((event: MessageEvent) => {
    const line = typeof event === 'object' ? event.data : event;
    // Ignore system messages.
    if (!IS_SYSTEM_MESSAGE.test(line)) {
      console.debug('evaler', line);
    }
  }, []);

  // Add `onmessage` handler to the engine & evaler.
  useEffect(() => {
    setEngineHandler(handleEngineMessage);
    setEvalerHandler(handleEvalerMessage);
  }, [
    setEngineHandler,
    setEvalerHandler,
    handleEngineMessage,
    handleEvalerMessage,
  ]);

  // Execute UCI
  // @see: http://wbec-ridderkerk.nl/html/UCIProtocol.html
  useEffect(() => {
    // Tell the engine to use the UCI (universal chess interface).
    commandEngine('uci');
    // Set expected superiority/inferiority of the engine over the opponent. (-50 ~ 50)
    // This makes the engine prefer or avoid draws against the opponent based on their strength.
    commandEngine('setoption name Contempt value 0'); // Assume the players level are equal
    // Let the engine come up with its next move during the opponent's turn. (true/false)
    commandEngine('setoption name Ponder value true');
    // Set the bottom line of thinking time for realistic gaming experience.
    commandEngine('setoption name Minimum Thinking Time value 500');
  }, [commandEngine]);

  // Set the engine's gameplay strength. 0-20 (The higher the stronger)
  useEffect(() => {
    setSkillLevel(skillLevel);
  }, [setSkillLevel, skillLevel]);

  // Post process after option configuration.
  useEffect(() => {
    // Tell the engine that the GUI is done processing.
    commandEngine('isready');
    // Tell the engine that next search will be from a different game.
    commandEngine('ucinewgame');
  }, [commandEngine]);

  // Reset the engine on unmount.
  useEffect(() => {
    return () => {
      commandEngine('quit');
      commandEvaler('quit');
    };
  }, [commandEngine, commandEvaler]);

  return { move, findMove, isReady, isRunning };
};
