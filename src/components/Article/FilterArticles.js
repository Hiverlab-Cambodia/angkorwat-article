import React, { useState,useEffect } from "react";
import Article from "./Article";
import ArticleLoader from "./ArticleLoader";
import Pagination from '@material-ui/lab/Pagination';
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import {
  getSortedArticlesAction,
  getFilteredArticlesAction,
  sortAndFilterArticles,
} from "../../store/actions";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
  pagination:{
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    marginBottom:'80px'
  },
  paginationNext:{
    marginLeft:"10px"
  }
}));

const  FilterArticles = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [page,setPage] = useState(1);
  const [t,i18n] =  useTranslation('common');
  const {loading,articleList,articleCount,filter_by,query,sort_by} = useSelector((state)=> state.Article)
  const {history,location,displayFor,headerFor} = props;
  const language = sessionStorage.getItem('lang');
console.log(headerFor,displayFor)
  useEffect(() => {
    setPage(1)
  }, [sort_by,filter_by])
  
  const handlePage = (event,value) =>{

    setPage(value);
    window.scrollTo({top: 0,left: 0,behavior: 'instant'});
      
    if(query && query.for === 'filter'){
      const filterData = query.data;
      filterData.page = value;
      filterData.limit = 10;
      dispatch(getFilteredArticlesAction(filterData));
    }

    if(query && query.for === 'sort'){
      const sortData = query.data;
      sortData.page = value;
      sortData.limit = 10;
      dispatch(getSortedArticlesAction(sortData));
    }

    if(query && query.for === 'sort-and-filter'){
      const filterData = query.data;
      filterData.page = value;
      filterData.limit = 10;
      dispatch(sortAndFilterArticles(filterData));
    }
  }
return (
  <div >
    <Container style={{ position:'absolute',top:(Boolean(filter_by.sub_category||filter_by.category || filter_by.location))? (headerFor === "Home")? '55px':'155px' : (headerFor === "Home")? '20px':'125px' }}>
      <Grid container spacing={2} style={{marginBottom:'50px'}}>
        {loading ? ( Array.from({ length: 4 }, (_, index) => (
              <ArticleLoader key={index} />
            ))
          ) : articleList?.articles?.[0] ? (
            articleList.articles.map((article, index) => (
              <Grid key={`${article?.translations?.en?.title}-${index}`} item xs={12} >
                {" "}
                <Article
                  key={article._id}
                  article={article}
                  history={history}
                  location={location}
                  displayFor={displayFor}
                  category_title={language==='en'? (article?.category?.[0]?.translations?.en?.category_name): (article?.category?.[0]?.translations?.kh?.category_name)
                  }
                />
              </Grid>
            ))
          ) : (
            <div style={{flex: 1,height: 200,display: "flex",alignItems: "center",justifyContent: "center"}}>
              <Typography variant="body1">{t('home.No-articles-for-this-category-are-available')}</Typography>
            </div>
          )}
        </Grid>
          {articleList?.total_articles_count  > 10 && (
           <div className={classes.pagination}>
              <Pagination 
                count={Math.ceil(articleList.total_articles_count /10)} 
                page={page} 
                onChange={handlePage}  
                variant="outlined" 
                shape="rounded" />
           </div>
      )}
    </Container>
  </div>
);}

export default FilterArticles;
