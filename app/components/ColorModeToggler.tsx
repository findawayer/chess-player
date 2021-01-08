/* eslint-disable jsx-a11y/label-has-associated-control */
import { Switch, Tooltip } from '@material-ui/core';
import React from 'react';

import { useColorModeApi } from '~app/hooks';

const ColorModeToggler: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorModeApi();

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
