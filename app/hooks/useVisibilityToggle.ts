import type { MouseEvent } from 'react';
import { useState } from 'react';

// State keys (array of strings)
type StateKeys = readonly string[];

// Extract items in an array as union.
type ArrayElement<E> = E extends readonly (infer T)[] ? T : never;

/**
 * Create visibility state out of the state keys provided.
 * input: ['password', 'confirmPassword']
 * output: { password: false, confirmPassword: false }
 */
const initializeState = <Keys extends StateKeys>(keys: Keys) =>
  keys.reduce((state, key) => {
    state[key as ArrayElement<Keys>] = false;
    return state;
  }, {} as Record<ArrayElement<Keys>, boolean>);

/**
 * Abstracts visibility state of React components, and dispose the state
 * along with some manipulation methods. Designed to work with password field
 * visibility toggler, but can be used for anything similar.
 */
export const useVisibilityToggle = <Keys extends StateKeys>(keys: Keys) => {
  const [visibility, setVisibility] = useState(initializeState(keys));

  /**
   * Handler for toggling visibility with button.
   * @example
   *  <input type={visibility.password ? 'text' : 'password'} />
   *  <button onClick={handleVisibility('confirmPassword')}>Toggle password</button>
   */
  const handleVisibilityChange = (key: ArrayElement<Keys>) => () =>
    setVisibility(previousVisibility => ({
      ...previousVisibility,
      [key]: !previousVisibility[key],
    }));
  /**
   * Mimics prevent default on `onMouseDown` handler.
   * https://material-ui.com/components/text-fields/#text-field
   */
  const preventMouseDown = (event: MouseEvent<HTMLButtonElement>) =>
    event.preventDefault();
  /** Clear fields and reset state. */
  const resetVisibility = () => setVisibility(initializeState(keys));

  return {
    visibility,
    handleVisibilityChange,
    preventMouseDown,
    resetVisibility,
  };
};
