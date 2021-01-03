export const userPrefersDarkMode = (): boolean =>
  window.matchMedia('(prefers-color-scheme: dark)').matches;
