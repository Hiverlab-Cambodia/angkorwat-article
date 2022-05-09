import {
  GET_ARTICLE_CATEGORIES,
  GET_ARTICLES_BY_CATEGORY,
  GET_POPULAR_ARTICLES,
  GET_FEATURED_ARTICLES,
  GET_SORTED_ARTICLES,
  GET_FILTERED_ARTICLES,
  GET_BOOKMARKED_ARTICLES,
  REMOVE_BOOKMARKED_ARTICLES,
  BOOKMARK_ARTICLE,
  GET_ARTICLE_BY_ID,
  RESET_ARTICLE_SUCCESS_STATUS,
  GET_RECOMMENDED_PRODUCTS,
  GET_RECOMMENDED_SERVICES,
  SORT_AND_FILTER_ARTICLES,
  SET_SORT_BY,
  SET_FILTER_BY,
  SET_QUERY,
  SET_SEARCH,
  SET_EXPLORE_IN,
  RESET_SORT_FILTER_QUERY_SEARCH,
  RESET_EXPLORE_IN,
  SET_SELECTED_CATEGORY

} from "./actionTypes";

export const getArticleCategoriesAction = () => ({
  type: GET_ARTICLE_CATEGORIES
});

// FILTERING
export const getArticlesByCategoryAction = payload => ({
  type: GET_ARTICLES_BY_CATEGORY,
  payload
});

// FOR ARTICLE HOME
export const getPopularArticlesAction = payload => ({
  type: GET_POPULAR_ARTICLES,
  payload
});

export const getFeaturedArticlesAction = () => ({
  type: GET_FEATURED_ARTICLES
});

// SORTING
export const getSortedArticlesAction = payload => ({
  type: GET_SORTED_ARTICLES,
  payload
});

// FILTERING
export const getFilteredArticlesAction = payload => ({
  type: GET_FILTERED_ARTICLES,
  payload
});


// BOOKMARK
export const getBookmarkedArticlesAction = () => ({
  type: GET_BOOKMARKED_ARTICLES
});

// REMOVE ARTICLE / ARTICLES FROM BOOKMARK - PAGES : BOOKMARK
export const removeBookmarkedArticlesAction = payload => ({
  type: REMOVE_BOOKMARKED_ARTICLES,
  payload
});

// ADD ARTICLE / ARTICLES TO BOOKMARK - PAGES : ARTICLE-PAGE
export const bookmarkArticleAction = payload => ({
  type: BOOKMARK_ARTICLE,
  payload
});

// GET ARTICLE BY ID
export const getArticleById = payload => ({
  type: GET_ARTICLE_BY_ID,
  payload
})

export const resetArticleSuccessStatusAction = () => ({
  type:RESET_ARTICLE_SUCCESS_STATUS,
})

// get recommendations 

export const getRecommendedProducts = (payload) => ({
  type: GET_RECOMMENDED_PRODUCTS,
  payload
})

export const getRecommendedServices = payload => ({
  type: GET_RECOMMENDED_SERVICES,
  payload
})

export const sortAndFilterArticles = payload => ({
  type : SORT_AND_FILTER_ARTICLES,
  payload
})



// SET SORT FILTER QUERY SEARCH
export const setSortByAction = payload => ({
  type : SET_SORT_BY,
  payload
})

export const setFilterByAction = payload => ({
  type : SET_FILTER_BY,
  payload
})


export const setQueryAction = payload => ({
  type : SET_QUERY,
  payload
})

export const setSearchAction = payload => ({
  type : SET_SEARCH,
  payload
})

export const setExploreInAction = payload => ({
  type : SET_EXPLORE_IN,
  payload
})

export const setSelectedCategoryAction = payload => ({
  type : SET_SELECTED_CATEGORY,
  payload
})


// RESET SORT FILTER QUERY SEARCH
export const resetSortFilterQuerySearch = () => ({
  type :  RESET_SORT_FILTER_QUERY_SEARCH
})

export const resetExploreIn = () => ({
  type : RESET_EXPLORE_IN
})