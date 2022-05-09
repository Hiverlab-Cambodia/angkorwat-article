import * as actionTypes from "./actionTypes";


const initialState = {
  categoryList:[],
  popularStoresList:[],
  error: null,
  errorMessage: "",
  loading: false,
  isCategorySectionLoading:false
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_HOME_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SET_CATEGORY_SECTION_LOADING:
      return {
        ...state,
        isCategorySectionLoading: true,
      };
    case actionTypes.GET_CATEGORIES_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        categoryList: action.payload,
        error: false,
        errorMessage: "",
        isCategorySectionLoading:false
      };
    case actionTypes.GET_CATEGORIES_FAILED:
     return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
        isCategorySectionLoading:false
      };
    case actionTypes.GET_POPULAR_STORES_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        popularStoresList: action.payload,
        error: false,
        errorMessage: "",
      };
    case actionTypes.GET_POPULAR_STORES_FAILED:
     return {
        ...state,
        popularStoresList:[],
        loading: false,
        error: true,
        errorMessage: action.payload,
      };
    default:
      return { ...state };
  }
};

export default home;
