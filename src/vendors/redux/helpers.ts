/* Retrieve app's previous state cached in `localStorage` */
export const getPersistedState = (): Record<string, unknown> | undefined => {
  // Wrap with try/catch to make sure the user's privacy settings
  // allow the use of `localStorage`.
  try {
    const serializedState = localStorage.getItem('appState');
    if (serializedState === null) {
      return undefined; // Let the reducers initialize the state.
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

/* Save app's current state in `localStorage` and return success/error state as boolean. */
export const persistState = (state: Record<string, unknown>): boolean => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('appState', serializedState);
    return true;
  } catch (error) {
    // Omit throwing error.
    return false;
  }
};
