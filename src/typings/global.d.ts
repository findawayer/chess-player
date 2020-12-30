// Custom augmentations to global namespaces.
declare global {
  // Node.js
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production';
      APP_SECRET?: string;
      PORT?: number;
      ENDPOINT?: string;
      MAIL_HOST?: string;
      MAIL_PORT?: number;
      MAIL_USERNAME?: string;
      MAIL_PASSWORD?: string;
      MAIL_SENDER?: string;
    }
  }
  // Next.js
  interface NextApiRequest {
    userId?: string;
  }
}

// Treat this file as a module; required for global type augmentations.
export {};
