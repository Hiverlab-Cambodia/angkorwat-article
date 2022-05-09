import {
  SET_REGISTER_LOADING,
  REGISTER_ADMIN_SUCCESSFUL,
  REGISTER_ADMIN_FAILED,
} from "./actionTypes";

const initialState = {
  error: null,
  errorMessage: "",
  loading: false,
  user: null,
};

const register = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGISTER_LOADING:
      state = {
        ...state,
        loading: true,
      };
      break;
    case REGISTER_ADMIN_SUCCESSFUL:
      sessionStorage.setItem('token',action.payload);
      sessionStorage.setItem('type','AD');
      state = {
        ...state,
        loading: false,
        user: action.payload,
        error: false,
        errorMessage: "",
      };
      break;
    case REGISTER_ADMIN_FAILED:
      state = {
        ...state,
        user: null,
        loading: false,
        error: true,
        errorMessage: action.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default register;
