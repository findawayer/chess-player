/* eslint-disable jsx-a11y/label-has-associated-control */
import { Switch, Tooltip } from '@material-ui/core';
import React, { useContext } from 'react';

import { ColorModeContext } from '~app/contexts/ColorModeContext';

const ColorModeToggler: React.FC = () => {
  const { colorMode, toggleColorMode } = useContext(ColorModeContext);

  return (
    <label
      htmlFor="colorModeToggler"
      aria-label="Toggler color mode"
      data-testid="colorModeToggler"
      data-theme={colorMode}
    >
      <span>Light</span>
      <Tooltip title="Toggle theme">
        <Switch
          id="colorModeToggler"
          checked={colorMode === 'DARK'}
          color="default"
          onChange={toggleColorMode}
        />
      </Tooltip>
      <span>Dark</span>
    </label>
  );
};

export default ColorModeToggler;
