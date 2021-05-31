import {createAction, handleActions} from 'redux-actions';

export const types = {
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILED: 'SIGN_IN_FAILED',

  SIGN_OUT: 'SIGN_OUT',
  SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
  SIGN_OUT_FAILED: 'SIGN_OUT_FAILED',
};

export const actions = {
  // Sign-in
  signIn: createAction(types.SIGN_IN),
  signInSuccess: createAction(types.SIGN_IN_SUCCESS),
  signInFailed: createAction(types.SIGN_IN_FAILED),

  // Sign-out
  signOut: createAction(types.SIGN_OUT),
  signOutSuccess: createAction(types.SIGN_OUT_SUCCESS),
  signOutFailed: createAction(types.SIGN_OUT_FAILED),
};

const initialState = {
  user: null,
  errorCode: null,
};

export default handleActions(
  {
    // Sign-in
    [types.SIGN_IN]: (state) => {
      return {...state, user: null};
    },
    [types.SIGN_IN_SUCCESS]: (state, {payload}) => {
      return {...state, user: payload};
    },
    [types.SIGN_IN_FAILED]: (state, {payload}) => {
      return {...state, errorCode: payload};
    },

    // Sign-out
    [types.SIGN_OUT]: (state) => {
      return {...state};
    },
    [types.SIGN_OUT_SUCCESS]: (state) => {
      return {...state, user: null};
    },
    [types.SIGN_OUT_FAILED]: (state, {payload}) => {
      return {...state, errorCode: payload};
    },
  },
  initialState,
);
