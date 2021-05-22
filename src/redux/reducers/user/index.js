import {createAction, handleActions} from 'redux-actions';

export const types = {
  GET_ALL: 'GET_ALL',
  GET_BY_ID: 'GET_BY_ID',
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILED: 'SIGN_IN_FAILED',
};

export const actions = {
  getAll: createAction(types.GET_ALL),
  getById: createAction(types.GET_BY_ID),
  signIn: createAction(types.SIGN_IN),
  signInSuccess: createAction(types.SIGN_IN_SUCCESS),
  signInFailed: createAction(types.SIGN_IN_FAILED),
};

export const selectors = {
  getAll: (data) => data || {},
  getById: (data) => data || {},
  signIn: (data) => data || {},
};

const initialState = {
  data: null,
};

export default handleActions(
  {
    [types.GET_ALL]: (state, {payload}) => {
      return {...state, data: payload};
    },
    [types.GET_BY_ID]: (state, {payload}) => {
      return {...state, data: payload};
    },
    [types.SIGN_IN_SUCCESS]: (state, {payload}) => {
      return {...state, data: payload};
    },
    [types.SIGN_IN_FAILED]: (state, {payload}) => {
      return {...state, data: payload};
    },
  },
  initialState,
);
