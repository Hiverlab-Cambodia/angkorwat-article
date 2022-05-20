import React, { useEffect,useState } from "react";
import { BrowserRouter as Router, Route, Redirect,Switch } from "react-router-dom";

import { createMuiTheme, ThemeProvider, CssBaseline} from "@material-ui/core";

import Main from "./pages/Main";
import { Provider } from "react-redux";
import store from "./store";
import qs from "qs";

import { I18nextProvider,useTranslation } from "react-i18next";
import i18next from "i18next";
import common_en from "./i18n/locales/en.json";
import common_kh from "./i18n/locales/kh.json";

const getLangfromURL = () => {
    
    const location = new URL(window.location.href);
    if (location && location.search) {
      const { token, lang } = qs.parse(location.search, {
      }); 

      // getting token directly from URL and saving in session. this function is called in createMuiTheme
      // which is very next code so we dont have to wait for useEffect to execute
      // if (token) {
      //   sessionStorage.setItem("token", token);
      // }

      if (lang) {
        return lang.toLowerCase();
      }
      return "en";
    } else {
      if(sessionStorage.getItem('lang')){
        return sessionStorage.getItem('lang');
      } else {
        return 'en';
      }
    }
   
}

const getLangFromSession = () => {
  // console.log('ssg',sessionStorage.getItem("lang"))
  let langFromSession = sessionStorage.getItem("lang")
  // console.log(langFromSession)
  if (langFromSession == null) {
    langFromSession = 'en'
  }
  // console.log('check',langFromSession)
  return langFromSession
}

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#1f1f1f",
    },
  },
  typography: {
    fontFamily: getLangfromURL() === 'en' ? ["Montserrat"] : ["NotoSansKhmer"]
  },
});

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      common: common_en,
    },
    kh: {
      common: common_kh,
    },
  },
});


const App = () => {
 
  useEffect(() => {

    const location = new URL(window.location.href);
    // console.log('ll',location)

    if (location && location.search) {
      // console.log('in location if')
      const { token, lang } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      if (lang) {
        sessionStorage.setItem("lang", lang.toLowerCase());
      }
      if (token) {
        sessionStorage.setItem("token", token);
      }
    } else {
      if(!sessionStorage.getItem('lang')){
        // console.log('in location else')
        sessionStorage.setItem(          
          //"token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3R5cGUiOiJlbmRfdXNlciIsInVzZXJfaWQiOiI2MWU0ZmY5NzkzYTc3ZjY4ZDZhYzczNmUiLCJzZXNzaW9uX2lkIjoiZTVlZDM3ZWUtYmE2OC00ZTdmLTlmMGMtOTA4MzBmZDIwMTI1IiwiaWF0IjoxNjQ2ODkyNTExfQ.zJfgcfFEyHy_vuEtt2715TmJRi1KQ1VowHwbDfKiYrc"
          "token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3R5cGUiOiJlbmRfdXNlciIsInVzZXJfaWQiOiI2MTRjNDQyMWQwZTNlODcyOWI2OTQ2NzUiLCJzZXNzaW9uX2lkIjoiZjEyNDM1OTgtNzYwZi00NTE0LWFkZGItNjcxZWIxMjZmZWNmIiwiaWF0IjoxNjUyMjU2MTAzfQ.kLrDBa6o7bgK1QY2ZX3imBg-zINYxXo9-mdjGvO9kM8"
          );
        sessionStorage.setItem("lang", "en");
      }
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          
          <Router>
          <Switch>
              <Redirect exact from="/home" to={`/?lang=${getLangFromSession()}&token=${sessionStorage.getItem('token')}`} />
              <Route path="/" component={Main} />
            </Switch>
          </Router>
          
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default App;
