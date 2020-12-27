import dotenv from 'dotenv';
import path from 'path';

// Set environmtal variables from .env file.
dotenv.config({ path: path.join(process.cwd(), '.env') });

// Create a environmental reference object for server-side.
const createEnvironment = () => {
  // Fallback empty value to developement for safety.
  const nodeEnv = process.env.NODE_ENV || ('development' as const);
  const isDevelopment = nodeEnv === 'development';
  const isProduction = nodeEnv === 'production';

  return {
    nodeEnv,
    isDevelopment,
    isProduction,
    app: {
      secret: process.env.APP_SECRET,
    },
    client: {
      port: process.env.CLIENT_PORT,
      endpoint: isDevelopment
        ? `http://localhost:${process.env.CLIENT_PORT}`
        : process.env.CLIENT_ENDPOINT,
    },
    server: {
      port: process.env.SERVER_PORT,
      endpoint: isDevelopment
        ? `http://localhost:${process.env.SERVER_PORT}`
        : process.env.SERVER_ENDPOINT,
    },
    mail: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      username: process.env.MAIL_USERNAME,
      password: process.env.MAIL_PASSWORD,
      sender: process.env.MAIL_SENDER,
    },
    graphql: {
      route: '/graphql',
    },
  };
};

export default createEnvironment();
