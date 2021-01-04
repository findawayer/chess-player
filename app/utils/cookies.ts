import Cookies from 'universal-cookie';

let clientHandler: Cookies;

/** Use cached `universal-cookie` instance. */
export const cookies = () => {
  if (!clientHandler) {
    clientHandler = new Cookies();
  }
  return clientHandler;
};
