import { combineReducers } from '@reduxjs/toolkit';

import { chessReducer } from '~/features/chess/slice';

/* Root reducer. Define a top-level state field named {key}, handled by `{value}`. */
export const rootReducer = combineReducers({
  chess: chessReducer,
});
