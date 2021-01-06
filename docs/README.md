# [chess-player](https://chess-player.vercel.app/) &middot; <img src="https://img.shields.io/badge/React-Practice-blue" alt="React Practice">

Chess Player is an implementation of [chess game](https://en.wikipedia.org/wiki/Chess) in web browser. It is designed to be played by a human against a built-in AI, or to visualize a game simulation by two AIs.

<table>
  <tbody>
    <tr>
      <td>
        <img src="./assets/chess-player-preview-1.png" alt="Chess Player preview" width="250" style="vertical-align: top;" />
      </td>
      <td>
        <img src="./assets/chess-player-preview-2.png" alt="" width="250" style="vertical-align: top;" />
      </td>
    </tr>
  </tbody>
</table>

## Installation

```
$ git clone https://github.com/findawayer/chess-player.git
$ cd chess-player
$ yarn install
$ yarn build
$ yarn start
```

Requires:

- Node.js installed on your machine.
- A PostgreSQL database.
- Environment variables; see `.env.example` for references.

## Tools

### Authoring

- [TypeScript](https://github.com/microsoft/TypeScript) as Authoring language.
- [Babel](https://github.com/babel/babel) as Code transpiler.
- [Eslint](https://github.com/eslint/eslint) as Code linter.
- [Prettier](https://github.com/prettier/prettier) as Code formatter.

### Frontend

- [React](https://github.com/facebook/react) as Frontend framework.
- [Next.js](https://github.com/vercel/next.js/) as React framework.
- [Apollo Client](https://github.com/apollographql/apollo-client) as GraphQL client framework.
- [Redux](https://github.com/reduxjs/redux) as React state manager (uses [Redux Toolkit](https://github.com/reduxjs/redux-toolkit))
- [React Redux](https://github.com/reduxjs/react-redux) as Redux binder to React.
- [Material UI](https://github.com/mui-org/material-ui) as Design framework.
- [Chess.js](https://github.com/jhlywa/chess.js) as Chess move validator.
- [Stockfish-js](https://github.com/exoticorn/stockfish-js) as Chess move generator &amp; evaluator.
- [React DnD](https://github.com/react-dnd/react-dnd) as Drag-and-drop helper.

### Backend

- [Apollo-server-micro](https://github.com/apollographql/apollo-server) as GraphQL server framework.
- [PostgreSQL](https://www.postgresql.org/) as Database provider.
- [GraphQL](https://github.com/graphql) as Database query language.
- [Prisma](https://github.com/prisma/prisma) as GraphQL database framework.
- [TypeGraphQL](https://github.com/MichalLytek/type-graphql) as GraphQL schema framework.

### Testing

- [Jest](https://github.com/facebook/jest) as Unit testing solution.
- [Testing library](https://testing-library.com/) as Unit testing helper.

### Others

- [Chess piece graphics](https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces) by Colin M.L.Burnett

## Structure

<pre>
📦chess-player
 ┣ 📂.vscode — VS Code editor specific setup
 ┣ 📂app — App's source code besides the server
 ┃ ┣ 📂__tests__ — Unit testing codes
 ┃ ┣ 📂components — Shared React components
 ┃ ┣ 📂contexts — Shared React contexts
 ┃ ┣ 📂features — Per-feature subresources
 ┃ ┃ ┣ 📂account — User authentication
 ┃ ┃ ┣ 📂admin — Admin interface
 ┃ ┃ ┣ 📂chess — Chess game
 ┃ ┣ 📂graphql — GraphQL queries and related type definitions
 ┃ ┣ 📂hooks — Shared React hooks
 ┃ ┣ 📂themes — Material UI theme customizations
 ┃ ┣ 📂utils — Functions shared across project
 ┃ ┣ 📂vendors — Additional external library settings
 ┃ ┃ ┣ 📜apollo-client.ts — Apollo client setup
 ┃ ┃ ┗ 📜redux.ts — Redux setup
 ┣ 📂docs — Documentations
 ┣ 📂pages — Next.js pages
 ┃ ┗ 📂api
 ┃   ┗ 📜graphql.ts — GraphQL server endpoint
 ┣ 📂prisma — Data model with Prisma 2
 ┣ 📂public — Static files
 ┃ ┣ 📂graphics — Chess piece vector graphics
 ┃ ┗ 📂stockfish — Chess engine library
 ┣ 📂server — Source code
 ┃ ┣ 📂decorators — Custom decorators for TypeGraphQL
 ┃ ┣ 📂guards — Backend guard clauses
 ┃ ┣ 📂interface — Frequently used interfaces in backend
 ┃ ┣ 📂mailing — Mailing service
 ┃ ┣ 📂schemas — GraphQL schemas and resolvers with TypeGraphQL
 ┃ ┗ 📂utils — Functions shared within backend
 ┗ 📜global.d.ts — Global types accessible across project
</pre>

## Next to come

Features under development or planned for future.

- Member-specific features.
- Visualization of move evaluations.
- CLI for move submissions.

## Browser compatibility

<!-- prettier-ignore-start -->
| ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)
--- | --- | --- |
Latest ✅ | Latest ✅ | Latest ✅
<!-- prettier-ignore-end -->

The app makes use of Web Worker API available in modern browsers, check out [the compatibility chart](https://caniuse.com/webworkers).
