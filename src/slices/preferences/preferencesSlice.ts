import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ColorMode } from '@types';
import {
  initializePreferences,
  PreferencesState,
} from './preferencesInitializer';

export enum PreferencesActionType {
  FlipColorMode = 'flipColorMode',
  UpdateGameSettings = 'updateGameSettings',
}

// Slice reducer named `preferences`
const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: initializePreferences(),
  reducers: {
    [PreferencesActionType.FlipColorMode]: preferences => {
      preferences.colorMode =
        preferences.colorMode === ColorMode.Dark
          ? ColorMode.Light
          : ColorMode.Dark;
    },
    [PreferencesActionType.UpdateGameSettings]: (
      preferences,
      action: PayloadAction<Partial<PreferencesState>, PreferencesActionType>,
    ) => {
      Object.assign(preferences, action.payload);
    },
  },
});

const { actions, reducer } = preferencesSlice;

export const { flipColorMode, updateGameSettings } = actions;
export { reducer as preferencesReducer };
