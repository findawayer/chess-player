import { combineReducers } from '@reduxjs/toolkit';

import { chessReducer } from '@slices/chess';
import { preferencesReducer } from '@slices/preferences';

/* Root reducer. Define a top-level state field named {key}, handled by `{value}`. */
export const rootReducer = combineReducers({
  chess: chessReducer,
  preferences: preferencesReducer,
});
