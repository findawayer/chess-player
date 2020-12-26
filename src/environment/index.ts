import dotenv from 'dotenv';
import path from 'path';

interface Environment {
  node: 'development' | 'production';
  isDevelopment: boolean;
  isProduction: boolean;
  web: {
    port: number;
    path: string;
  };
  server: {
    apolloKey: string;
    expressKey: string;
    contextKey: string;
    port: number;
    path: string;
  };
  graphql: {
    route: string;
  };
}

// Set environmtal variables from .env file.
dotenv.config({ path: path.join(process.cwd(), '.env') });

// Create a environmental reference object accesible from in both Node and browser.
const env: Environment = {
  // Fallback empty value to developement for safety.
  node: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  web: {
    port: process.env.CLIENT_PORT,
    path: `http://localhost:${process.env.CLIENT_PORT}`,
  },
  server: {
    apolloKey: 'apolloServer',
    expressKey: 'expressServer',
    contextKey: 'createContext',
    port: process.env.SERVER_PORT,
    path: `http://localhost:${process.env.SERVER_PORT}`,
  },
  graphql: {
    route: '/graphql',
  },
};

export default env;
