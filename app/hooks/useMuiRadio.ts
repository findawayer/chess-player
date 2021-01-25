import type { ChangeEvent } from 'react';
import { useState } from 'react';

export const useMuiRadio = <T extends string>(initialValue: T) => {
  const [value, setValue] = useState(initialValue);

  /** Handle changes on the slider. */
  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value as T);

  return [value, handleChange] as const;
};
