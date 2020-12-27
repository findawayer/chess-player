# Authoring conventions

## Module aliases

- Use module aliases for import statements. (e.g. `import logger from '~/devtools/logger'`)
- The aliases are declared in `tsconfig.json`, under `paths` property.
- Use function components and hooks over class components whenever possible.

## Comments

- Use block comment to describe a value, or leave a multiline note. This way, VSCode is able to show the comment in tooltips.
- Use inline comment to describe an action, or leave an inline note.

# Frontend

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

- Create custom hooks to group multiple related states into one unit.# What did I learn?

## Pitfalls

### Avoid use of `.env` file for client side.

[Issue](https://github.com/motdotla/dotenv/issues/233). Reading environmental setup from `.env` file with `dotenv` library requires the Node.js `fs` module in the context, which is absent in client side. Just use a regular JS/TS code to provide custom variables.

### Nothing can stop MUI from spawning thousands of style tags.

[Issue](https://github.com/mui-org/material-ui/issues/16543). Every single usage of `makeStyles` to have all style declarations split, seems to inject new `style` tags synchronously; and a lot of them end up empty. There is no way around for these JSS to be extracted as a seperate CSS file, as of currently.

Conclusion:

- Material UI does not seem best fit for custom modular CSS on top of it.
- Avoid too much customizations to the default styles.
- If necessary, think about writing seperate CSS in parallel.

### Fetching theme from client storage causes FOUC, in a SSR based project.

User preferences on the application might best be stored in a database or a web storage, to keep it constant between sessions or refreshes. However, combining a SSR system with state persisted in client storages will cause the render output mismatch at the moment of re-hydration.

Conclusion:

- If possible, store user preferences in a database.
- [A workaround](https://brianlovin.com/overthought/adding-dark-mode-with-next-js) exists: hiding the content body with `visibility: hidden` wrapper to avoid in-between SSR flashes.

### Redux store should be dynamically created, in a SSR project.

Creating a static instance and importing it can bring issues during the server-side rendering phase, as Web APIs are not available in the backend. However, [the store is re-initialized on every server request](https://github.com/vercel/next.js/tree/canary/examples/with-redux), while client-side uses the same store all the time. This can be the reason why a hard refresh of the browser often causes rendering mismatch between both ends.

### Shortening MUI component imports with babel plugin does not work with methods.

We are using `babel-plugin-import` reduce verbose import syntax of Material UI components. However, as of current version (4.11.2), importing anything else than the components (e.g. `makeStyles`, `ThemeOptions`, ...) does not get correctly resolved.

# Backend

## Using Prisma 2

<img src="https://i.imgur.com/FensWfo.png" width="500" />

Terminology first:

- Prisma client: The GraphQL query builder, provided by `@prisma/client` package.
- Prisma schema: The data model built with Prisma syntax. (See: `prisma/schema.prisma`)
- Database: For the current project, refers to the remote DB provided by AWS RDS.

Some CLI commands are available:

- `prisma migrate dev`: Create pending DB tables creation query using Prisma schema.
- `prisma migrate reset`: Remove all pending migrations.
- `prisma migrate deploy`: Push pending migrations to the database.
- `prisma migrate status`: Check the push status of database migrations.
- `prisma migrate resolve`: Resolve issues such as migration failure, hotfix, etc.
- `prisma generate`: Reflect changes from Prisma schema to the Prisma client.
- `npx prisma introspect`: Experimental. This ensures Prisma schema and DB schema match.
- `npx prisma studio`: Database console. The schema should match with that of Prisma.

Order of Prisma commands:

- `yarn prisma init`
- `yarn prisma migrate dev`
- `yarn prisma migrate deploy`
- `yarn generate`

## Using Nexus

Nexus allows devs to:

- Use JavasScript/TypeScript to build GraphQL schema and resolve logic.
- Place schema and related resolvers in the same file.
- Auto-generate typeDefs and GraphQL schema files.
- `nexus-plugin-prisma` provides lots of automated query builder templates.
  - CRUD guide: https://www.prisma.io/docs/concepts/components/prisma-client/crud#findunique
  - Example: https://github.com/prisma/prisma-examples/blob/latest/typescript/graphql-apollo-server/src/schema.ts
- One weird thing is that we don't need `async/await` in Nexus query definitions.
  I have googled out but did not find why yet. shhhh

## References

Both Prisma and Nexus don't seem to be mature enough yet for steady production. However, boots the productivity by a huuuuuge degree. Thats' why I gave it a shot in this personal practice project.

- Prisma 2: https://www.prisma.io/docs/concepts/overview/what-is-prisma/
- Nexus with Prisma: https://www.prisma.io/docs/guides/upgrade-guides/upgrade-from-prisma-1/upgrading-nexus-prisma-to-nexus

Note that `nexus` and `@nexus/schema` packages have same purpose but different APIs. Follow instructions provided by the IDE and the package's type definitions, rather than relying on official Next.js docs.
