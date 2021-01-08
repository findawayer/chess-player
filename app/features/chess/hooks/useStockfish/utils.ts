import { Move } from 'chess.js';

// Get the engine's thinking depth allowance.
// (Beyond level 15, let the engine decide with `null` value.)
export const calculateDepth = (skillLevel: number): number | null =>
  skillLevel < 15 ? Math.ceil((skillLevel + 1) / 5) : null;

// Get the probability of playing mistakes.
// NOTE: Stockfish level 20 does not make errors (intentially),
// so these numbers have no effect on level 20.
// Level 0 starts at 1
export const calculateErrorProbability = (skillLevel: number): number =>
  Math.round(skillLevel * 6.35 + 1);

// Level 0 starts at 10
export const calculateMaxError = (skillLevel: number): number =>
  Math.round(skillLevel * -0.5 + 10);

// Format time string that conforms to Stockfish API
export const formatTimeString = ({
  depth,
  duration,
  increment,
}: {
  depth: number | null;
  duration: number;
  increment: number;
}): string => {
  let output = depth ? `depth ${depth}` : '';
  if (duration) {
    output += ` wtime ${duration} winc ${increment} btime ${duration} binc ${increment}`;
  }
  return output;
};

export const formatMoveString = (history: Move[]): string =>
  history.reduce(
    (output, { from, to, promotion }) =>
      `${output} ${from}${to}${promotion ?? ''}`,
    '',
  );
