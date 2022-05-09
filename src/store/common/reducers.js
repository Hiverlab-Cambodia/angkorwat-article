import {

  GET_ALL_PROVINCE_SUCCESSFUL,
  GET_ALL_PROVINCE_FAILED,
  GET_ALL_LOCATIONS_SUCCESSFUL,
  GET_ALL_LOCATIONS_FAILED,

} from "./actionTypes";

const initialState = {
  provinceList: [],
  locationsList:[],
  error: null,
  errorMessage: "",
  user: null
};

const common = (state = initialState, action) => {
  switch (action.type) {

    case GET_ALL_PROVINCE_SUCCESSFUL:
      return {
        ...state,
        provinceList: action.payload,
        error: false,
        errorMessage: ""
      };

    case GET_ALL_PROVINCE_FAILED:
      return {
        ...state,
        provinceList: action.payload,
        user: null,
        loading: false,
        error: true,
        errorMessage: action.payload
      };
      case GET_ALL_LOCATIONS_SUCCESSFUL:
        return {
          ...state,
          locationsList: action.payload,
          error: false,
          errorMessage: ""
        };
  
      case GET_ALL_LOCATIONS_FAILED:
        return {
          ...state,
          locationsList: [],
          user: null,
          loading: false,
          error: true,
          errorMessage: action.payload
        };
    default:
      return { ...state };
  }
};

export default common;
