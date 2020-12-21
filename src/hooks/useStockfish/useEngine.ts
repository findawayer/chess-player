import { useCallback, useEffect, useRef } from 'react';

import { CommandEngine, SetMessageHandler } from './types';

/**
 * Load Stockfish engine with Web Worker API.
 *
 * @param filepath - Location of `stockfish.js` file.
 * @returns Array of methods.
 * - setMessageHandler: Set `onmessage` handler to the worker.
 * - comamndEngine: Send a UCI command to the worker.
 */
export const useEngine = (
  filepath = 'stockfish.js',
): [SetMessageHandler, CommandEngine] => {
  // Stockfish engine object; `useRef` is used to make the object static.
  const engine = useRef<Worker>();

  // Save stockfish instance.
  useEffect(() => {
    engine.current = new Worker(filepath);
  }, [filepath]);

  // Add `onmessage` handler to the engine asynchronously.
  // (The engine delivers the output by posting a message —
  // we need to add `onmessage` handler to receive it.)
  const setMessageHandler = useCallback<SetMessageHandler>(handler => {
    // We are assuming `engine.current` is set when this callback is invoked.
    if (engine.current) engine.current.onmessage = handler;
  }, []);

  // Send a UCI command to the engine.
  const commandEngine = useCallback<CommandEngine>(command => {
    engine.current?.postMessage(command);
  }, []);

  return [setMessageHandler, commandEngine];
};
