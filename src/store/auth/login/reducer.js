import * as actionTypes from "./actionTypes";

const initialState = {
  error: null,
  loading: false,
  token: "",
  userData: null,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOGIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.LOGIN_USER_SUCCESS:
      sessionStorage.setItem("token", action.payload.token);
      return {
        ...state,
        loading: false,
        token: action.payload.token,
      };
    case actionTypes.LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error:true,
        errorMessage:action.payload
      };
    case actionTypes.LOGOUT_USER_SUCCESS:
      sessionStorage.removeItem("token");
      return { ...state, token: "" };
    case actionTypes.LOGOUT_USER_FAILURE:
      return { ...state};
    default:
      return { ...state };
  }
};

export default login;
