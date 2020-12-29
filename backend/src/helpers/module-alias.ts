/**
 * @overview
 * Load aliases map BEFORE local imports to let `ts-node-dev` package handle module aliases.
 * Import this script wherever you need to execute a node script but the module alias settings
 * in `tsconfig.json` cannot be respected.
 * issue: https://github.com/whitecolor/ts-node-dev/issues/95#issuecomment-549762100
 *
 * @example
 *   import '../../../moduleAlias';   // Import this first
 *   import '~/server/...';           // Then this alias works!
 */

import moduleAlias from 'module-alias';
import path from 'path';
// import tsConfig from '../../tsconfig.json';

/** Create a dynamic aliases map for `ts-node-dev` used for server side compilation. */
// const createAliasMap = () => {
//   const {
//     compilerOptions: { paths },
//   } = tsConfig;
//   return (
//     Object.keys(paths)
//       // Exclude paths ending with `/*`
//       .filter(key => !/\/\*$/.test(key))
//       // Format to comply with `module-alias` package's API.
//       .reduce((output, key) => {
//         const value = paths[key];
//         // Remove '/' at the end from the key.
//         const alias = key.replace(/\/$/, '');
//         // Resolve the path from the root directory.
//         const target = path.resolve(process.cwd(), value[0]);
//         output[alias] = target;
//         return output;
//       }, {})
//   );
// };

// moduleAlias.addAliases(createAliasMap());
moduleAlias.addAliases({
  '~': path.resolve(process.cwd(), 'src'),
});
