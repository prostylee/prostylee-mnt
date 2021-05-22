import {call, put, takeLatest} from 'redux-saga/effects';
import {userTypes} from '../../reducers';
import {Auth} from 'aws-amplify';


const userSignIn = function* ({payload: {email, password, onSuccess, onFail}}) {
  try {
    console.log('userSignIn email=' + email + ", password=" + password);
    const user = yield Auth.signIn(email, password);
    console.log('userSignIn response=' + JSON.stringify(user));
    console.log('Sign-in successfully!!!');
    yield onSuccess();
  } catch (e) {
    console.log(e);
    yield onFail(e);
  }
};


const watcher = function* () {
  yield takeLatest(userTypes.SIGN_IN, userSignIn);
};

export default watcher();
