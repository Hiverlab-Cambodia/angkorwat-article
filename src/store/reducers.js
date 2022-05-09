import { combineReducers } from "redux";

// Authentication
import Login from "./auth/login/reducer";
import Register from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Home from './home/reducers';
import Article from './article/reducers';
import Common from './common/reducers';

const rootReducer = combineReducers({
  // public
  Login,
  Register,
  ForgetPassword,
  Home,
  Article,
  Common
});

export default rootReducer;
