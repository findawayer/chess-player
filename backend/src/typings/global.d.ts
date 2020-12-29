// Custom augmentations to global namespaces.
declare global {
  // Node.js
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production';
      APP_SECRET?: string;
      CLIENT_PORT?: number;
      SERVER_ENDPOINT?: string;
      SERVER_PORT?: number;
      MAIL_HOST?: string;
      MAIL_PORT?: number;
      MAIL_USERNAME?: string;
      MAIL_PASSWORD?: string;
      MAIL_SENDER?: string;
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
