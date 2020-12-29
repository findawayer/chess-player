/* Retrieve app's previous state cached in `localStorage` */
export const getPersistedState = <T>(cacheKey: string): T | undefined => {
  // Wrap with try/catch to make sure the user's privacy settings
  // allow the use of `localStorage`.
  try {
    const serializedState = localStorage.getItem(cacheKey);
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    return undefined;
  }
};

/* Save app's current state in `localStorage` and return success/error state as boolean. */
export const persistState = <T>(state: T, cacheKey: string): boolean => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(cacheKey, serializedState);
    return true;
  } catch (error) {
    // Omit throwing error not to break rendering.
    return false;
  }
};
