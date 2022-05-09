import React, { Fragment, useState, useEffect } from "react";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticlesByCategoryAction,
  setQueryAction,
  sortAndFilterArticles,
  setFilterByAction,
  resetArticleSuccessStatusAction,
} from "../../store/actions";
import ArticleLoader from "../../components/Article/ArticleLoader";
import Article from "../../components/Article/Article";
import ArticleHeader from "../../components/Article/ArticleHeader";
import BackToTop from "../../UI/BackToTop";
import FilterArticles from "../../components/Article/FilterArticles";
import Pagination from "@material-ui/lab/Pagination";
import GoToTop from "../../UI/GoToTop";
import qs from "qs";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
  actionButton: {
    borderRadius: 0,
    background: "#333",
    color: "#fff",
    paddingTop: "0.7rem",
    paddingBottom: "0.7rem",
  },
  sortModal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sortModalcontentWrp: {
    width: "min(650px,80%)",
    padding: theme.spacing(2),
  },
  pagination: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    
  },
  paginationNext: {
    marginLeft: "10px",
  },
}));

const Articles = ({ history, location, match }) => {

  const classes = useStyles();
  // Getting language from search query
  let getSearch = 'en'
  getSearch= location?.search.split('=')[1]
  
  const {Article: {loading,articlesByCategoryList,articleList,categoryList,filter_by,sort_by,},} = useSelector((state) => state);

  const dispatch = useDispatch();
  const [toggleFilter, setToggleFilter] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [query, setQuery] = useState({ for: "", data: {} });
  const [page, setPage] = useState(1);
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);
  const [t,i18n] =  useTranslation('common');
  const language = sessionStorage.getItem("lang");
 
  window.scrollTo({top: 0,left: 0,behavior: 'instant'});
  
  useEffect(() => {
    window.scrollTo(0,0)
    if(location && location.search && location.search !==''){
      const { token, lang } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      if(token){
        sessionStorage.setItem('token',token);
      }
      if(lang){
        sessionStorage.setItem('lang',lang.toLowerCase());
        i18n.changeLanguage(lang.toLowerCase());
      }
    }
  }, [location])

  useEffect(() => {
    if (
      match?.params?.category &&
      categoryList?.length > 0 &&
      !selectedCategoryData
    ) {

      let tempFind = categoryList.find((cat) => cat.translations.en.category_name === match.params.category.split("?")[0])
      if(tempFind===undefined || tempFind===null){
        tempFind = categoryList.find((cat) => cat.translations.kh.category_name === match.params.category.split("?")[0])
      }
      setSelectedCategoryData(tempFind)
    }
  }, [match, categoryList]);

  useEffect(() => {
    if (articleList && articleList.articles) {
      //setToggleFilter(true);
    }
  }, [articleList]);

  useEffect(() => {
    if (selectedCategoryData && sessionStorage.getItem('sub_category') == null && sessionStorage.getItem('location')==null) {
      
        dispatch(getArticlesByCategoryAction({
            filter_by: "category",
            category_id: selectedCategoryData._id,
            page: 1,
            limit: 10,
          })
        );
      
    }
  }, [selectedCategoryData,toggleFilter]);

  const handlePage = (event, value) => {
    
    setPage(value);
    window.scrollTo({top: 0,left: 0,behavior: 'instant'});
    
    const queryData = {
      filter_by: "category",
      category_id: selectedCategoryData?._id,
      page: value,
      limit: 10
    };

    dispatch(getArticlesByCategoryAction(queryData));
  };

  return (
    <Fragment>
      <GoToTop />
      <BackToTop></BackToTop>
      <ArticleHeader
        setToggleFilter={setToggleFilter}
        toggleFilter={toggleFilter}
        toggleSearch={toggleSearch}
        setQuery={setQuery}
        setToggleSearch={setToggleSearch}
        headerFor={"articles-by-category"}
        history={history}
        goBackPath={`/?token=${sessionStorage.getItem('token')}&lang=${sessionStorage.getItem('lang')}`}
        category={selectedCategoryData}
        category_title={language==='en'?(selectedCategoryData?.translations?.en?.category_name):(selectedCategoryData?.translations?.kh?.category_name)}
        setPage={setPage}
      ></ArticleHeader>

      {toggleFilter || toggleSearch ? (
        <div>
          <FilterArticles
            history={history}
            location={location}
            query={query}
          ></FilterArticles>
        </div>
      ) : (
        <div>
          <Container style={{  marginTop:'100px',paddingBottom: "2rem", }}>
            <Grid container spacing={2}>
              {loading ? (
                Array.from({ length: 4 }, (_, index) => (
                  <ArticleLoader key={index} />
                ))
              ) : articlesByCategoryList?.articles?.[0] ? (
                articlesByCategoryList.articles.map((article, index) => (
                  <Grid key={`${article.translations.en.title}-${index}`} item xs={12} >
                    {" "}
                    <Article
                      key={article._id}
                      article={article}
                      history={history}
                      location={location}
                      category_title={language==='en'?
                      (selectedCategoryData?.translations?.en?.category_name):
                      (selectedCategoryData?.translations?.kh?.category_name)}
                    />
                  </Grid>
                ))
              ) : (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px 8px 0px 8px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.23)",
                  }}
                >
                  <Typography variant="body2">
                    There is currently no content with this filter
                  </Typography>
                </div>
              )}
            </Grid>

            {articlesByCategoryList?.total_articles_count > 10 && (
              <div className={classes.pagination}>
                <Pagination
                  count={Math.ceil(
                    articlesByCategoryList.total_articles_count / 10
                  )}
                  page={page}
                  onChange={handlePage}
                  variant="outlined"
                  shape="rounded"
                />
              </div>
            )}
          </Container>
        </div>
      )}
    </Fragment>
  );
};

export default Articles;
