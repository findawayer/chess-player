# Developer notes

## Authoring conventions

### Module aliases

- Use module aliases for import statements. (e.g. `import logger from '~/devtools/logger'`)
- The aliases are declared in `tsconfig.json`, under `paths` property.
- Use function components and hooks over class components whenever possible.

### Comments

- Use block comment to describe a value, or leave a multiline note. This way, VSCode is able to show the comment in tooltips.
- Use inline comment to describe an action, or leave an inline note.

## React

### State management

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

### Others

- Use React context API to:
  - make an external instance globally accessible throughout the app,
  - or to provide data only to a limited part of app.
- Create custom hooks to group multiple related states into one unit.# What did I learn?

## Pitfalls

### Avoid use of `.env` file for client side.

[Issue](https://github.com/motdotla/dotenv/issues/233). Reading environmental setup from `.env` file with `dotenv` library requires the Node.js `fs` module in the context, which is absent in client side. Just use a regular JS/TS code to provide custom variables.

### Keep in mind that MUI spawns thousands of style tags synchronosly.

[Issue](https://github.com/mui-org/material-ui/issues/16543). When Material UI theme is customized extensively through `makeStyles`, the framework inject new `style` tags synchronously, causing DOM thrashing. There is no way around for these JSS to be extracted as a seperate CSS file, either.

Conclusion:

- Material UI does not seem best fit for custom modular CSS on top of it.
- Avoid too much customizations to the default styles.
- Consider using a seperate styling system besides — such as `styled-components` — as the app grows.

### Fetching theme from client storage causes FOUC, in a SSR based project.

User preferences on the application might best be stored in a database or a web storage, to keep it constant between sessions or refreshes. However, combining a SSR system with state persisted in client storages will cause the render output mismatch at the moment of re-hydration.

Conclusion:

- If possible, store user preferences in a database.
- [A workaround](https://brianlovin.com/overthought/adding-dark-mode-with-next-js) exists: hiding the content body with `visibility: hidden` wrapper to avoid in-between SSR flashes.

### Redux store should be dynamically created, in a SSR project.

Creating a static instance and importing it can bring issues during the server-side rendering phase, as Web APIs are not available in the backend. However, [the store is re-initialized on every server request](https://github.com/vercel/next.js/tree/canary/examples/with-redux), while client-side uses the same store all the time. This can be the reason why a hard refresh of the browser often causes rendering mismatch between both ends.

### Shortening MUI component imports with babel plugin does not work with methods.

We are using `babel-plugin-import` reduce verbose import syntax of Material UI components. However, as of current version (4.11.2), importing anything else than the components (e.g. `makeStyles`, `ThemeOptions`, ...) does not get correctly resolved.
