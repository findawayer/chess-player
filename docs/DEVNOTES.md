# Frontend

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

# Backend

## Database

Prisma 2 expects the DB to be provided by one of PostgreSQL/MySQL/SQLite/Microsoft SQL. We are using a **PostgreSQL** server by AWS RDS.

## Using [Prisma 2](https://www.prisma.io/)

Prisma 2 is our GraphQL query builder of choice. It consists of:

- **Prisma Client**: GraphQL query generator.
- **Prisma Migrate**: SQL query generator and. (Preview feature for early adaptors)
- **Prisma Studio**: Database console.

The `@prisma/cli` package disposes next commands:

- `prisma migrate dev --preview-feature`: Create pending DB tables creation query using Prisma schema.
- `prisma migrate reset --preview-feature`: Remove all pending migrations.
- `prisma migrate deploy`: Push pending migrations to the database.
- `prisma migrate status`: Check the push status of database migrations.
- `prisma migrate resolve`: Resolve issues such as migration failure, hotfix, etc.
- `prisma generate`: Reflect changes from Prisma schema to the Prisma client.
- `prisma introspect`: Experimental. This ensures Prisma schema and DB schema match.
- `prisma studio`: Database console. The schema should match with that of Prisma.

## TypeGraphQL

TypeGraphQL helps us to:

- Reduce development time in creating SDL schemas, by auto-generation from ORM classes written in TypeScript.
- Use TypeScript decorators for clean and simplistic syntax.
- Simplify user input validation and permission check process.

Read more about TypeGraphQL on the [official documentation](https://typegraphql.com/docs/introduction.html).

# Authoring conventions

## Module aliases

- The aliases are defined in `tsconfig.json` and `.eslintrc.js`.
- Use relative imports for siblings and decendant paths.
  - :heavy_check_mark: `import useStyles from './styles/Form';`
  - :x: `import useStyles from '~/features/account/styles/Form';`
- Avoid relative imports for antecedant paths.
  - :heavy_check_mark: `import useStyles from '~/features/chess/constants';`
  - :x: `import useStyles from '../constants';`

## Comments

- Use block comment to describe a value, or leave a multiline note. This way, VSCode is able to show the comment in tooltips.
- Use inline comment to describe an action, or leave an inline note.

## React

- Use function components and hooks over class components whenever possible.

# Pitfalls

## Avoid use of `.env` file for client side.

[Issue](https://github.com/motdotla/dotenv/issues/233). Reading environmental setup from `.env` file with `dotenv` library requires the Node.js `fs` module in the context, which is absent in client side. Just use a regular JS/TS code to provide custom variables.

## Don't overcustomize Material UI theme.

[Issue](https://github.com/mui-org/material-ui/issues/16543). Material UI injects lots of JSS synchronously, which is subject to potential DOM thrashing. Moreover, there is no way around to extract those styles as a seperate CSS file, either.

Conclusion:

- Material UI does not seem best fit for custom modular CSS on top of it.
- Avoid too much customizations.
- Consider using a seperate styling system besides — such as `styled-components` — as the app grows.

## Fetching theme from client storage causes FOUC, in a SSR based project.

User preferences on the application might best be stored in a database or a web storage, to keep it constant between sessions or refreshes. However, combining a SSR system with state persisted in client storages will cause the render output mismatch at the moment of re-hydration.

Conclusion:

- If possible, store user preferences in a database.
- [A workaround](https://brianlovin.com/overthought/adding-dark-mode-with-next-js) exists: hiding the content body with `visibility: hidden` wrapper to avoid in-between SSR flashes.
- Providing the initial color mode — fetched from the server — in `App.getInitialProps` prevents the flashing, however, it also blocks [automatic static optimization by next.js](https://github.com/vercel/next.js/blob/master/errors/opt-out-auto-static-optimization.md).

## Redux store should be dynamically created, in a SSR project.

Creating a static instance and importing it can bring issues during the server-side rendering phase, as Web APIs are not available in the backend. However, [the store is re-initialized on every server request](https://github.com/vercel/next.js/tree/canary/examples/with-redux), while client-side uses the same store all the time. This can be the reason why a hard refresh of the browser often causes rendering mismatch between both ends.

## Shortening MUI component imports with babel plugin does not work with methods.

We are using `babel-plugin-import` reduce verbose import syntax of Material UI components. However, as of current version (4.11.2), importing anything else than the components (e.g. `makeStyles`, `ThemeOptions`, ...) does not get correctly resolved.
