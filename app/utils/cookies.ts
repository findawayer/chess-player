import Cookies from 'universal-cookie';
import { NextPageContext } from 'next';

let clientHandler: Cookies;
let serverHandler: Cookies;

export const cookiesFromClient = () => {
  if (!clientHandler) {
    clientHandler = new Cookies();
  }
  return clientHandler;
};

export const cookiesFromServer = (context: NextPageContext) => {
  if (!serverHandler) {
    serverHandler = new Cookies(context.req?.headers?.cookie);
  }
  return serverHandler;
};
