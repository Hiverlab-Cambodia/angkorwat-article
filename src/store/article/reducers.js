import * as actionTypes from "./actionTypes";

const initialState = {
  categoryList: [],
  articleList: [],
  articleById:{},
  popularArticleList:[],
  featuredArticleList:[],
  articlesByCategoryList:[],
  bookmarkedArticleList:[],
  recommendedProducts:[],
  recommendedServices:[],
  removeBookmarkedArticles:false,
  sort_by:"date",
  filter_by:"",
  exploreIn:{
    by:"",
    label:"All locations",
    label_id:"",
  },
  selectedCategory:null,
  search_by:"",
  query:null,
  bookmarkArticle:false,
  bookmarkLoader:false,
  articleCount:0,
  error: null,
  errorMessage: "",
  success:null,
  successMessage:"",
  loading: false,
  user: null
};

const article = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ARTICLE_CATEGORY_LOADING:
      return {
        ...state,
        loading: true
      };

      case actionTypes.SET_BOOKMARK_LOADER:
        return {
          ...state,
          bookmarkLoader: true
        };

    case actionTypes.GET_ARTICLE_CATEGORIES_SUCCESSFUL:
      return {
        ...state,
        // loading: false,
        categoryList: action.payload,
        error: false,
        errorMessage: ""
      };
    case actionTypes.GET_ARTICLE_CATEGORIES_FAILED:
      return {
        ...state,
        user: null,
        loading: false,
        error: true,
        errorMessage: action.payload
      };

    case actionTypes.GET_ARTICLES_BY_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        articlesByCategoryList: action.payload,
        articleCount:action.payload.total_articles_count,
        error: false,
        errorMessage: ""
      };
    case actionTypes.GET_ARTICLES_BY_CATEGORY_FAILED:
      return {
        ...state,
        articlesByCategoryList: [],
        articleList:[],
        articleCount:0,
        user: null,
        loading: false,
        error: true,
        errorMessage: action.payload
      };

    case actionTypes.GET_POPULAR_ARTICLES_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        popularArticleList: action.payload,
        articleCount:action.payload.total_articles_count,
        // articleList:[],
        error: false,
        errorMessage: ""
      };
    case actionTypes.GET_POPULAR_ARTICLES_FAILED:
      return {
        ...state,
        popularArticleList: [],
        // articleList:[],
        articleCount:0,
        user: null,
        loading: false,
        error: true,
        errorMessage: action.payload
      };

    case actionTypes.GET_FEATURED_ARTICLES_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        featuredArticleList: action.payload,
        error: false,
        errorMessage: ""
      };
    case actionTypes.GET_FEATURED_ARTICLES_FAILED:
        return {
          ...state,
          featuredArticleList: [],
          user: null,
          loading: false,
          error: true,
          errorMessage: action.payload
        };

    case actionTypes.GET_SORTED_ARTICLES_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        articleList: action.payload,
        articleCount:action.payload.total_articles_count,
        error: false,
        errorMessage: ""
      };
    case actionTypes.GET_SORTED_ARTICLES_FAILED:
      return {
        ...state,
        articleList: [],
        articleCount:0,
        user: null,
        loading: false,
        error: true,
        errorMessage: action.payload
      };

    case actionTypes.GET_FILTERED_ARTICLES_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        articleList: action.payload,
        articleCount:action.payload.total_articles_count,
        error: false,
        errorMessage: ""
      };
    case actionTypes.GET_FILTERED_ARTICLES_FAILED:
      return {
        ...state,
        articleList: [],
        articleCount:0,
        user: null,
        loading: false,
        error: true,
        errorMessage: action.payload
      };

    case actionTypes.GET_BOOKMARKED_ARTICLES_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        bookmarkedArticleList: action.payload.data,
        removeBookmarkedArticles:false,
        successB:true,
        successBMessage:action.payload.message
      };
    case actionTypes.GET_BOOKMARKED_ARTICLES_FAILED:
      return {
        ...state,
        bookmarkedArticleList: [],
        removeBookmarkedArticles:false,
        user: null,
        loading: false,
        errorB:true,
        errorBMessage: action.payload
      };

    case actionTypes.REMOVE_BOOKMARKED_ARTICLES_SUCCESSFUL:
      return {
        ...state,
        bookmarkLoader: false,
        removeBookmarkedArticles: true,
        success:true,
        successMessage:action.payload,
        error: false,
        errorMessage: ""
      };
    case actionTypes.REMOVE_BOOKMARKED_ARTICLES_FAILED:
        return {
          ...state,
          removeBookmarkedArticles:false,
          user: null,
          bookmarkLoader: false,
          error: true,
          success: false,
          errorMessage: action.payload
        };

    case actionTypes.BOOKMARK_ARTICLE_SUCCESSFUL:
      return {
        ...state,
        bookmarkLoader: false,
        bookmarkArticle: true,
        success: true,  
        successMessage:action.payload,
        error: false,
        errorMessage: ""
      };
    case actionTypes.BOOKMARK_ARTICLE_FAILED:
        return {
          ...state,
          bookmarkArticle:false,
          user: null,
          bookmarkLoader: false,
          success:false,
          successMessage:"",
          error: true,
          errorMessage: action.payload
        };

    case actionTypes.GET_ARTICLE_BY_ID_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        articleById: action.payload,
        error: false,
        errorMessage: ""
      };
    case actionTypes.GET_ARTICLE_BY_ID_FAILED:
          return {
            ...state,
            articleById: {},
            user: null,
            loading: false,
            error: true,
            errorMessage: action.payload
          };

    case actionTypes.GET_RECOMMENDED_PRODUCTS_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        recommendedProducts: action.payload,
        error: false,
        errorMessage: ""
      };
    case actionTypes.GET_RECOMMENDED_PRODUCTS_FAILED:
      return {
        ...state,
        recommendedProducts: [],
        user: null,
        loading: false,
        errorMessage: action.payload
      };

    case actionTypes.GET_RECOMMENDED_SERVICES_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        recommendedServices: action.payload,
        error: false,
        errorMessage: ""
      };
    case actionTypes.GET_RECOMMENDED_SERVICES_FAILED:
          return {
            ...state,
            recommendedServices: [],
            user: null,
            loading: false,
            errorMessage: action.payload
          };

    case actionTypes.SORT_AND_FILTER_ARTICLES_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        articleList: action.payload,
        articleCount:action.payload.total_articles_count,
        error: false,
        errorMessage: ""
      };
    case actionTypes.SORT_AND_FILTER_ARTICLES_FAILED:
      return {
        ...state,
        articleList: [],
        articleCount:0,
        user: null,
        loading: false,
        error: true,
        errorMessage: action.payload
      };

    case actionTypes.RESET_SORT_FILTER_QUERY_SEARCH:
      return {
        ...state,
        sort_by:"date",
        // filter_by:"",
        search_by:"",
        query:null,
        articleList:[]
      }
      
    case actionTypes.SET_SORT_BY:
        return {
          ...state,
          sort_by:action.payload.sort_by
        }
    case actionTypes.SET_FILTER_BY:
    return {
      ...state,
      filter_by:action.payload.filter_by
    }
    case actionTypes.SET_QUERY:
      return {
        ...state,
        query:action.payload.query
      }
    case actionTypes.SET_SEARCH:
      return {
        ...state,
        search_by:action.payload.search_by
      }
    case actionTypes.SET_EXPLORE_IN:
      return {
        ...state,
        exploreIn:{
          by:action.payload.by,
          label:action.payload.label,
          label_id : action.payload.label_id
        }
      }
    case actionTypes.SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory:action.payload
      }

    case actionTypes.RESET_EXPLORE_IN:
      return {
        ...state,
        exploreIn:{
          by:"",
          label:"All locations",
          label_id:""
        }
      }
      
    case actionTypes.RESET_ARTICLE_SUCCESS_STATUS:
            return {
               ...state,
               error: false,
               errorMessage: '',
               success:false,
               successMessage:''
             };
  

    default:
      return { ...state };
  }
};

export default article;
