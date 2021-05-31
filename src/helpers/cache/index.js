import {Cache} from 'aws-amplify';

const config = {
  keyPrefix: '@ProStyleeMnt:',
  itemMaxSize: 500000, // Max size of individual item which can be set into Cache in bytes. The default value is 200 KB.
  // defaultTTL: 0, // TTL for the cache items in milliseconds. The default value is 72 hours.
  // storage: window.sessionStorage, // LocalStorage(default), switch to sessionStorage
  // defaultPriority: 5, //Default priority of the cache items. The default value is 5, the highest priority is 1.
};
const _psMntCache = Cache.createInstance(config);

/**
 * This is a cache helpers.
 *
 * Reference: https://docs.amplify.aws/lib/utilities/cache/q/platform/js
 */
class CacheHelper {

  /**
   * This is used to set a specific item in storage.
   *
   * @param key The key for caching.
   * @param value The value of key.
   * @param options The configuration parameters for the items in the cache including:
   *  <ul>
   *  <li> priority The number - Priority of the item to be kept in cache. Higher priority means longer expiration time. </li>
   *  <li> expires The number - expiration time of the cache item in milliseconds. </li>
   *  <li> callback The function - You can provide a callback function with getItem() to implement cache miss scenarios.
   *  The provided function will only be called if there is not a match for the cache key,
   *  and the return value from the function will be assigned as the new value for the key in cache. </li>
   *  </ul>
   */
  static setItem(key, value, options = {}) {
    _psMntCache.setItem(key, value, options);
  }

  /**
   * This is used to get a specific key from storage
   */
  static getItem(key, options = {}) {
    return _psMntCache.getItem(key, options);
  }

  /**
   * This is used to remove an item from storage
   */
  static removeItem(key) {
    _psMntCache.removeItem(key);
  }

  /**
   * This is used to clear the storage
   */
  static clearAll() {
    _psMntCache.clear();
  }
}

export default CacheHelper;
