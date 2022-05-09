import { takeLatest, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { FORGET_PASSWORD } from "./actionTypes";
import { userForgetPasswordSuccess, userForgetPasswordError } from "./actions";
import API from '../../../AxiosInstance/axiosInstance';
//AUTH related methods

// const fireBaseBackend = getFirebaseBackend();

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { email, history } }) {
  try {
    const response = yield API.post('/forgetPassword', {email });
    // const response = yield call(fireBaseBackend.forgetPassword, user.email);
    if (response) {
      yield put(
        userForgetPasswordSuccess(
          "Reset link has been sent to your mail-box"
        )
      );
    }
  } catch (error) {
    console.log(error);
    yield put(userForgetPasswordError('something went wrong'));
  }
}

export function* watchUserPasswordForget() {
  yield takeLatest(FORGET_PASSWORD, forgetUser);
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)]);
}

export default forgetPasswordSaga;
