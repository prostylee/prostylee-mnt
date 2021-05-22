import {combineReducers} from 'redux';

import shared, {actions as sharedActions, selectors as sharedSelectors, types as sharedTypes,} from './shared';

import user, {actions as userActions, selectors as userSelectors, types as userTypes,} from './user';

const rootReducer = combineReducers({
  shared,
  user,
});

export {sharedActions, sharedSelectors, sharedTypes};
export {userActions, userSelectors, userTypes};

export default rootReducer;
