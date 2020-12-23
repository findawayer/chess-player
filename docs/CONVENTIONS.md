# Authoring conventions

## Module aliases

- Use module aliases for import statements. (e.g. `import Layout from '@/components/layout'`) The aliases are declared in `tsconfig.json`.
- Use function components and hooks over class components whenever possible.

## React state management

- Store React state into:
  - Local state: Short-term state that changes rapidly, or evaporates after page navigations.
  - Redux store: Mid-term state that persists between page navigations.
  - Local state + Localstorage: State that need to be preserved between refreshes.
- Fetch Redux state from a top-level organism components &mdash; or `containers` &mdash;
  and pass it down 1~2 levels into the child components via props. Think about introducing
  a new container beyond that level.
- Callbacks are generally created inside a container and passed down to child components via props,
  however, feel free to `useDispatch` inside the components if it becomes verbose and inefficient.
  React official docs [encourages using dispatch stored inside contexts from a component](https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down).

## React context API

- Use React context API to:
  - make an external instance globally accessible throughout the app,
  - or to provide data only to a limited part of app.

## React hooks

- Create custom hooks to group multiple related states into one unit.

## Comments

- Use block comment to describe a value, or leave a multiline note. This way, VSCode is able to show the comment in tooltips.
- Use inline comment to describe an action, or leave an inline note.
