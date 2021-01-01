import update from 'immutability-helper';
import React, { useState } from 'react';

const initializeState = <K extends string, V extends unknown>(
  keys: K[],
  value: V,
): Record<K, V> =>
  keys.reduce((state, key) => {
    state[key] = value;
    return state;
  }, {} as Record<K, V>);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const usePasswordFields = (keys: string[]) => {
  const [fields, setFields] = useState(initializeState(keys, ''));
  const [visibility, setVisibility] = useState(initializeState(keys, false));

  /** Handler for input change */
  const handleChange = (key: keyof typeof fields) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) =>
    setFields(previousFields =>
      update(previousFields, {
        [key]: { $set: event.target.value },
      }),
    );
  /** Handler for toggling password value. */
  const handleVisibilityChange = (key: keyof typeof fields) => () =>
    setVisibility(previousVisibility =>
      update(previousVisibility, {
        [key]: { $apply: (checked: boolean) => !checked },
      }),
    );
  /** Prevent native click action on password toggler button. */
  const handleTogglerClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    event.preventDefault();

  return {
    fields,
    visibility,
    handlePasswordChange: handleChange,
    handleVisibilityChange,
    handleTogglerClick,
  } as const;
};
