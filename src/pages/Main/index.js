import React, { Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import BottomNav from "../../components/Home/BottomNav";
import Header from "../../components/Home/Header";
import Routes from "../../routes";
import { makeStyles } from '@material-ui/core'
import ArticleHeader from "../../components/Article/ArticleHeader";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
const Main = ({location, history}) => {
// console.log(location, history)
  return (
    <div style={{position:'relative',marginTop:location.pathname==='/'? '90px':''}}>
  {/* <Header location={location} history={history} />   */}
     {
       location?.state?.title !== "article-page" ? <div id='main' 
       // style={isMobile ? {} : {height:'calc(100vh - 120px)'}}
       >
         <Switch>
           {
             Routes.map((comp,ind) => (
               <Route key={`${comp.path}-${ind}`} {...comp} />
             ))
           }
         </Switch>
       </div> :
        <div
        // style={isMobile ? {} : {height:'calc(100vh - 120px)'}}
        >
          <Switch>
            {
              Routes.map((comp,ind) => (
                <Route key={`${comp.path}-${ind}`} {...comp} />
              ))
            }
          </Switch>
        </div>
     }
   
    {/* { location?.state?.title !== "article-page" && <BottomNav location={location} history={history} /> } */}
    </div>
  );
};

export default Main;
