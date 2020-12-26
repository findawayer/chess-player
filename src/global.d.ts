// Custom augmentations to global namespaces.
declare global {
  // Node.js
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production';
      CLIENT_PORT: number;
      SERVER_PORT: number;
    }
  }
  // Express
  namespace Express {
    interface Request {
      /** `userId` key is assigned when user is logged in. */
      userId?: string;
    }
  }
}

// Treat this file as a module; required for global type augmentations.
export {};
