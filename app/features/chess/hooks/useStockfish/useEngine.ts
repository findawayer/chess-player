import { useCallback, useEffect, useRef } from 'react';

/**
 * Load Stockfish engine with Web Worker API.
 *
 * @param filepath - Location of `stockfish.js` file.
 * @returns Array of methods.
 * - setMessageHandler: Set `onmessage` handler to the worker.
 * - comamndEngine: Send a UCI command to the worker.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useEngine = (filepath = 'stockfish.js') => {
  const engine = useRef<Worker>();

  // Save stockfish instance.
  useEffect(() => {
    engine.current = new Worker(filepath);
  }, [filepath]);

  /**
   * Add `onmessage` handler to the engine. (The engine emits output
   * by posting a message; we need to set `onmessage` handler to receive it.)
   */
  const setHandler = useCallback((handler: (event: MessageEvent) => void) => {
    // We are assuming `engine.current` is set when this callback is invoked.
    if (engine.current) engine.current.onmessage = handler;
  }, []);
  /** Send a UCI command to Stockfish. */
  const command = useCallback((command: string) => {
    engine.current?.postMessage(command);
  }, []);

  return { setHandler, command };
};
