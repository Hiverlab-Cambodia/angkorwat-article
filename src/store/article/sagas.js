import { put, all, fork, takeLatest } from 'redux-saga/effects'
import API from '../../AxiosInstance/axiosInstance';
import { getAllProvince } from '../common/actions';
import { getArticleById, getBookmarkedArticlesAction,getRecommendedProducts ,getRecommendedServices} from './actions';
import * as actionTypes from "./actionTypes";


function* getArticleCategoriesSaga(){
  try {
    yield put({type:actionTypes.SET_ARTICLE_CATEGORY_LOADING});
    const { data } = yield API.get('/category/get-category-by-type/Article');
 
    yield put({type:actionTypes.GET_ARTICLE_CATEGORIES_SUCCESSFUL, payload:data.data});
  } catch (error) {
    yield put({type:actionTypes.GET_ARTICLE_CATEGORIES_FAILED, payload:error?.response?.message})
  }
}

// get articles by category
function* getArticlesByCategorySaga({payload}){
  try {
    yield put({type:actionTypes.SET_ARTICLE_CATEGORY_LOADING});
    const { data } = yield API.post(`/article/filter-articles`,payload); 
    yield put({type:actionTypes.GET_ARTICLES_BY_CATEGORY_SUCCESSFUL, payload:data.data});
  } catch (error) {
    yield put({type:actionTypes.GET_ARTICLES_BY_CATEGORY_FAILED, payload:error?.response?.message})
  }
}

// sort
function* getSortedArticlesSaga({payload}){
  try {
    yield put({type:actionTypes.SET_ARTICLE_CATEGORY_LOADING});
    const { data } = yield API.get(`/article/sort-articles`,{
      params:payload
    });
   
    yield put({type:actionTypes.GET_SORTED_ARTICLES_SUCCESSFUL, payload:data.data});
  } catch (error) {
    yield put({type:actionTypes.GET_SORTED_ARTICLES_FAILED, payload:error?.response?.message})
  }
}

// filter
function* getFilteredArticlesAction({payload}){
  try {
    yield put({type:actionTypes.SET_ARTICLE_CATEGORY_LOADING});
    const { data } = yield API.post(`/article/filter-articles`,payload);
 
    yield put({type:actionTypes.GET_FILTERED_ARTICLES_SUCCESSFUL, payload:data.data});
  } catch (error) {
    yield put({type:actionTypes.GET_FILTERED_ARTICLES_FAILED, payload:error?.response?.message})
  }
}

function* getPopularArticlesSaga({payload}){
  try {
    yield put({type:actionTypes.SET_ARTICLE_CATEGORY_LOADING});
    const { data } = yield API.get('/article/sort-articles',{
      params:payload
    });

    yield put({type:actionTypes.GET_POPULAR_ARTICLES_SUCCESSFUL, payload:data.data});
  } catch (error) {
    yield put({type:actionTypes.GET_POPULAR_ARTICLES_FAILED, payload:error?.response?.message})
  }
}


function* getFeaturedArticlesSaga(){
  try {
    yield put({type:actionTypes.SET_ARTICLE_CATEGORY_LOADING});
    const { data } = yield API.get('/article/get-featured-articles');

    yield put({type:actionTypes.GET_FEATURED_ARTICLES_SUCCESSFUL, payload:data.data});
  } catch (error) {
    yield put({type:actionTypes.GET_FEATURED_ARTICLES_FAILED, payload:error?.response?.message})
  }
}

function* getBookmarkedArticlesSaga(){
  try {
    yield put({type:actionTypes.SET_ARTICLE_CATEGORY_LOADING});
    const { data } = yield API.get('/article/get-favourite-articles');
 
    yield put({type:actionTypes.GET_BOOKMARKED_ARTICLES_SUCCESSFUL, payload:data});
    
   
  } catch (error) {
    yield put({type:actionTypes.GET_BOOKMARKED_ARTICLES_FAILED, payload:error?.response?.message})
  }
}

// remove bookmarked articles
function* removeBookmarkedArticles({payload}){
  try {
    yield put({type:actionTypes.SET_ARTICLE_CATEGORY_LOADING});
    const { data } = yield API.post(`/article/remove-articles-from-favourite`,payload);

    yield put({type:actionTypes.REMOVE_BOOKMARKED_ARTICLES_SUCCESSFUL, payload:data.message});
    yield put(getBookmarkedArticlesAction());
  } catch (error) {
    yield put({type:actionTypes.REMOVE_BOOKMARKED_ARTICLES_FAILED, payload:error?.response?.message})
  }
}

//add article to bookmark
// remove bookmarked articles
function* bookmarkArticleSaga({payload}){
  try {
    yield put({type:actionTypes.SET_BOOKMARK_LOADER});
    const { data } = yield API.post(`/article/save-article`,payload);
    yield put({type:actionTypes.BOOKMARK_ARTICLE_SUCCESSFUL, payload:data.message});
    payload.from = 'bookmark';
    yield put(getArticleById(payload))
  } catch (error) {
    yield put({type:actionTypes.BOOKMARK_ARTICLE_FAILED, payload:error?.response?.message})
  }
}

