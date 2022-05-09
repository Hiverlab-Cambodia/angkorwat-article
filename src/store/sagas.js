import { all } from 'redux-saga/effects';

//public
import RegisterSaga from './auth/register/saga';
import AuthSaga from './auth/login/saga';
import ForgetSaga from './auth/forgetpwd/saga';
import HomeSaga from './home/sagas';
import ArticleSaga from './article/sagas';
import CommonSaga from './common/sagas';


export default function* rootSaga() {
    yield all([
        //public
        RegisterSaga(),
        AuthSaga(),
        ForgetSaga(),
        HomeSaga(),
        ArticleSaga(),
        CommonSaga()
    ])
}