import { useCallback, useEffect, useRef, useState } from 'react';

import { ChessPieceColor } from '@/types';

/* Delta time reference for a single player side. */
interface ChessClockSide {
  /* Accumulated delta time. (in milliseconds) */
  delta: number;
  /* The delta floored down to seconds. (in milliseconds) */
  deltaSeconds: number;
}

/* Clock for chess games. */
interface ChessClock {
  /* Time recorded on at the beginning of side change. */
  startTime: number | null;
  /* Time recorded on last frame update. */
  lastTime: number | null;
  /* Time gap since the last toggle */
  elapsed: number;
  /* Currently active side of the clock. */
  side: ChessPieceColor;
  /* White side */
  w: ChessClockSide;
  /* Black side */
  b: ChessClockSide;
}

/* Object containing time available for white(w) and black(s) sides. */
interface ChessClockTime {
  /* Time left for white side */
  w: number;
  /* Time left for black side */
  b: number;
}

// Frame updater to keep track of time flow.
type UpdateClock = (now: number) => void;
// Start clock.
type StartClock = () => void;
// Stop clock.
type PauseClock = () => void;
// Change the active side of the clock.
type SetClockSide = (side: ChessPieceColor) => void;
// Stop and reset the clock.
type ResetClock = () => void;

/* Returned values of `useChessClock` hook. */
interface UseChessClockAPI {
  time: ChessClockTime;
  startClock: StartClock;
  pauseClock: PauseClock;
  setClockSide: SetClockSide;
  resetClock: ResetClock;
}

/** Initial form of the clock. */
const initialClock: ChessClock = {
  startTime: null,
  lastTime: null,
  elapsed: 0,
  side: 'w',
  w: { delta: 0, deltaSeconds: 0 },
  b: { delta: 0, deltaSeconds: 0 },
};

/**
 * Floor a time in milliseconds down to seconds.
 * Used to limit the rate of function executions.
 */
const floorToSecond = (milliseconds: number) =>
  Math.floor(milliseconds / 1000) * 1000;

/**
 * Implementation of a chess clock as a React hook. The clock includes
 * two timers — one for each player — built into one unit. The timers never
 * run simultaneously but keep track of each player's time used.
 *
 * Note that the `window.requestAnimationFrame` API is used for time tracking
 * to achieve higher precision, instead of `window.useInterval` delivering slightly
 * delayed intervals depending on the call stack schedule of the browser engine.
 *
 * (This client-side clock may be safely migrated to a server-side solution
 * by sending a request inside `requestAnimationFrame` block.)
 *
 * @param arg.duration - Time equally given to both player side.
 * @param arg.increment - Time gained by playing within the time value given.
 * @param arg.side - Currently active player side.
 * @param arg.onTick - Callback invoked when the clock has an updated value.
 * @returns Object of:
 * - time: Object containing time available for white(w) and black(s) sides.
 * - startClock: Start running the clock. starts with the white side.
 * - pauseClock: Stop running the clock.
 * - setClockSide: Change the active side of the clock to the passed value.
 * - resetClock: Stop and reset the clock to initial settings.
 */
export const useChessClock = ({
  duration,
  increment,
}: {
  duration: number;
  increment: number;
}): UseChessClockAPI => {
  // Use `useRef` instead of `useState` to avoid re-render while tracking the time.
  const clockRef = useRef(initialClock);
  // Reference for the frame id that `requestAnimationFrame` returns.
  const requestRef = useRef<number>();
  // Reference for the frame update function.
  const updateRef = useRef<UpdateClock>();
  // The time output.
  const [time, setTime] = useState<ChessClockTime>({
    w: duration,
    b: duration,
  });

  /** Start running the clock. */
  const startClock = useCallback<StartClock>(() => {
    // Make sure the clock is not running.
    if (!requestRef.current) {
      requestRef.current = window.requestAnimationFrame(updateRef.current!);
    }
  }, []);
  /** Stop updating the clock. */
  const pauseClock = useCallback<PauseClock>(() => {
    if (requestRef.current) {
      window.cancelAnimationFrame(requestRef.current);
    }
  }, []);
  /** Toggle the runnning side of the clock. */
  const setClockSide = useCallback<SetClockSide>(
    side => {
      const clock = clockRef.current;
      const lastSide = clock.side;
      // Ignore if there is no side change. (might happen by a take-back)
      if (side === lastSide) {
        return;
      }
      // The previous player gain time increment at the end of their turn,
      // if they moved within the increment value.
      if (clock.elapsed <= increment) {
        clock[lastSide].delta -= increment;
      }
      // Update side cursor.
      clock.side = side;
      // Reset the initial timestamp.
      clock.startTime = null;
    },
    [increment],
  );
  /** Reset the clock and hold. */
  const resetClock = useCallback<ResetClock>(() => {
    // Stop updating.
    if (requestRef.current) {
      window.cancelAnimationFrame(requestRef.current);
      requestRef.current = undefined;
    }
    // Reset the clock.
    clockRef.current = initialClock;
    // Reset the time.
    setTime({ w: duration, b: duration });
  }, [duration]);

  // Cache clock frame update handler.
  useEffect(() => {
    // Renderer function invoked by `requestAnimationFrame`.
    // Exploited here to calculate timing with high precision.
    updateRef.current = (now: number) => {
      const clock = clockRef.current;
      // Record the timestamp when starting
      if (clock.startTime === null) {
        clock.startTime = now;
      }
      // Record elapsed time since the `startTime`.
      else {
        clock.elapsed = now - clock.startTime;
      }
      // Update delta time of current side.
      if (clock.lastTime !== null) {
        clock[clock.side].delta += now - clock.lastTime;
      }
      // Reflect the delta time to the `time` state, with an update rate limit of 1 second.
      const whiteDelta = floorToSecond(clock.w.delta);
      const blackDelta = floorToSecond(clock.b.delta);
      if (
        whiteDelta !== clock.w.deltaSeconds ||
        blackDelta !== clock.b.deltaSeconds
      ) {
        setTime({
          w: Math.max(duration - whiteDelta, 0),
          b: Math.max(duration - blackDelta, 0),
        });
        clock.w.deltaSeconds = whiteDelta;
        clock.b.deltaSeconds = blackDelta;
      }
      // Continue updating until current player runs out of the time.
      if (clock[clock.side].delta < duration) {
        requestRef.current = window.requestAnimationFrame(updateRef.current!);
      }
      clock.lastTime = now;
    };
  }, [duration, increment, time]);

  // Stop updating on unmount.
  useEffect(() => {
    return () => {
      if (requestRef.current) window.cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return {
    time,
    startClock,
    pauseClock,
    setClockSide,
    resetClock,
  };
};
