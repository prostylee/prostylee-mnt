import {Logger} from 'aws-amplify';

/**
 * This is a logger helpers.
 *
 * Refer: https://docs.amplify.aws/lib/utilities/logger/q/platform/js
 *
 */
const _logger = new Logger('ps-mnt-logger');

class AppLogger {

  static log (...msg) {
    _logger.info(msg);
  }

  static trace (...msg) {
    _logger.verbose(msg);
  }

  static debug (...msg) {
    _logger.debug(msg);
  }

  static info (...msg) {
    _logger.info(msg);
  }

  static warn (...msg) {
    _logger.warn(msg);
  }

  static error (...msg) {
    _logger.error(msg);
  }

}

export default AppLogger;
