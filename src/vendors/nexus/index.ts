import { makeSchema, declarativeWrappingPlugin } from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma';
import path from 'path';
import * as types from './schema';

/**
 * Create GraphQL schema & type definitions with `Nexus.js`.
 * The official Prisma 2 docs on Nexus integration is not up-to-date.
 * Please follow the example implementation on:
 * https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-apollo-server
 */
export const schema = makeSchema({
  // GraphQL types to generate GraphQL schema.
  types,
  // Path where the generated type definitions & GraphQL schema should be placed.
  // TODO: changing path to `.generated/...` loses type references in `./nexus/*.ts`.
  // Find a correct configuration of `tsconfig.json`.
  outputs: {
    schema: path.resolve(
      process.cwd(),
      'src/vendors/nexus/generated/schema.graphql',
    ),
    typegen: path.resolve(
      process.cwd(),
      'src/vendors/nexus/generated/nexus.ts',
    ),
  },
  // Integrate prisma into nexus, with some CRUD helpers bundled in.
  // TypeScript complains incompatibility for some reason,
  plugins: [
    declarativeWrappingPlugin(),
    nexusPrisma({ experimentalCRUD: true }),
  ],
  // Connect context type definition with nexus schema.
  contextType: {
    // This file contains the type definition of `Context`
    module: path.resolve(process.cwd(), 'src/vendors/apollo-server/index.ts'),
    // Name of the export.
    export: 'Context',
  },
  // Configure automatic type resolution for the TS representations of the associated types
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});