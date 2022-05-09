import Home from "../pages/Home";
import Articles from "../pages/Articles";
import ArticleBookmark from '../pages/ArticleBookmark';
import MostpopularArticles from "../pages/MostPopularArticle";
import ArticlePage from '../../src/components/Article/ArticlePage';

const Routes = [
  {path:'/', exact:true,  component: Home},
  {path:'/article', exact:true,  component: Home},
  {path:'/article/bookmarks', exact:true,  component:ArticleBookmark },
  {path:'/article/most-popular', exact:true,  component:MostpopularArticles },
  {path:'/article/:category', exact:true,  component: Articles},
  {path:`/article/:category/:articleId`, exact:false,  component: ArticlePage}
  // {path:'/:category/:articleId', exact:true,  component: ArticlePage},
]

export default Routes;