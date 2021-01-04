// Bootstrapped from: https://github.com/vercel/next.js/blob/canary/examples/with-apollo-and-redux/lib/redux.js
/* eslint-disable no-underscore-dangle */
import {
  combineReducers,
  configureStore,
  DeepPartial,
  EnhancedStore,
} from '@reduxjs/toolkit';
import { useMemo } from 'react';

import { chessReducer } from '~app/features/chess/slice';
import { ChessState } from '~app/features/chess/state';

/* Root reducer. Define a top-level state field named {key}, handled by `{value}`. */
export const rootReducer = combineReducers({
  chess: chessReducer,
});

/** Redux state */
export interface AppState {
  chess: ChessState;
}
/** Preloaded Redux state */
export type PreloadedState = DeepPartial<AppState>;
/** Redux store */
export type AppStore = EnhancedStore<AppState>;
/** Redux dispatch */
export type AppDispatch = EnhancedStore<AppState>['dispatch'];

// Cached store.
let store: AppStore;

const createStore = (preloadedState: PreloadedState): AppStore =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: process.env.NODE_ENV === 'development',
  });

/** Create Redux store (redux-toolkit style) */
export const initializeStore = (preloadedState?: PreloadedState): AppStore => {
  let _store = store ?? createStore(preloadedState);

  // After navigating to a page with an initial Redux state,
  // merge that state with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = createStore({ ...store.getState(), ...preloadedState });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

/** Dynamically create Redux store */
export const useStore = (initialState?: PreloadedState): AppStore => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};
