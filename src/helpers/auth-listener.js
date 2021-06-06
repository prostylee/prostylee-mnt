import {Hub} from 'aws-amplify';
import AppLogger from './app-logger';

const listener = (data) => {
  console.log('CognitoAuthListener');
  AppLogger.info('CognitoAuthListener ' + JSON.stringify(data));
  switch (data.payload.event) {
    case 'signIn':
      AppLogger.info('shipping-method signed in');
      break;
    case 'signUp':
      AppLogger.info('shipping-method signed up');
      break;
    case 'signOut':
      AppLogger.info('shipping-method signed out');
      break;
    case 'signIn_failure':
      AppLogger.error('shipping-method sign in failed');
      break;
    case 'tokenRefresh':
      AppLogger.info('token refresh succeeded');
      break;
    case 'tokenRefresh_failure':
      AppLogger.error('token refresh failed');
      break;
    case 'configured':
      AppLogger.info('the Auth module is configured');
      break;
    default:
      AppLogger.info('Other event');
      break;
  }
};

export const listenAuth = () => {
  Hub.listen('auth', listener);
};
