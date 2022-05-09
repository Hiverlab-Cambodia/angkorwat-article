import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import * as actionTypes from './actionTypes';

//AUTH related methods
import API from '../../../AxiosInstance/axiosInstance';
import { stringifyErrorMessage } from '../../../utils';


function* loginSystemUserSaga({ payload: { user:{email,password}, history } }) {
    try {
        yield put({type: actionTypes.SET_LOGIN_LOADING});
        const { data } = yield API.post('/system-user/login', {email, password});
        yield put({ type: actionTypes.LOGIN_USER_SUCCESS,payload: data.data});
        // history.push('/adminUsers')
    } catch (error) {
        yield put({ type: actionTypes.LOGIN_USER_FAILURE,payload: stringifyErrorMessage(error)});
    }
}

function* logoutSystemUserSaga({ payload: { history } }) {
    try {
        const response = yield API.get('/system-user/logout');
        yield put({type:actionTypes.LOGOUT_USER_SUCCESS,payload:response});
        history.push('/login');
    } catch (error) {
        yield put({type:actionTypes.LOGIN_USER_FAILURE,payload:stringifyErrorMessage(error)});
    }
}


export function* watchLoginSystemUser() {
    yield takeEvery(actionTypes.LOGIN_USER, loginSystemUserSaga)
}

export function* watchLogoutSystemUser() {
    yield takeEvery(actionTypes.LOGOUT_USER, logoutSystemUserSaga)
}


function* authSaga() {
    yield all([
        fork(watchLoginSystemUser),
        fork(watchLogoutSystemUser),
    ]);
}

export default authSaga;