// get article by ID
function* getArticleByIdSage({payload}){
  try {
    if(payload.from){
      delete payload.from;
    }
    else{
      yield put({type:actionTypes.SET_ARTICLE_CATEGORY_LOADING});
    }
    
    const { data } = yield API.post(`/article/get-article-by-id`,payload);
    const {articleData} = data?.data

    if(articleData.media_video){
      data.data.articleData.media_images.unshift(articleData.media_video);
    }
    // console.log( data.data.articleData.media_images)
    yield put(getRecommendedProducts({province:data?.data?.articleData?.province?._id}))
    yield put(getRecommendedServices({ recommendedBy:"province_id",province_id:data?.data?.articleData?.province?._id}))
    yield put({type:actionTypes.GET_ARTICLE_BY_ID_SUCCESSFUL, payload:data.data});
    
  } catch (error) {
    yield put({type:actionTypes.GET_ARTICLE_BY_ID_FAILED, payload:error?.response?.message})
    
  }
}

// get recommended services and products
function* getRecommendedProductsSage({payload}){
  try {
    yield put({type:actionTypes.SET_ARTICLE_CATEGORY_LOADING});
    const { data } = yield API.post(`/products/get-recommended-products-by-province`,payload);
    yield put({type:actionTypes.GET_RECOMMENDED_PRODUCTS_SUCCESSFUL, payload:data.data});
    
  } catch (error) {
    yield put({type:actionTypes.GET_RECOMMENDED_PRODUCTS_FAILED, payload:error?.response?.message})
    
  }
}

function* getRecommendedServicesSage({payload}){
  try {
    yield put({type:actionTypes.SET_ARTICLE_CATEGORY_LOADING});
    const { data } = yield API.post(`/services/get-recommended-services`,payload);
    yield put({type:actionTypes.GET_RECOMMENDED_SERVICES_SUCCESSFUL, payload:data.data});
    
  } catch (error) {
    yield put({type:actionTypes.GET_RECOMMENDED_SERVICES_FAILED, payload:error?.response?.message})
    
  }
}

// FILTER AND SORT
// filter
function* sortAndFilterArticlesAction({payload}){
  try {
    yield put({type:actionTypes.SET_ARTICLE_CATEGORY_LOADING});
    const { data } = yield API.post(`/article/get-filtered-sorted-articles`,payload);
 
    yield put({type:actionTypes.SORT_AND_FILTER_ARTICLES_SUCCESSFUL, payload:data.data});
  } catch (error) {
    yield put({type:actionTypes.SORT_AND_FILTER_ARTICLES_FAILED, payload:error?.response?.message})
  }
}


// WATCHERS

export function* watchGetArticleCategories() {
  yield takeLatest(actionTypes.GET_ARTICLE_CATEGORIES, getArticleCategoriesSaga);
}

export function* watchGetArticlesByCategory() {
  yield takeLatest(actionTypes.GET_ARTICLES_BY_CATEGORY, getArticlesByCategorySaga);
}

export function* watchGetPopularArticles() {
  yield takeLatest(actionTypes.GET_POPULAR_ARTICLES , getPopularArticlesSaga);
}

export function* watchGetFeaturedArticles() {
  yield takeLatest(actionTypes.GET_FEATURED_ARTICLES , getFeaturedArticlesSaga);
}

export function* watchGetSortedArticles() {
  yield takeLatest(actionTypes.GET_SORTED_ARTICLES , getSortedArticlesSaga);
}

export function* watchGetFilteredArticles() {
  yield takeLatest(actionTypes.GET_FILTERED_ARTICLES , getFilteredArticlesAction);
}

export function* watchGetBookmarkedArticles() {
  yield takeLatest(actionTypes.GET_BOOKMARKED_ARTICLES , getBookmarkedArticlesSaga);
}

export function* watchRemoveBookmarkedArticles() {
  yield takeLatest(actionTypes.REMOVE_BOOKMARKED_ARTICLES , removeBookmarkedArticles);
}

export function* watchBookmarkArticle() {
  yield takeLatest(actionTypes.BOOKMARK_ARTICLE , bookmarkArticleSaga);
}

export function* watchGetArticleById(){
  yield takeLatest(actionTypes.GET_ARTICLE_BY_ID , getArticleByIdSage);
}

export function* watchGetRecommendedProducts(){
  yield takeLatest(actionTypes.GET_RECOMMENDED_PRODUCTS , getRecommendedProductsSage);
}

export function* watchGetRecommendedServices(){
  yield takeLatest(actionTypes.GET_RECOMMENDED_SERVICES , getRecommendedServicesSage);
}

export function* watchSortAndFilterArticles(){
  yield takeLatest(actionTypes.SORT_AND_FILTER_ARTICLES,sortAndFilterArticlesAction);
}

function* articleSaga() {
  yield all([

    fork(watchGetArticleCategories),
    fork(watchGetArticlesByCategory),
    fork(watchGetPopularArticles),
    fork(watchGetFeaturedArticles),
    fork(watchGetSortedArticles),
    fork(watchGetFilteredArticles),
    fork(watchGetBookmarkedArticles),
    fork(watchRemoveBookmarkedArticles),
    fork(watchBookmarkArticle),
    fork(watchGetArticleById),
    fork(watchGetRecommendedProducts),
    fork(watchGetRecommendedServices),
    fork(watchSortAndFilterArticles)

    
  ]);
}

export default articleSaga;