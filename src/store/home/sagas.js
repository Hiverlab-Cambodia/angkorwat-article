import { put, all, fork, takeLatest } from 'redux-saga/effects'
import API from '../../AxiosInstance/axiosInstance';
import { stringifyErrorMessage } from '../../utils';
import * as actionTypes from './actionTypes'


function* getCategoriesSaga(){
  try {
    yield put({type:actionTypes.SET_CATEGORY_SECTION_LOADING});
    const { data } = yield API.get('/category/get-categories');
    yield put({type:actionTypes.GET_CATEGORIES_SUCCESSFUL, payload:data.data});
  } catch (error) {
    yield put({type:actionTypes.GET_CATEGORIES_FAILED, payload:stringifyErrorMessage(error)})
  }
}

function* getPopularStoresSaga(){
  try {
    yield put({type:actionTypes.SET_HOME_LOADING});
    const { data } = yield API.get('/shop/get-popular-stores');
    yield put({type:actionTypes.GET_POPULAR_STORES_SUCCESSFUL, payload:data.data});
  } catch (error) {
    yield put({type:actionTypes.GET_POPULAR_STORES_FAILED, payload:stringifyErrorMessage(error)})
  }
}

export function* watchGetCategories() {
  yield takeLatest(actionTypes.GET_CATEGORIES, getCategoriesSaga);
}

export function* watchGetPopularStores() {
  yield takeLatest(actionTypes.GET_POPULAR_STORES, getPopularStoresSaga);
}

function* homeSaga() {
  yield all([
    fork(watchGetCategories),
    fork(watchGetPopularStores),
  ]);
}

export default homeSaga;