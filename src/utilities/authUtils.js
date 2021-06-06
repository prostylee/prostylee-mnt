/**
 * Checks if shipping-method is authenticated
 */
import {Auth} from 'aws-amplify';
import AppLogger from '../helpers/app-logger';

const isUserAuthenticated = () => {
  return Auth.currentSession()
    .then((user) => true)
    .catch((err) => false);
};

/**
 * Returns the logged in shipping-method
 */
const getLoggedInUser = async () => {
  try {
    const user = await Auth.currentSession();
    AppLogger.debug('Auth.currentSession=' + JSON.stringify(user));
    const payload = user.idToken.payload || {};
    return {
      id: payload['custom:userId'],
      sub: payload['sub'],
      username: payload['cognito:username'],
      roles: payload['cognito:groups'] || [],
    };
  } catch (err) {
    AppLogger.debug('Could not get authentication shipping-method', err);
    return null;
  }
};

const hasAnyRole = (checkedRoles) => {
  let hasRole = false;
  let user = null;
  getLoggedInUser().then(usr => user = usr);
  if (user && user.roles) {
    checkedRoles.some(function (role) {
      if (user.roles.includes(role)) {
        hasRole = true;
        return hasRole;
      }
    });
  }
  return hasRole;
};

export {isUserAuthenticated, getLoggedInUser, hasAnyRole};
