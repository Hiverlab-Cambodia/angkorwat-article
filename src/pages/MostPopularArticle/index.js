import React, { Fragment, useState, useEffect } from "react";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {getPopularArticlesAction,setSortByAction,} from "../../store/actions";
import ArticleLoader from "../../components/Article/ArticleLoader";
import Article from "../../components/Article/Article";
import ArticleHeader from "../../components/Article/ArticleHeader";
import Button from "@material-ui/core/Button";
import BackToTop from "../../UI/BackToTop";
import FilterArticles from "../../components/Article/FilterArticles";
import Pagination from '@material-ui/lab/Pagination';
import { useTranslation } from 'react-i18next';
import qs from "qs";

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
  pagination:{
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    //marginBottom:'10px'
  },
  paginationNext:{
    marginLeft:"10px"
  }
}));

const MostpopularArticles = ({ history, location }) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const {Article: { loading,popularArticleList,sort_by}} = useSelector((state) => state);
  
  const language = sessionStorage.getItem('lang');
  const [t,i18n] =  useTranslation('common');
  const [toggleFilter, setToggleFilter] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [query,setQuery] = useState({for:'',data:{}});
  const [page,setPage] = useState(1);

  const handlePage = (event,value) =>{

    event.preventDefault();

    setPage(value);
    window.scrollTo({top: 0,left: 0,behavior: 'instant'});
    
    const queryData = {
      page:value,
      limit:10,
      sort_by:sort_by
    }
    dispatch(getPopularArticlesAction(queryData));
  }
  // Initial loading
  useEffect(() => {
    const queryData = {
      page:1,
      limit:10,
      sort_by:'popularity'
    }
    dispatch(getPopularArticlesAction(queryData));
  }, []);

  useEffect(() => {
    window.scrollTo({top: 0,left: 0,behavior: 'instant'});

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

  return (
    <Fragment>
      <BackToTop></BackToTop>
      <ArticleHeader
        setToggleFilter={setToggleFilter}
        toggleFilter={toggleFilter}
        toggleSearch={toggleSearch}
        setQuery={setQuery}
        setToggleSearch={setToggleSearch}
        headerFor={"most-popular"}
        goBackPath={`/?token=${sessionStorage.getItem('token')}&lang=${sessionStorage.getItem('lang')}`}
        // goBackPath={'/home'}
        history={history}
      ></ArticleHeader>

      {toggleFilter || toggleSearch ? (
        <div>
          <FilterArticles
            history={history}
            location={location}
            query={query}
            displayFor="most-popular"
          ></FilterArticles>
        </div>
      ) : (
        <div>
          <Container style={{ paddingBottom: "2rem",marginTop:'100px'}}>
              <Grid container spacing={2}>
                {loading ? (
                  Array.from({ length: 4 }, (_, index) => (
                    <ArticleLoader key={index} />
                  ))
                ) : popularArticleList?.articles?.[0] ? (
                  popularArticleList.articles.map((article, index) => (
                    <Grid key={`${article?.translations?.en?.title}-${index}`} item xs={12}>
                      {" "}
                      <Article
                        key={article?._id}
                        article={article}
                        history={history}
                        location={location}
                        displayFor="most-popular"
                        category_title={article?.category && article?.category.length> 0 && language === 'en' ? 
                        (article?.category?.[0]?.translations?.en?.category_name):
                        (article?.category?.[0]?.translations?.kh?.category_name)}
                      />
                    </Grid>
                  ))
                ) : (
                  <div style={{flex: 1,display: "flex",alignItems: "center",justifyContent: "center",padding: "10px 8px 0px 8px",borderTop: "1px solid rgba(255, 255, 255, 0.23)"}}>
                    <Typography variant="body2">{(language==='en')? t('home.No-articles-for-this-category-are-available'):t('No-articles-for-this-category-are-available')} </Typography>
                  </div>
                )}
              </Grid>            
                { popularArticleList?.total_articles_count > 10 && (
                  <div className={classes.pagination}>
                    <Pagination 
                      count={Math.ceil(popularArticleList?.total_articles_count /10)} 
                      page={page} 
                      onChange={handlePage}  
                      variant="outlined" 
                      shape="rounded" />
                  </div>
                  )}
          </Container>
        </div>
      )}
    </Fragment>
  );
};

export default MostpopularArticles;
