import {all} from 'redux-saga/effects';

import shippingMethod from './shipping-method';

export default function* mntSaga() {
  yield all([...shippingMethod]);
}
