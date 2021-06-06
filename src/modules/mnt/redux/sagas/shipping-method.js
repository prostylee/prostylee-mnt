import {put, takeLatest} from 'redux-saga/effects';
import {shippingMethodTypes} from '../reducers';
import ShippingMethodService from '../../services/shipping-method-service';
import {actions as shippingMethodActions} from '../reducers/shipping-method';

const shippingMethodService = new ShippingMethodService();

const getAll = function* ({payload: {filter = {}, pagination = {}, onSuccess = () => {}, onFail = () => {}}}) {
  const queryParams = {
    ...filter,
    sorts: (pagination.sortOrder === -1 ? '-' : '') + pagination.sortField,
    page: pagination.page,
    limit: pagination.limit
  };

  const res = yield shippingMethodService.findAll(queryParams);
  if (res && !res.error) {
    yield put(shippingMethodActions.getAllSuccess(res.data));
    yield onSuccess(res);
  } else {
    yield onFail(res);
  }
};

const getById = function* ({payload: {id, onSuccess = () => {}, onFail = () => {}}}) {
  const res = yield shippingMethodService.findById(id);
  if (res && !res.error) {
    yield onSuccess(res);
  } else {
    yield onFail(res);
  }
};

const create = function* ({payload: {body, onSuccess = () => {}, onFail = () => {}}}) {
  const res = yield shippingMethodService.create(body);
  if (res && !res.error) {
    yield onSuccess(res);
  } else {
    yield onFail(res);
  }
};

const update = function* ({payload: {id, body, onSuccess = () => {}, onFail = () => {}}}) {
  const res = yield shippingMethodService.update(id, body);
  if (res && !res.error) {
    yield onSuccess(res);
  } else {
    yield onFail(res);
  }
};

const deleteById = function* ({payload: {id, onSuccess = () => {}, onFail = () => {}}}) {
  const res = yield shippingMethodService.deleteById(id);
  if (res && !res.error) {
    yield onSuccess(res);
  } else {
    yield onFail(res);
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
