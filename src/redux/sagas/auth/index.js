import {call, put, takeLatest} from 'redux-saga/effects';
import {authActions, authTypes} from '../../reducers';
import {Auth} from 'aws-amplify';
import AppLogger from '../../../helpers/app-logger';

const signIn = function* ({payload: {email, password, onSuccess = () => {}, onFail = () => {}}}) {
  try {
    AppLogger.debug('userSignIn email=' + email + ", password=" + password);
    const user = yield Auth.signIn(email, password);
    AppLogger.debug('userSignIn response=' + JSON.stringify(user));

    yield put(authActions.signInSuccess(user));

    AppLogger.info('Sign-in successfully!!!');
    yield onSuccess();
  } catch (e) {
    AppLogger.log(e);
    yield put(authActions.signInFailed(e?.code || 'UNKNOWN'));
    yield onFail(e?.code || 'UNKNOWN');
  }
};

const signOut = function* ({payload: {onSuccess = () => {}, onFail = () => {}}}) {
  try {
    yield Auth.signOut({global: true});

    AppLogger.info('Sign-out successfully!!!');
    yield put(authActions.signOutSuccess());
    yield onSuccess();
  } catch (e) {
    AppLogger.log(e);
    yield put(authActions.signOutFailed(e?.code || 'UNKNOWN'));
    yield onFail(e?.code || 'UNKNOWN');
  }
};


const watcher = function* () {
  yield takeLatest(authTypes.SIGN_IN, signIn);
  yield takeLatest(authTypes.SIGN_OUT, signOut);
};

export default watcher();
