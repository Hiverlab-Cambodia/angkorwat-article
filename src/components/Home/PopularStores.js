import React,{useEffect}from "react";
import SectionTitle from "../../UI/SectionTitle";
import {setSortByAction}from "../../store/article/actions";
import { useDispatch, useSelector } from "react-redux";
import { carouselSettings } from "../../utils";
import Carousel from "react-slick";
import { BASE_URL } from "../../AxiosInstance/axiosInstance";
import { image1 } from "../../assets/images";
import "../../assets/scss/home.scss";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTranslation } from 'react-i18next';
import qs from 'qs'

const demoImage  = 'https://images.pexels.com/photos/5993005/pexels-photo-5993005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

const PopularStores = ({ history, popularStoresList, displayFor,location }) => {
 
  const [ t,i18n ] = useTranslation('common');
  const language = sessionStorage.getItem('lang');
  const matches = useMediaQuery('(min-width:306px)');
  const dispatch = useDispatch();
  
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
  }, []);

  return displayFor === "article" ? (
    <div>
      <SectionTitle
        title={t('home.most-popular')}
        onClick={() => {
          history.push({ pathname: `/article/most-popular`,search: `?lang=${language}`}); 
          dispatch(setSortByAction({ sort_by: 'popularity' }));
          window.scroll(0,0);
        }}
        customStyles={{marginTop: 20,fontSize: matches ? "14px" : "10px" }}
      />
      <div className="product-carousel" >
        <Carousel {...carouselSettings}>
          {popularStoresList?.[0] &&
            popularStoresList.map((article, index) => (
              <div key={index} className="carousel-img-wrp" style={{ cursor: "pointer" }}
                onClick={() =>
                  history.push({
                    pathname: `article/popular/${article._id}/`,
                    search:`?lang=${language}`,
                    state:{ title:"article-page" ,selectedArticle:article} ,
                  })
                }
            >
              <div style={{ background: article?.media_images[0]?.path ? `url(${BASE_URL}/${article?.media_images?.[0]?.path}) center/cover no-repeat` : `url(${demoImage}) center/cover no-repeat`,
                  position: "relative",
                }}
              >
                   {/* <div className="secondary-carousel-content"><p style={{fontWeight:"500"}}>{  article.title.length > 18 ? article.title.slice(0,18).toLowerCase()+"..."  :  article.title.toLowerCase()}</p><p style={{fontSize:"10px"}}>{article.category?.[0]?.category_name?.toLowerCase()}</p></div>  */}

                <div className="secondary-carousel-content">
                  <p style={{fontWeight:"500"}}>
                    { language === 'en' ?
                     (article?.translations?.en?.title?.length > 18 ? article?.translations?.en?.title.slice(0,18).toLowerCase()+"..."  :  article.translations.en.title.toLowerCase()) 
                     : (article?.translations?.kh?.title?.length > 18 ? article?.translations?.kh?.title.slice(0,18).toLowerCase()+"..."  :  article.translations.kh.title.toLowerCase())}
                     </p>
                  <p style={{fontSize:"10px"}}>
                    { language === 'en' ? 
                    (article?.category?.[0]?.translations?.en?.category_name.toLowerCase())
                    :(article?.category?.[0]?.translations?.kh?.category_name.toLowerCase())}
                  </p>
                </div> 
                   
              </div>
            </div>
         

             
              // <div
              //   key={index}
              //   className="carousel-img-wrp"
              //   style={{ cursor: "pointer"}}
              //   onClick={() =>{
              //     history.push({
              //       pathname: `article/popular/${article._id}`,
              //       state:{ title:"article-page" ,selectedArticle:article} ,
              //     })}}
              // >
              
               
               
              //     <img
              //       src={
              //         article?.article_images?.[0]
              //           ? `${BASE_URL}/${article?.article_images?.[0]}`
              //           : image1
              //       }
              //       alt=""
              //     /> 
              //    <span
              //     className="secondary-carousel-content"><p style={{fontWeight:"500"}}>{  article.title.length > 18 ? article.title.slice(0,18).toLowerCase()+"..."  :  article.title.toLowerCase()}</p><p style={{fontSize:"10px"}}>{article.category?.[0]?.category_name?.toLowerCase()}</p></span>
               
              // </div>
            ))}
        </Carousel>
      </div>
    </div>
  ) : (
    <div>
      <SectionTitle
        title="Most Popular"
        onClick={() => {
          history.push({ pathname: `/Stores` });
        }}
        customStyles={{
          marginTop: 10,fontSize:"14px"
        }}
      />
      <div className="secondary-carousel">
        <Carousel {...carouselSettings}>
          {popularStoresList?.[0] &&
            popularStoresList.map((shop, index) => (
              <div
                key={index}
                className="carousel-img-wrp"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  history.push({
                    pathname: `/Store/${shop?.shop_name}`,
                    state: { shopId: shop._id }
                  })
                }
              >
                <img
                  src={
                    shop?.shop_images?.[0]
                      ? `${BASE_URL}/${shop?.shop_images?.[0]}`
                      : image1
                  }
                  alt=""
                />
              </div>
            ))}
        </Carousel>
      </div>
     
    </div>

  );
};

export default PopularStores;
