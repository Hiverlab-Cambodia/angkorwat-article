import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes'
import API from '../../../AxiosInstance/axiosInstance';


function* registerUser({ payload }) {
    try {
      yield put({type: actionTypes.SET_REGISTER_LOADING});
      const { data } = yield API.post('/admin/register',payload.user);
      yield put({type:actionTypes.REGISTER_ADMIN_SUCCESSFUL, payload: data.data})
      if(data){
        payload?.history.push('/')
      }
    } catch (error) {
      yield put({type: actionTypes.REGISTER_ADMIN_FAILED, payload:error?.response?.data?.message});
    }
}

export function* watchUserRegister() {
    yield takeEvery(actionTypes.REGISTER_ADMIN, registerUser);
}

function* registerSaga() {
    yield all([fork(watchUserRegister)]);
}

export default registerSaga;