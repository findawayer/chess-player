import { ColorMode } from '@prisma/client';
import { createContext } from 'react';
import { DEFAULT_COLOR_MODE } from '~app/hooks';

type ColorModeContextType = {
  colorMode: ColorMode;
  toggleColorMode(): void;
};

export const ColorModeContext = createContext<ColorModeContextType>({
  colorMode: DEFAULT_COLOR_MODE,
  toggleColorMode: () => null,
});

export const ColorModeProvider = ColorModeContext.Provider;
