import throttle from 'lodash/throttle';
import { configureStore } from '@reduxjs/toolkit';

import { ChessState } from '@slices/chess';
import { PreferencesState } from '@slices/preferences';
import { getPersistedState, persistState } from './helpers';
import { rootReducer } from './reducers';

/**
 * Redux store (created via redux-toolkit)
 * TODO: https://github.com/manaflair/redux-batch as enhancers? maybe?
 */
const store = configureStore({
  reducer: rootReducer,
  preloadedState: getPersistedState(),
  devTools: process.env.NODE_ENV === 'development',
});

// Save `preferences` portion of the app state into user's localStorage.
store.subscribe(
  throttle(() => {
    const state = store.getState();
    persistState({
      preferences: state.preferences,
    });
  }, 1000),
);

/* The app's wholesome state */
export interface AppState {
  chess: ChessState;
  preferences: PreferencesState;
}

/* The app's dispatch methods */
export type AppDispatch = typeof store.dispatch;

export default store;
