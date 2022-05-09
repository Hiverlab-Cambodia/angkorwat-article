import React, { useEffect, useState, useRef } from "react";
import ArticleCategory from "../../components/Article/ArticleCategory";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-slick";
import PopularStores from "../../components/Home/PopularStores";
import { fade, makeStyles } from "@material-ui/core";
import ArticleCard from "../../components/Article/Article";
import FilterArticles from "../../components/Article/FilterArticles";
import ArticleHeader from "../../components/Article/ArticleHeader";
import BackToTop from "../../UI/BackToTop";
import HomePageLoader from "../../components/Article/HomePageLoader";
import { useTranslation } from "react-i18next";
import qs from 'qs'
import {
  getArticleCategoriesAction,
  getPopularArticlesAction,
  getFeaturedArticlesAction,
} from "../../store/article/actions";


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    "position": "relative",
    "borderRadius": theme.shape.borderRadius,
    "backgroundColor": fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    "marginRight": theme.spacing(2),
    "marginLeft": 0,
    "width": "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "rgba(0,0,0, 0.6)",
    boxShadow: theme.shadows[5],
    width: "100%",
    height: "100%",
  },
  heading: {},
  accordionOption: {
    padding: "10px 0",
  },
}));

const Home = ({ history, location }) => {

  const classes = useStyles();
  const language = sessionStorage.getItem("lang");
  const [t, i18n] = useTranslation("common");
  const [toggleFilter, setToggleFilter] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);

  // SET QUERY FOR AND QUERY DATA
  const [query, setQuery] = useState({ for: "", data: {} });

  window.scrollTo({top: 0,left: 0,behavior: 'instant'});
  
  const dispatch = useDispatch();
  const {Article: {isCategorySectionLoading,categoryList,popularArticleList,featuredArticleList,articleList,exploreIn,loading},Common: { provinceList },} = useSelector((state) => state);
  const reduxQuery = useSelector((state) => state.Article.query)
  const isInitialMount = useRef(true);
 
  useEffect(() => {
    
    const queryData = {
      page: 1,
      limit: 10,
      sort_by: "popularity",
    };
    dispatch(getPopularArticlesAction(queryData));
    dispatch(getFeaturedArticlesAction());
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location && location.search && location.search !== "") {
      const { token, lang } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      if (token) {
        sessionStorage.setItem("token", token);
      }
      if (lang) {
        sessionStorage.setItem("lang", lang.toLowerCase());
        i18n.changeLanguage(lang.toLowerCase());
      } else {
        i18n.changeLanguage(sessionStorage.getItem('lang'));
      }
    }
  }, [location]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {
    
    if (exploreIn.by !== "") {
      const anchor = window.document.querySelector("#article-categories");
      
      if (anchor) {
        // anchor.scrollIntoView({ block:'center',behavior: 'smooth' });
          window.scroll(0, 620);
      }
    }
  }
  }, [exploreIn]);

  const mainCarouselSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 400,
    arrows: false,
  };

return (
    <div>
      <BackToTop></BackToTop>
      <ArticleHeader
        setToggleFilter={setToggleFilter}
        toggleFilter={toggleFilter}
        toggleSearch={toggleSearch}
        setQuery={setQuery}
        setToggleSearch={setToggleSearch}
        headerFor={"Home"}
        history={history}
      ></ArticleHeader>

      {toggleFilter || toggleSearch ? (
        <div>
          <FilterArticles
            articleList={articleList}
            history={history}
            location={location}
            category_title={"Search Result"}
            headerFor={"Home"}
            displayFor={"Home-Search"}
            query={query}
          ></FilterArticles>
        </div>
      ) : /* Home-page content */
      loading ? (
        <HomePageLoader></HomePageLoader>
      ) : (
        <div>
          <div>
            <Carousel {...mainCarouselSettings}>
              {featuredArticleList.map((article, index) => (
                <div key={`${article?.translations?.en?.title.slice(20, 30)}-${index}`}
                  onClick={() => {
                    history.push({
                      pathname: `/article/featured/${article._id}/`,
                      search: `?lang=${language}`,
                      state: {
                        title: "article-page",
                        selectedArticle: article,
                      },
                    });
                  }}
                >
                  <ArticleCard
                    key={article._id}
                    article={article}
                    history={history}
                    location={location}
                    category_title={language==='en'? (article?.category?.translations?.en?.category_name) :(article?.category?.translations?.kh?.category_name)}
                    displayFor={"Home"}
                  />
                </div>
              ))}
            </Carousel>
          </div>

          <PopularStores
            popularStoresList={popularArticleList.articles}
            history={history}
            displayFor={"article"}
          />

          <div id="article-categories"></div>
          
          <ArticleCategory
            history={history}
            categoryList={categoryList}
            isCategorySectionLoading={isCategorySectionLoading}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
