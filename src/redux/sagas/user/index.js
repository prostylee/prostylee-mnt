import {takeLatest} from 'redux-saga/effects';
import {userTypes} from '../../reducers';
import AppLogger from '../../../helpers/app-logger';


const getProfile = function* ({payload: {userId, onSuccess, onFail}}) {
  try {
    AppLogger.debug('Get shipping-method profile by userId=' + userId);
    yield onSuccess();
  } catch (e) {
    console.log(e);
    yield onFail(e);
  }
};


const watcher = function* () {
  yield takeLatest(userTypes.GET_BY_ID, getProfile);
};

export default watcher();
