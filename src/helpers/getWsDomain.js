import { isProduction } from 'helpers/isProduction';

/**
 * This helper function returns the current domain of the API.
 * If the environment is production, the production Heroku URL will be returned.
 * Otherwise, the link localhost:8080 will be returned (Spring server default port).
 * @returns {string}
 */
export const getWsDomain = () => {
  const prodUrl = 'ws://sopra-fs22-group-18-server.herokuapp.com/websocket';
  const devUrl = 'ws://localhost:8080/websocket';

  return isProduction() ? prodUrl : devUrl;
};
