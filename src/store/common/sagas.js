import { put, all, fork, takeLatest } from 'redux-saga/effects'
import API from '../../AxiosInstance/axiosInstance';
import {

  GET_ALL_PROVINCE, 
  GET_ALL_PROVINCE_SUCCESSFUL, 
  GET_ALL_PROVINCE_FAILED,
  GET_ALL_LOCATIONS,
  GET_ALL_LOCATIONS_SUCCESSFUL,
  GET_ALL_LOCATIONS_FAILED,
  

} from "./actionTypes";


function* getAllProvinceSaga(){
  try {
    const { data } = yield API.get('/province/get-all-province');
    yield put({type: GET_ALL_PROVINCE_SUCCESSFUL, payload:data.data});
  } catch (error) {
    yield put({type:GET_ALL_PROVINCE_FAILED, payload:error?.response?.message})
  }
}
function* getAllLocationsSaga(){
  try {
    const { data } = yield API.get('/locations/get-all-locations');
    yield put({type: GET_ALL_LOCATIONS_SUCCESSFUL, payload:data.data});
  } catch (error) {
    yield put({type:GET_ALL_LOCATIONS_FAILED, payload:error?.response?.message})
  }
}

export function* watchGetAllProvince() {
  yield takeLatest(GET_ALL_PROVINCE, getAllProvinceSaga);
}
export function* watchGetAllLocations() {
  yield takeLatest(GET_ALL_LOCATIONS, getAllLocationsSaga);
}


function* commonSaga() {
  yield all([
    fork(watchGetAllProvince),
    fork(watchGetAllLocations),
  ]);
}

export default commonSaga;