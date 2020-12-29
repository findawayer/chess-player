import { useCallback, useEffect, useRef, useState } from 'react';

import { ChessPieceColor } from '~/typings';

/* Delta time reference for a single player side. */
interface TimeTrackerSide {
  /* Accumulated delta time. (in milliseconds) */
  delta: number;
  /* The delta floored down to seconds. (in milliseconds) */
  deltaSeconds: number;
}

/* Object containing information about time flow. */
interface TimeTracker {
  /* Time recorded on at the beginning of side change. */
  startTime: number | null;
  /* Time recorded on last frame update. */
  lastTime: number | null;
  /* Time gap since the last toggle */
  elapsed: number;
  /* Currently active side of the clock. */
  side: ChessPieceColor;
  /* White side */
  w: TimeTrackerSide;
  /* Black side */
  b: TimeTrackerSide;
}

/* Object containing time available for white(w) and black(s) sides. */
interface ChessClock {
  /* Time left for white side */
  w: number;
  /* Time left for black side */
  b: number;
}

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
  time: ChessClock;
  startClock: StartClock;
  pauseClock: PauseClock;
  setClockSide: SetClockSide;
  resetClock: ResetClock;
}

/** Create a fresh time tracker with default values. */
const createTimeTracker = (): TimeTracker => ({
  startTime: null,
  lastTime: null,
  elapsed: 0,
  side: 'w',
  w: { delta: 0, deltaSeconds: 0 },
  b: { delta: 0, deltaSeconds: 0 },
});

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
  // Time flow data. `useRef` is necessary here because:
  // 1. Tracking delta time should not trigger re-render;
  // 2. The object should be static between re-renders.
  const trackerRef = useRef(createTimeTracker());
  // Reference for the frame id that `requestAnimationFrame` returns.
  const requestRef = useRef<number>();
  // The time output.
  const [time, setTime] = useState<ChessClock>({
    w: duration,
    b: duration,
  });

  /**
   * Track delta time between each `requestAnimationFrame` calls and update
   * timer for each player side.
   *
   * @param now The timestamp of current `requestAnimationFrame` execution.
   */
  const update = useCallback(
    (now: number) => {
      const tracker = trackerRef.current;
      // Record the timestamp when starting
      if (tracker.startTime === null) {
        tracker.startTime = now;
      }
      // Record elapsed time since the `startTime`.
      else {
        tracker.elapsed = now - tracker.startTime;
      }
      // Update delta time of current side.
      if (tracker.lastTime !== null) {
        tracker[tracker.side].delta += now - tracker.lastTime;
      }
      // Reflect the delta time to the `time` state, with an update rate limit of 1 second.
      const whiteDelta = floorToSecond(tracker.w.delta);
      const blackDelta = floorToSecond(tracker.b.delta);
      if (
        whiteDelta !== tracker.w.deltaSeconds ||
        blackDelta !== tracker.b.deltaSeconds
      ) {
        setTime({
          w: Math.max(duration - whiteDelta, 0),
          b: Math.max(duration - blackDelta, 0),
        });
        tracker.w.deltaSeconds = whiteDelta;
        tracker.b.deltaSeconds = blackDelta;
      }
      // Continue updating until current player runs out of the time.
      if (tracker[tracker.side].delta < duration) {
        requestRef.current = window.requestAnimationFrame(update);
      }
      tracker.lastTime = now;
    },
    [duration],
  );
  /** Start running the clock. */
  const startClock = useCallback<StartClock>(() => {
    if (!requestRef.current) {
      requestRef.current = window.requestAnimationFrame(update);
    }
  }, [update]);
  /** Stop updating the clock. */
  const pauseClock = useCallback<PauseClock>(() => {
    if (requestRef.current) {
      window.cancelAnimationFrame(requestRef.current);
      requestRef.current = undefined;
    }
  }, []);
  /** Toggle the runnning side of the clock. */
  const setClockSide = useCallback<SetClockSide>(
    side => {
      const tracker = trackerRef.current;
      const lastSide = tracker.side;
      // Ignore if there is no side change. (might happen by a take-back)
      if (side === lastSide) {
        return;
      }
      // The previous player gain time increment at the end of their turn,
      // if they moved within the increment value.
      if (tracker.elapsed <= increment) {
        tracker[lastSide].delta -= increment;
      }
      // Update side cursor.
      tracker.side = side;
      // Reset the initial timestamp.
      tracker.startTime = null;
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
    // Reset the tracker.
    trackerRef.current = createTimeTracker();
    // Reset the time.
    setTime({ w: duration, b: duration });
  }, [duration]);

  // Stop updating on unmount.
  useEffect(() => {
    return () => {
      if (requestRef.current) {
        window.cancelAnimationFrame(requestRef.current);
        requestRef.current = undefined;
      }
      // Reset the tracker.
      trackerRef.current = createTimeTracker();
    };
  }, [resetClock]);

  return {
    time,
    startClock,
    pauseClock,
    setClockSide,
    resetClock,
  };
};
