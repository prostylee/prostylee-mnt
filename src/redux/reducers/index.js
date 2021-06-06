import {combineReducers} from 'redux';

import shared, {actions as sharedActions, types as sharedTypes,} from './shared';
import auth, {actions as authActions, types as authTypes,} from './auth';
import user, {actions as userActions, selectors as userSelectors, types as userTypes,} from './user';
import mntReducer from '../../modules/mnt/redux/reducers';

const rootReducer = combineReducers({
  shared,
  auth,
  user,
  ...mntReducer
});

export {sharedActions, sharedTypes};
export {authActions, authTypes};
export {userActions, userSelectors, userTypes};

export default rootReducer;
