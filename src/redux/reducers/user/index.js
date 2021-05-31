import {createAction, handleActions} from 'redux-actions';

export const types = {
  GET_ALL: 'GET_ALL',
  GET_BY_ID: 'GET_BY_ID',
};

export const actions = {
  getAll: createAction(types.GET_ALL),
  getById: createAction(types.GET_BY_ID),
};

export const selectors = {
  getAll: (data) => data || {},
  getById: (data) => data || {},
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
  },
  initialState,
);
