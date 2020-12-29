import path from 'path';

/** Resolve a module from project root directory  */
export const resolve = (subpath: string) =>
  path.resolve(process.cwd(), subpath);
