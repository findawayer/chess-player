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

moduleAlias.addAliases({
  '~': path.resolve(process.cwd(), 'src'),
});
