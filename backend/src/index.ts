import dotenv from 'dotenv';
import path from 'path';
// Load aliases map BEFORE local imports
// and aliased imports will be correctly resolved.
import './helpers/module-alias';
import init from './server/init';

// Load environment variables
// (In production build, Vercel will take care of those variables.)
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
}

// Initialize the server
init();
