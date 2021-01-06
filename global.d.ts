/* eslint-disable @typescript-eslint/no-explicit-any */

// ---------- Global augmentations ---------- //
declare global {
  // Node.js
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      // `NEXT_PUBLIC_` prefixed variables are exposed to the browser.
      NEXT_PUBLIC_ENDPOINT: string;
      ACCESS_HASH_SECRET: string;
      DATABASE_URI: string;
      MAIL_HOST: string;
      MAIL_PORT: string;
      MAIL_USERNAME: string;
      MAIL_PASSWORD: string;
      MAIL_SENDER: string;
    }
  }

  /** Not-yet-defined `TODO` type that bypasses eslint warnings */
  type TODO = any;
  type Unused = any;
}

// Treat this file as a module; required for global type augmentations.
export {};