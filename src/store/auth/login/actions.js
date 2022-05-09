import {
  LOGIN_USER,
  LOGOUT_USER,
} from "./actionTypes";

export const loginUserAction = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history }
});


export const logoutUserAction = (history) => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  };
};
