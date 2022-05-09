import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  RESET_FORGET_PASSWORD_ERROR_MESSAGE
} from "./actionTypes";

export const userForgetPassword = (email, history) => ({
    type: FORGET_PASSWORD,
    payload: { email, history }
  });

export const userForgetPasswordSuccess = message => {
  return {
    type: FORGET_PASSWORD_SUCCESS,
    payload: message
  };
};

export const userForgetPasswordError = message => {
  return {
    type: FORGET_PASSWORD_ERROR,
    payload: message
  };
};

export const resetErrorMsgAction = () => ({
  type:RESET_FORGET_PASSWORD_ERROR_MESSAGE
})