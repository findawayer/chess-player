# [chess-player](https://chess-player.vercel.app/) &middot; <img src="https://img.shields.io/badge/React-Practice-blue" alt="React Practice">

Chess Player is an implementation of [chess game](https://en.wikipedia.org/wiki/Chess) in web browser. It is designed to be played by a human against a built-in AI, or to visualize a game simulation by two AIs.

<table>
  <tbody>
    <tr>
      <td>
        <img src="./assets/chess-player-preview-1.png" alt="chess-player-preview" width="250" />
      </td>
      <td>
        <img src="./assets/chess-player-preview-2.png" alt="" width="250" />
      </td>
    </tr>
  </tbody>
</table>

The app utilizes [Stockfish](https://github.com/official-stockfish/Stockfish) engine as move generator and evaluator.

## Live demo

Please visit [demo page](https://chess-player.vercel.app/) to visualize chess-player's operation.

## Installation

```
$ git clone https://github.com/findawayer/chess-player.git
$ cd chess-player
$ npm install
$ npm run start
```

## Tools

### Authoring

- [TypeScript](https://github.com/microsoft/TypeScript) as Authoring language.
- [Babel](https://github.com/babel/babel) as Code transpiler.
- [Eslint](https://github.com/eslint/eslint) as Code linter.
- [Prettier](https://github.com/prettier/prettier) as Code formatter.

### Frontend

- [React](https://github.com/facebook/react) as Frontend framework.
- [Apollo Client](https://github.com/apollographql/apollo-client) as Frontend GraphQL framework.
- [Next.js](https://github.com/vercel/next.js/) as React framework.
- [Redux](https://github.com/reduxjs/redux) as React state manager.
- [Redux Toolkit](https://github.com/reduxjs/redux-toolkit) as Redux authoring template.
- [React Redux](https://github.com/reduxjs/react-redux) as Redux binder to React.
- [Material UI](https://github.com/mui-org/material-ui) as Design framework.
- [Chess.js](https://github.com/jhlywa/chess.js) as Chess move validator.
- [Stockfish-js](https://github.com/exoticorn/stockfish-js) as Chess move generator &amp; evaluator.
- [React DnD](https://github.com/react-dnd/react-dnd) as Drag-and-drop helper.

### Backend

- [PostgreSQL](https://www.postgresql.org/) as Database provider.
- [Express](https://github.com/expressjs/express) as Server framework.
- [GraphQL](https://github.com/graphql) as Database query interface.
- [Apollo-server-express](https://www.npmjs.com/package/apollo-server-express) as Express-GraphQL server framework.
- [Prisma](https://github.com/prisma/prisma) as GraphQL database interface.
- [Nexus](https://github.com/graphql-nexus/nexus) as GraphQL schema generator.
- [W3Tec Microframework](https://www.npmjs.com/package/microframework-w3tec) for Node.js framework.

## Structure

```
📦chess-player
 ┣ 📂.vscode ── VS Code editor specific setup
 ┣ 📂docs ── READMEs and related assets
 ┣ 📂public ── Static files
 ┃ ┣ 📂graphics ── Chess piece vector graphics
 ┃ ┗ 📂stockfish ── Chess engine library
 ┣ 📂src ── Source code
 ┃ ┣ 📂components ── React components: presentational
 ┃ ┣ 📂containers ── React components: with Redux data bindings
 ┃ ┣ 📂contexts ── React contexts
 ┃ ┣ 📂helpers ── Utility functions
 ┃ ┣ 📂hooks ── React hooks
 ┃ ┣ 📂pages ── Next.js pages
 ┃ ┃ ┗ 📜_app.tsx ── Client side markup
 ┃ ┃ ┗ 📜_document.tsx ── Server side markup
 ┃ ┣ 📂prisma ── Database schema
 ┃ ┣ 📂schema ── Database schema
 ┃ ┣ 📂server ── Backend resources
 ┃ ┣ 📂settings ── App configuration constants
 ┃ ┣ 📂slices ── Redux Toolkit slices & Redux state schema
 ┃ ┣ 📂types ── Shared type definitions
 ┃ ┗ 📂vendors ── Library specific resources
 ┃ ┃ ┣ 📂material-ui ── Material UI themes
 ┃ ┃ ┣ 📂react-dnd ── React-Dnd setup
 ┃ ┃ ┗ 📂redux ── Redux store & reducers
```

## Next to come

Features under development or planned for future.

- Visualization of move evaluations.
- CLI for move submissions.

## Browser compatibility

<!-- prettier-ignore-start -->
| ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)
--- | --- | --- |
Latest ✅ | Latest ✅ | Latest ✅
<!-- prettier-ignore-end -->

The app makes use of Web Worker API available in modern browsers, check out [the compatibility chart](https://caniuse.com/webworkers).

## Special credits

- [Jeff Hlywa](https://github.com/jhlywa/chess.js) &mdash; Author of game validator `chess.js`.
- [Stockfish](https://github.com/official-stockfish) &mdash; Stockfish chess engine developer team.
- [Colin M.L.Burnett](https://en.wikipedia.org/wiki/User:Cburnett) &mdash; Designer of chess piece graphics.
