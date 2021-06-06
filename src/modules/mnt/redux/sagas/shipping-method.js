import {put, takeLatest} from 'redux-saga/effects';
import {shippingMethodTypes} from '../reducers';
import AppLogger from '../../../../helpers/app-logger';
import ShippingMethodService from '../../services/shipping-method-service';
import {actions as shippingMethodActions} from '../reducers/shipping-method';

const shippingMethodService = new ShippingMethodService();

const getAll = function* ({payload: {filter = {}, pagination = {}, onSuccess = () => {}, onFail = () => {}}}) {
  try {
    const queryParams = {
      ...filter,
      sorts: (pagination.sortOrder === -1 ? '-' : '') + pagination.sortField,
      page: pagination.page,
      limit: pagination.limit
    };

    const res = yield shippingMethodService.findAll(queryParams);
    yield put(shippingMethodActions.getAllSuccess(res.data.data));
    yield onSuccess();
  } catch (e) {
    AppLogger.error(e);
    yield onFail(e);
  }
};

const getById = function* ({payload: {id, onSuccess = () => {}, onFail = () => {}}}) {
  try {
    const res = yield shippingMethodService.findById(id);
    yield onSuccess(res);
  } catch (e) {
    AppLogger.error(e);
    yield onFail(e);
  }
};

const create = function* ({payload: {body, onSuccess = () => {}, onFail = () => {}}}) {
  try {
    const res = yield shippingMethodService.create(body);
    yield onSuccess(res);
  } catch (e) {
    AppLogger.error(e);
    yield onFail(e);
  }
};

const update = function* ({payload: {id, body, onSuccess = () => {}, onFail = () => {}}}) {
  try {
    const res = yield shippingMethodService.update(id, body);
    yield onSuccess(res);
  } catch (e) {
    AppLogger.error(e);
    yield onFail(e);
  }
};

const deleteById = function* ({payload: {id, onSuccess = () => {}, onFail = () => {}}}) {
  try {
    yield shippingMethodService.deleteById(id);
    yield onSuccess();
  } catch (e) {
    AppLogger.error(e);
    yield onFail(e);
  }
};

const watcher = function* () {
  yield takeLatest(shippingMethodTypes.GET_ALL, getAll);
  yield takeLatest(shippingMethodTypes.GET_BY_ID, getById);
  yield takeLatest(shippingMethodTypes.CREATE, create);
  yield takeLatest(shippingMethodTypes.UPDATE, update);
  yield takeLatest(shippingMethodTypes.DELETE_BY_ID, deleteById);
};

export default watcher();
