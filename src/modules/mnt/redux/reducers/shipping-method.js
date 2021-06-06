import {createAction, handleActions} from 'redux-actions';
import {DEFAULT_PAGING} from '../../../../constants/pagination';

export const types = {
  GET_ALL: 'GET_ALL',
  GET_ALL_SUCCESS: 'GET_ALL_SUCCESS',
  GET_BY_ID: 'GET_BY_ID',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE_BY_ID: 'DELETE_BY_ID',
  TOGGLE_LOADING: 'TOGGLE_LOADING',
  SET_SHIPPING_METHOD: 'SET_SHIPPING_METHOD',
};

export const actions = {
  getAll: createAction(types.GET_ALL),
  getAllSuccess: createAction(types.GET_ALL_SUCCESS),
  getById: createAction(types.GET_BY_ID),
  create: createAction(types.CREATE),
  update: createAction(types.UPDATE),
  deleteById: createAction(types.DELETE_BY_ID),
  toggleLoading: createAction(types.TOGGLE_LOADING),
  setShippingMethod: createAction(types.SET_SHIPPING_METHOD),
};

export const initialShippingMethod = {
  name: '',
  description: '',
};

const initialState = {
  shippingMethods: [],
  shippingMethod: {
    ...initialShippingMethod,
  },
  loading: false,
  filter: {
    keyword: ''
  },
  pagination: {...DEFAULT_PAGING}
};

export default handleActions({
    [types.GET_ALL]: (state, {payload}) => {
      return {...state, ...payload, loading: true};
    },

    [types.GET_ALL_SUCCESS]: (state, {payload}) => {
      if (!payload) {
        return {...state};
      }
      return {
        ...state,
        shippingMethods: payload.content || [],
        pagination: {
          ...state.pagination,
          page: payload.pageNumber || 0,
          totalRecords: payload.totalElements || 0
        },
        loading: false,
      };
    },

    [types.SET_SHIPPING_METHOD]: (state, {payload}) => {
      return {...state, shippingMethod: payload};
    },

    [types.TOGGLE_LOADING]: (state, {payload}) => {
      return {...state, loading: payload};
    },
  },
  initialState,
);
