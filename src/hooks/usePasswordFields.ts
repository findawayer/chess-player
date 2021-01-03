import update from 'immutability-helper';
import React, { useState } from 'react';

interface Options {
  keys: string[];
  onSubmit?(values: Record<string, string>): Promise<unknown>;
}

interface State {
  values: Record<string, string>;
  visibility: Record<string, boolean>;
}

const initializeState = (keys: string[]): State => {
  const values = {};
  const visibility = {};
  keys.forEach(key => {
    values[key] = '';
    visibility[key] = false;
  });
  return { values, visibility };
};

/**
 *
 * Todo: remove onsubmit, add only visibility control
 * @param param0
 */
export const usePasswordFields = (
  { keys, onSubmit }: Options = { keys: ['password'] },
) => {
  const [{ values, visibility }, setState] = useState(initializeState(keys));

  /** Handler for input change */
  const handlePasswordChange = (key: keyof typeof values) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) =>
    setState(previousState =>
      update(previousState, {
        values: {
          [key]: { $set: event.target.value },
        },
      }),
    );
  /** Handler for toggling password value. */
  const handleVisibilityChange = (key: keyof typeof values) => () =>
    setState(previousState =>
      update(previousState, {
        visibility: {
          [key]: { $apply: (checked: boolean) => !checked },
        },
      }),
    );
  /** Prevent native click action on password toggler button. */
  const handleTogglerClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    event.preventDefault();
  /** Prevent form submission and invoke `onSubmit` callback provided. */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Hijack form submission.
    event.preventDefault();
    if (onSubmit) onSubmit(values);
  };
  /** Clear fields and reset state. */
  const clearPasswords = () => setState(initializeState(keys));

  return {
    values,
    visibility,
    handlePasswordChange,
    handleVisibilityChange,
    handleTogglerClick,
    handleSubmit,
    clearPasswords,
  } as const;
};
