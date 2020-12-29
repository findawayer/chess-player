# Developer notes

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

## Nexus

Nexus allows us to:

- Use JavasScript/TypeScript to build GraphQL schema and resolve logic.
- Place schema and related resolvers in the same file.
- Auto-generate typeDefs and GraphQL schema files.
- `nexus-plugin-prisma` provides lots of automated query builder templates.
  - CRUD guide: https://www.prisma.io/docs/concepts/components/prisma-client/crud#findunique
  - Example: https://github.com/prisma/prisma-examples/blob/latest/typescript/graphql-apollo-server/src/schema.ts

Read more about Nexus on:

- [Official documentation](https://nexusjs.org/docs/)
- [Using Prisma with Nexus](https://www.prisma.io/docs/guides/upgrade-guides/upgrade-from-prisma-1/upgrading-nexus-prisma-to-nexus)

## Pitfalls

### Nexus and @nexus/schema have different APIs.

The suggested Nexus implementation differs from one example to another. I googled it out and got around to make it work. I recommend following instructions in the comments from the type definition files.

### Configure CORS as an option to ApolloServer constructor.

Using `cors` package as Express middleware does not have any effect for some reason. Use the `cors` option available in `ApolloServer` instance.

```js
const app = express();
const server = new ApolloServer();

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: "http://localhost:3000",
  },
});
```
