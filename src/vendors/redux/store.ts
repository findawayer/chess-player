import { useMemo } from 'react';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';

import environment from '~/environment';
import { ChessState } from '~/slices/chess';
import { rootReducer } from './reducers';

/** Redux state */
export interface AppState {
  chess: ChessState;
}

/** Redux store */
export type AppStore = EnhancedStore<AppState>;

/** Redux dispatch */
export type AppDispatch = EnhancedStore<AppState>['dispatch'];

/** Create Redux store (redux-toolkit style) */
const initializeStore = (preloadedState?: Record<string, unknown>): AppStore =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: environment.isDevelopment,
  });

/** Dynamically create Redux store */
export const useStore = (): AppStore => {
  const store = useMemo(() => initializeStore(), []);
  return store;
};
