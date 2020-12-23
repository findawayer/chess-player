# What did I learn?

> That I have a son. — A.C. Jacob

## Nothing can stop MUI from spawning thousands of style tags.

[Issue](https://github.com/mui-org/material-ui/issues/16543). Every single usage of `makeStyles` to have all style declarations split, seems to inject new `style` tags synchronously; and a lot of them end up empty. There is no way around for these JSS to be extracted as a seperate CSS file, as of currently.

Conclusion:

- Material UI does not seem best fit for custom modular CSS on top of it.
- Avoid too much customizations to the default styles.
- If necessary, think about writing seperate CSS in parallel.

## Fetching theme from client storage causes FOUC, in a SSR based project.

User preferences on the application might best be stored in a database or a web storage, to keep it constant between sessions or refreshes. However, combining a SSR system with state persisted in client storages will cause the render output mismatch at the moment of re-hydration.

Conclusion:

- If possible, store user preferences in a database.
- [A workaround](https://brianlovin.com/overthought/adding-dark-mode-with-next-js) exists: hiding the content body with `visibility: hidden` wrapper to avoid in-between SSR flashes.

## Redux store should be dynamically created, in a SSR project.

Creating a static instance and importing it can bring issues during the server-side rendering phase, as Web APIs are not available in the backend. However, [the store is re-initialized on every server request](https://github.com/vercel/next.js/tree/canary/examples/with-redux), while client-side uses the same store all the time. This can be the reason why a hard refresh of the browser often causes rendering mismatch between both ends.

## Shortening MUI component imports with babel plugin does not work with methods.

We are using `babel-plugin-import` reduce verbose import syntax of Material UI components. However, as of current version (4.11.2), importing anything else than the components (e.g. `makeStyles`, `ThemeOptions`, ...) does not get correctly resolved.
