/* eslint-disable @typescript-eslint/no-explicit-any */

// ---------- Global augmentations ---------- //
declare global {
  // Node.js
  namespace NodeJS {
    interface ProcessEnv {
      // Node.js environment variables.
      NODE_ENV: 'development' | 'production';
      // Custom environment variables.
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

  /** Intended `any` type that bypasses eslint warnings. */
  type Unused = any; // Type of unused arguments; `never` cannot replace it in strict mode.
  type TODO = any; // Procrastination.
}

declare module 'react' {
  // This allows use of `data-testid` attribute in Material UI components.
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    'data-testid'?: string;
  }
}

// Treat this file as a module; required for global type augmentations.
export {};
