import {all} from 'redux-saga/effects';

import auth from './auth';
import user from './user';
import mntSaga from '../../modules/mnt/redux/sagas';

export default function* rootSaga() {
  yield all([...user, ...auth, mntSaga()]);
}
