## 0.1.0 (2020-12-21)

- First beta build.

## 0.2.0 (2020-12-23)

### Features

- Setup navigation progress bar with `NProgress`.
- Drop Material UI components from `<ErrorBoundary />`.

### Architecture

- Setup SSR with `next.js`.
- With SSR introduced, preloaded state from user's `localStorage` causes
  state mismatch between server and client. All persisted state (preferences slice)
  are moved from Redux store to local state.
- Drop existing webpack configuration and use `next.js` default setups.

### DX

- Change module alias symbol from `@` to `@/` to distinguish from Node modules.
- Reduce module alias authoring point to `tsconfig.json` only.
  Create eslint module alias map dynamically out of the TypeScript config.
- Reduce syntax of Material UI import statements with `babel-plugin-import` which
  provides better tree-shaking algorithm than the bundler.
- Setup eslint for JavaScript files.

### Bug fix

- Reset the game turn on unmounting.

## 0.2.1 (2020-12-24)

### Bug fix

- Handle en passant moves on board.
- Double-check for illegal moves when a move is submitted.
