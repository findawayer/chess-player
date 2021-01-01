import { Switch, Tooltip } from '@material-ui/core';
import React from 'react';

interface ColorModeTogglerProps {
  isDarkMode: boolean;
  toggleColorMode(): void;
}

const ColorModeToggler: React.FC<ColorModeTogglerProps> = ({
  isDarkMode,
  toggleColorMode,
}) => {
  return (
    <span>
      <span>Light</span>
      <Tooltip title="Toggle theme">
        <Switch
          checked={isDarkMode}
          color="default"
          onChange={toggleColorMode}
        />
      </Tooltip>
      <span>Dark</span>
    </span>
  );
};

export default ColorModeToggler;
