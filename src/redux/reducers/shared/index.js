import {createAction, handleActions} from 'redux-actions';
import * as ActionMode from '../../../constants/actionMode';

export const types = {
  UPDATE_NETWORK_STATUS: 'UPDATE_NETWORK_STATUS',
  TOGGLE_GLOBAL_LOADING: 'TOGGLE_LOADING',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  TOGGLE_THEME_MODE: 'TOGGLE_THEME_MODE',
  GLOBAL_MESSAGE: 'GLOBAL_MESSAGE',
  ACTION_MODE: 'ACTION_MODE',
};

export const actions = {
  updateNetworkStatus: createAction(types.UPDATE_NETWORK_STATUS),
  toggleGlobalLoading: createAction(types.TOGGLE_GLOBAL_LOADING),
  toggleSidebar: createAction(types.TOGGLE_SIDEBAR),
  toggleThemeMode: createAction(types.TOGGLE_THEME_MODE),
  globalMessage: createAction(types.GLOBAL_MESSAGE),
  setActionMode: createAction(types.ACTION_MODE),
};

const initialState = {
  networkStatus: true,
  showGlobalLoading: false,
  showSidebar: false,
  themeMode: 'light',
  globalMessage: null,
  actionMode: ActionMode.NONE,
};

export default handleActions({
    [types.UPDATE_NETWORK_STATUS]: (state, {payload}) => {
      return {...state, networkStatus: payload};
    },
    [types.TOGGLE_GLOBAL_LOADING]: (state, {payload}) => {
      return {...state, showGlobalLoading: payload};
    },
    [types.TOGGLE_SIDEBAR]: (state, {payload}) => {
      return {...state, showSidebar: payload};
    },
    [types.TOGGLE_THEME_MODE]: (state, {payload}) => {
      return {...state, themeMode: payload};
    },
    [types.GLOBAL_MESSAGE]: (state, {payload}) => {
      return {...state, globalMessage: payload};
    },
    [types.ACTION_MODE]: (state, {payload}) => {
      return {...state, actionMode: payload};
    },
  },
  initialState,
);
