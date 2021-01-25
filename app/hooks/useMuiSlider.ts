import type { ChangeEvent } from 'react';
import { useState } from 'react';

export const useMuiSlider = (initialValue: number) => {
  const [value, setValue] = useState(initialValue);

  /** Handle changes on the slider. */
  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (_event: ChangeEvent<{}>, value: number | number[]) =>
    setValue(value as number);

  return [value, handleChange] as const;
};
