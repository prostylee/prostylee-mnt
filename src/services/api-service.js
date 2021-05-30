import {create} from 'apisauce'
import {BASE_API_URL} from '../constants/apiUrls';
import {SUCCESS} from '../constants/httpStatusCode';
import {Auth} from 'aws-amplify';
import AppLogger from '../helpers/app-logger';

const isDevMode = process.env.NODE_ENV !== 'production';

/**
 * This is a base configuration for calling an api to backend.
 *
 * Reference: https://www.npmjs.com/package/apisauce
 *
 * @private
 */
const api = create({
  baseURL: BASE_API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 60000, // milliseconds
});


if (isDevMode) {
  /**
   * Monitors are functions you can attach to the API which will be called when any request is made. You can use it to do things like:
   *
   * - check for headers and record values.
   * - determine if you need to trigger other parts of your code.
   * - measure performance of API calls.
   * - perform logging.
   * - Monitors are run just before the promise is resolved. You get an early sneak peak at what will come back.
   *
   * Any exceptions that you trigger in your monitor will not affect the flow of the api request.
   * So, each monitor callback is surrounded by an oppressive try/catch block.
   *
   * @param response
   */
  api.addMonitor(response => {
    AppLogger.debug('API response=', response);
  });


  /**
   * Change every request globally. This will bring down the stack, so careful.
   *
   * @param response The request object including:
   *
   *  data - the object being passed up to the server.
   *  method - the HTTP verb.
   *  url - the url we're hitting.
   *  headers - the request headers.
   *  params - the request params for get, delete, head, link, unlink.
   */
  api.addRequestTransform(request => {
    AppLogger.debug('Doing a request transform, request=', request);
  });


  /**
   * Change every response globally. This will bring down the stack, so careful.
   *
   * @param response The response object including:
   *
   *  data - the object originally from the server that you might wanna mess with.
   *  duration - the number of milliseconds.
   *  problem - the problem code (see the bottom for the list).
   *  ok - true or false.
   *  status - the HTTP status code.
   *  headers - the HTTP response headers.
   *  config - the underlying axios config for the request.
   */
  // api.addResponseTransform(response => {
  //   AppLogger.debug('Doing a response transform, response=', response);
  // });
}


/**
 * Execute a request call.
 *
 * @param method The HTTP action, one of GET, POST, PUT, DELETE, ... (required).
 * @param path The relative path to the API (required).
 * @param data The object - request body or query string variables (optional).
 * @param config The object - config passed along to the axios request (optional).
 *
 * @returns {Promise<*>}
 */
export const exchange = async (method, path, data = {}, config = {}) => {
  try {
    const authToken = await Auth.currentSession();
    AppLogger.debug('authToken=' + JSON.stringify(authToken));

    if (authToken && authToken.accessToken) {
      api.setHeaders({
        Authorization: 'Bearer ' + authToken.accessToken.jwtToken,
        'X-PS-Authorization-Type': 'OPEN-ID',
      });
    }
  } catch (e) {
    AppLogger.error("Error retrieve a token " + path, e);
  }

  return api[method](path, data, config).then((res) => {
    let response;
    if (res && res.status === SUCCESS) {
      response = {
        status: res.status,
        error: null,
        data: res.data,
      };
      return {ok: true, data: response};
    } else if (res && res.status !== SUCCESS) {
      response = {
        status: res.status,
        error: res.data?.message,
        data: null,
      };
      return {ok: true, data: response};
    }
  });
};


/**
 * Execute a GET call.
 *
 * @param path The relative path to the API (required).
 * @param params The object - query string variables (optional).
 * @param config The object - config passed along to the axios request (optional).
 *
 * @returns {Promise<*>}
 */
export const get = async (path, params = {} = {}, config = {}) => {
  return exchange('get', path, params, config);
};


/**
 * Execute a POST call.
 *
 * @param path The relative path to the API (required).
 * @param body The object - a request body (optional).
 * @param config The object - config passed along to the axios request (optional).
 *
 * @returns {Promise<*>}
 */
export const post = async (path, body = {}, config = {}) => {
  return exchange('post', path, body, config);
};


/**
 * Execute a PUT call.
 *
 * @param path The relative path to the API (required).
 * @param body The object - a request body (optional).
 * @param config The object - config passed along to the axios request (optional).
 *
 * @returns {Promise<*>}
 */
export const put = async (path, body = {}, config = {}) => {
  return exchange('put', path, body, config);
};


/**
 * Execute a DELETE call.
 *
 * @param path The relative path to the API (required).
 * @param params The object - query string variables (optional).
 * @param config The object - config passed along to the axios request (optional).
 *
 * @returns {Promise<*>}
 */
export const del = async (path, params = {}, config = {}) => {
  return exchange('delete', path, params, config);
};
