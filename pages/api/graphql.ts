import { NextApiHandler } from 'next';
import { createServer } from '~server/apollo-server';

// Next.js API route config
// https://nextjs.org/docs/api-routes/api-middlewares
export const config = {
  api: {
    bodyParser: false,
  },
};

let handler: NextApiHandler;

const apiHandler: NextApiHandler = async (req, res) => {
  if (handler) {
    return handler(req, res);
  }

  const apolloServer = await createServer();
  handler = apolloServer.createHandler({ path: '/api/graphql' });

  return handler(req, res);
};

export default apiHandler;
