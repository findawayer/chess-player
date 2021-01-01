/**
 * @overview
 * This script is used to patch module aliases to modules that are executed
 * in a non-next.js environment — such as `ts-node` or `ts-node-dev` — where `paths`
 * settings in tsconfig.json are not interpreted correctly.
 * issue: https://github.com/whitecolor/ts-node-dev/issues/95#issuecomment-549762100
 *
 * @example
 *   import '../../moduleAlias';   // Import this first
 *   import '~/server/utils';      // Then the aliases work!
 */

import moduleAlias from 'module-alias';
import path from 'path';

moduleAlias.addAliases({
  '~': path.resolve(process.cwd(), 'src'),
});
