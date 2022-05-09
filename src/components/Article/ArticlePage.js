import React, { useCallback, useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import Container from "@material-ui/core/Container";
import { BASE_URL } from "../../AxiosInstance/axiosInstance";
import Carousel from "react-slick";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { IconButton, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ShareIcon from "@material-ui/icons/Share";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useDispatch, useSelector } from "react-redux";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import SuccessToast from "../../UI/SuccessToast";
import ErrorToast from "../../UI/ErrorToast";
import { useParams } from "react-router";
import CloseIcon from "@material-ui/icons/Close";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import BackToTop from "../../UI/BackToTop";
import useIntersectionObserver from "../../utils/useIntersectionObserver";
import FsLightbox from 'fslightbox-react';
import ArticlePageLoader from "./ArticlePageLoader";
import qs from 'qs';
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// import ImageCarousel from "./ImageCarousel";
import {useTranslation} from "react-i18next";
import {
  bookmarkArticleAction,
  getArticleById,
  getArticleCategoriesAction,
  resetArticleSuccessStatusAction,
} from "../../store/actions";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  gridListItem: {
    width: "100%",
    height: "100%",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:"linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: " #1f1f1f",
    width: "100%",
    height: "100%",
    boxShadow: theme.shadows[5],
    padding: "20px 7px",
    display: "flex",
    alignItems: "center",
  },

  social_media_sharing_paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "20px",
    display: "flex",
    width: "250px",
    borderRadius: "8px",
    justifyContent: "space-between",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "7px 15px",
    // position: "absolute",
    position: 'fixed',
    top: 0,
    zIndex: 100,
    width: "100%",
    background: 'rgb(45, 45, 45)'
    // backgroundImage: "linear-gradient(to top, #00000000, #000000)",
  },
  header_button: {
    padding: "0",
    margin: "0 5px",
    borderRadius: "100%",
    //backgroundColor: "#1f1f1f63",
    "&:focus": {
      backgroundColor: "#1f1f1f63",
    },
  },
  header_icon: {
    //fontSize: "20px",
    //margin: "3px",
  },
  article_header: {
    fontWeight: 300,
    /* width: 200px; */
    padding: "0 10px 0 16px",
    fontSize: "26px",
    textTransform: "capitalize",
  },
  article_subHeader: {
    fontWeight: 500,
    padding: "0 10px 0 16px",
    fontSize: "10px",
    textTransform: "capitalize",
    color: '#969696',
  },
  article_subCategory: {
    fontWeight: 500,
    padding: "0 10px 0 16px",
    fontSize: "10px",
    textTransform: "capitalize",
    color: '#E0A909',
    textDecorationLine: 'underline'
  },
  article_content: {
    fontWeight: 300,
    /* width: 200px; */
    padding: "0 26px",
    fontSize: "13px",
    marginTop: "30px",
    marginBottom: "80px",
    lineHeight: "27px",
    "& img": {
      height: "auto",
      width: "100% !important",
    },
    "& span": {
      color: "#fff  !important",
      fontFamily: " 'Montserrat', 'Roboto' !important"
    }
  },
  article_content_kh: {
    fontWeight: 300,
    /* width: 200px; */
    padding: "0 26px",
    fontSize: "13px",
    marginTop: "30px",
    lineHeight: "27px",
    "& img": {
      height: "auto",
      width: "100% !important",
    },
    "& span": {
      color: "#fff  !important",
      fontFamily: " 'Battambang', 'Roboto' !important"
    }
  },
  recommendationPanel: {
    margin: "10px 15px",
  },
  closeButton: {
    display: "flex",
    position: "absolute",
    top: 0,
    right: 0,
    padding: "20px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginTop: "0px",

  },
  formControlFocused: {
    backgroundColor: "transparent"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  titleBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: '10px',
    marginTop: '20px'
  },
  selectGroup: {
    fontSize: "12px",
    width: "100px",
    "&:focus": {
      backgroundColor: "transparent"
    }
  }

}));

let fslightboxList = [];

const ArticlePage = ({ history, location, match }) => {
  
  let cameFrom = location?.state?.title
  console.log(cameFrom)
  const [t,i18n] =  useTranslation('common');
 
  const { articleId, category } = useParams();
  const { href: shareLink } = window.location;
  const vidRef = useRef(null);

  const handlePlayVideo = () => {
    if (vidRef) {
      vidRef?.current?.play();
    }
  }

  const handlePauseVideo = () => {
    if (vidRef) {
      vidRef?.current?.pause();
    }
  }

  const [ref, entry] = useIntersectionObserver({ threshold: 0.8 })
  // Should be 80% in the viewport 

  if (entry.isIntersecting) {
    // returns when its equal to or more than 80% in viewport
    // playVideo()
    handlePlayVideo();

  } else {
    //when less than 80% in viewport
    // pauseVideo()
    handlePauseVideo();

  }

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [selectedImagePath, setSelectedImagePath] = useState("");
  const [openHint, setOpenHint] = useState(false);
  const [contentLanguage, setContentLanguage] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleContentData, setArticleContentData] = useState('');
  const [toggler, setToggler] = useState(true);
  const [slideNumber, setSlideNumber] = useState(1);
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);

  const handleContentLanguage = (event) => {

    setArticleContent(event.target.value.content)
    setArticleContentData(event.target.value)
    setContentLanguage(event.target.value);

  };

  const {
    loading,
    articleList,
    articleById: { articleData, hasUserSavedArticle },
    success,
    successMessage,
    errorMessage,
    error,
    recommendedServices,
    recommendedProducts,
    selectedCategory,
    categoryList
  } = useSelector((state) => state.Article);

  const dispatch = useDispatch();
  const language = sessionStorage.getItem("lang");

  const handleBookmark = (e) => {
    dispatch(bookmarkArticleAction({ article_id: articleData._id }));
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getArticleById({ article_id: articleId }));
    dispatch(getArticleCategoriesAction());
  }, []);

  useEffect(() => {

    if (match?.params?.category && categoryList?.length > 0) {
      let tempFind = categoryList.find(cat => cat.translations?.en?.category_name === match.params.category)
      if (tempFind === undefined || tempFind === null) {
        tempFind = categoryList.find(cat => cat.translations?.kh?.category_name === match.params.category)
      }
      setSelectedCategoryData(tempFind)
    }
  }, [match, categoryList])

  useEffect(() => {
   
    if (articleData) {

      let SelectedLanguage = 'en';
      if (location?.search && location.search !== '') {
        SelectedLanguage = qs.parse(location.search, { ignoreQueryPrefix: true })?.lang?.toLowerCase();
      }
     
      if (SelectedLanguage === 'en') {

        setArticleContent(articleData.translations.en.description)
        setArticleContentData(articleData.translations.en.article_content)
        setContentLanguage('en')

      }else if (SelectedLanguage === 'kh') {

        setArticleContent(articleData.translations.kh.description)
        setArticleContentData(articleData.translations.kh.article_content)
        setContentLanguage('kh')

      }else {
        setArticleContent(articleData.translations.en.description)
        setArticleContentData(articleData.translations.en.article_content)
        setContentLanguage('en')
      }
    }

  }, [articleData, location])

  const handleOpen = () => {
    // fslightboxList=articleData?.media_images.map(({path:image}, index) =>(`${BASE_URL}/${image}`))
    // for (let i = 0; i < index; i++) {
    //   let x=fslightboxList.shift();
    //   fslightboxList.push(x)
    // }
    setOpen(true);
    setToggler(!toggler);
    setOpenHint(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseShareModal = () => {
    setOpenShareModal(false);
  };

  const handleOnShare = () => {

    if (navigator.share) {
      navigator
        .share({
          title: articleData?.title,
          text: articleData?.article_description,
          url: document.location.href,
        })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((error) => {
          console.error("Something went wrong sharing the blog", error);
        });
    }
  };

  const mainCarouselSettings = {
    dots: true,
    infinite: false,
    autoplay: false,
    speed: 400,
    arrows: false,
    pauseOnHover: true,
  };


return (
  <div>
    <BackToTop></BackToTop>
    {loading && (<div>{" "} <ArticlePageLoader /> </div>)}
    {success && (<SuccessToast open={success} message={(language === 'en') ? successMessage : (successMessage==='Article saved successfully'? t('home.Article-saved-successfully'): t('home.Article-unsaved-successfully'))}
      handleClose={() => { dispatch(resetArticleSuccessStatusAction());}}/>
    )}
    {!loading && articleData && (
      <Container style={{ padding: 0, wordWrap: "break-word" }}>
        {error && (<ErrorToast open={error} message={errorMessage}
            handleClose={() => {dispatch(resetArticleSuccessStatusAction());}}/>
        )}
        {/* HEADER STRIP */}
        <div className={classes.header}>
          <div>
            <IconButton className={classes.header_button} aria-label="back"
              onClick={() => {
                  if (category === "featured" || category === 'popular') {
                    history.replace({
                      pathname: `/`,
                      search: `?token=${sessionStorage.getItem('token')}&lang=${sessionStorage.getItem('lang')}`
                    });
                  } else if (category === "bookmarks") {
                    history.replace({
                      pathname: `/article/bookmarks`,
                      search: `?lang=${language}`,
                      state:{headerFor:history.location.state?.headerFor,category:history.location.state?.category}
                    });
                  } else {
                    if (cameFrom === "most-popular") {
                      history.replace({
                        pathname: `/article/most-popular`,
                        search: `?lang=${language}`,
                        state:{headerFor:history.location.state?.headerFor}
                      })
                    } else if (cameFrom === "Home-Search") { 
                      history.replace({
                        pathname: `/`,
                        search: `?token=${sessionStorage.getItem('token')}&lang=${sessionStorage.getItem('lang')}`
                      });
                    }else {
                      history.replace({
                        pathname: `/article/${(language === 'en') ? (selectedCategoryData?.translations?.en?.category_name) : (selectedCategoryData?.translations?.kh?.category_name)}`,
                        search: `?lang=${language}`
                      })
                    }

                    // if (selectedCategory) {
                    //   console.log('5')
                    //   history.replace({
                    //     pathname: `/article/${(language === 'en') ? (selectedCategory?.translations?.en?.category_name) : (selectedCategory?.translations?.kh?.category_name)}`,
                    //     search: `?lang=${language}`,
                    //     state: { selectedCategory: selectedCategory, title: ((language === 'en') ? (selectedCategory?.translations?.en?.category_name) : (selectedCategory?.translations?.kh?.category_name)) },
                    //   });
                    // }
                  }
                }}
              >
                <ArrowBackIosIcon className={classes.header_icon} style={{ paddingLeft: "3px" }}/>
          </IconButton>
        </div>
        <div style={{ display: "flex" }}>
          <IconButton className={classes.header_button} aria-label="share">
            <ShareIcon
              className={classes.header_icon}
              onClick={handleOnShare}
            />
          </IconButton>
          <IconButton
            className={classes.header_button}
            aria-label="bookmark"
            onClick={handleBookmark}
          >
            {hasUserSavedArticle ? ( <BookmarkIcon className={classes.header_icon}></BookmarkIcon>
                ) : (
                  <BookmarkBorderIcon className={classes.header_icon} />
            )}
          </IconButton>
              {/* <IconButton className={classes.header_button} aria-label="more">
              <MoreVertIcon className={classes.header_icon} />
            </IconButton> */}
        </div>
      </div>
      <div style={{ marginTop: '40px' }}>
        <Carousel {...mainCarouselSettings}>
          {articleData?.media_images && articleData?.media_images.map(({ path: image }, index) => (
              <div key={`${image.slice(20, 30)}-${index}`}
                onClick={() => {
                  handleOpen();
                  setSlideNumber(index + 1);
                  setSelectedImagePath(`${BASE_URL}/${image}`);
                }}
              >
                {image.includes(".mp4") ? (
                  <div ref={ref}>
                    <video
                      ref={vidRef}
                      width="100%"
                      height="221"
                      controls
                      disablePictureInPicture
                      controlsList="nodownload"
                    >
                      {" "}
                      <source
                        src={`${BASE_URL}/${image}`}
                        type="video/mp4"
                      />{" "}
                    </video>
                  </div>
                ) : (
                  <img
                    src={`${BASE_URL}/${image}`}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "221px",
                    }}
                    alt=""
                  />
                )}
              </div>
            ))}
        </Carousel>
      </div>
      <div style={{ paddingBottom: "5px" }}>
        <div className={classes.titleBar}>
          <Typography className={classes.article_header} >
            {(language === 'en') ? (articleData?.translations?.en?.title.toLowerCase()) : (articleData?.translations?.kh?.title.toLowerCase())}
          </Typography>
              {

              }
        </div>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px 0 10px' }}>
          <Typography className={classes.article_subHeader}>
            {articleData?.createdAt && dayjs(articleData.createdAt).format("DD MMMM YYYY")}
          </Typography>
          <span style={{ border: '0.5px solid #969696', height: '8px', justifyContent: 'space-around' }}></span>
            <Link to={{
              pathname: `/article/${(language === 'en') ? (articleData?.category?.[0]?.translations?.en?.category_name) : (articleData?.category?.[0]?.translations?.kh?.category_name)}`,
              search: `?lang=${language}`,
              }}
              className={classes.article_subCategory}>
                {/* {(language==='en')? (articleData?.translations?.en?.title.toLowerCase()) : (articleData?.translations?.kh?.title.toLowerCase())} */}
              {(language === 'en') ? (articleData?.category?.[0]?.translations?.en?.category_name.toLowerCase()) : (articleData?.category?.[0]?.translations?.kh?.category_name.toLowerCase())}
            </Link>
        </div>
        {articleContent && <Typography component="p" className={contentLanguage === 'Khmer' ? classes.article_content_kh : classes.article_content}>
              {parse(articleContent + "")}
            </Typography>}
        {articleContentData && <Typography component="p" className={contentLanguage === 'Khmer' ? classes.article_content_kh : classes.article_content}>
              {parse(articleContentData + "")}
            </Typography>}
      </div>
    </Container>
    )}

      {/* For recommendations */}
      {/* {!loading && recommendedServices.length > 0 && (
        <div className={classes.recommendationPanel}>
          <Typography>Recommended Experiences</Typography>

          <div style={{ display: "flex", overflow: "auto" }}>
            {recommendedServices.map((service) => (
              <RecommendationCard
                imgPath={`${BASE_URL}/${service?.service_image}`}
                isService={service}
              ></RecommendationCard>
            ))}
          </div>
        </div>
      )}

      {!loading && recommendedProducts.length > 0 && (
        <div className={classes.recommendationPanel}>
          <Typography>Recommended Products</Typography>

          <div style={{ display: "flex", overflow: "auto" }}>
            {recommendedProducts.map((product) => (
              <RecommendationCard
                imgPath={`${BASE_URL}/${product.product_images[0]}`}
                isProduct={product}
              ></RecommendationCard>
            ))}
          </div>
        </div>
      )} */}

      {/* MODAL TO ZOOM IN IMAGE */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        // open={open} setting open to false to disable model
        open={false}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.closeButton}>
              <CloseIcon onClick={handleClose}></CloseIcon>
            </div>

            <SuccessToast
              open={openHint}
              message={"Use two fingers to zoom"}
            />
            <TransformWrapper>
              <TransformComponent>
                <img
                  src={selectedImagePath}
                  style={{ objecFit: "contain", width: "100%" }}
                  alt="test"
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </Fade>
      </Modal>

      <FsLightbox
        toggler={toggler}
        sources={articleData?.media_images && articleData?.media_images.map(({ path: image }, index) => (`${BASE_URL}/${image}`))}
        slide={slideNumber}
      />

      {/* {toggler && articleData && <ImageCarousel articleData={articleData} toggler={toggler} slideNumber={slideNumber} setToggler={setToggler} />}
       */}

      {/* MODAL FOR SOCIAL MEDIA SHARING */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openShareModal}
        onClose={handleCloseShareModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openShareModal}>
          <div className={classes.social_media_sharing_paper}>
            <FacebookShareButton url={shareLink} quote={articleData?.title}>
              <FacebookIcon size={25} round={true}></FacebookIcon>
            </FacebookShareButton>

            <LinkedinShareButton url={shareLink}>
              <LinkedinIcon size={25} round={true}></LinkedinIcon>
            </LinkedinShareButton>
            <PinterestShareButton url={shareLink}>
              <PinterestIcon size={25} round={true}></PinterestIcon>
            </PinterestShareButton>
            <TwitterShareButton url={shareLink}>
              <TwitterIcon size={25} round={true}></TwitterIcon>
            </TwitterShareButton>
            <WhatsappShareButton url={shareLink}>
              <WhatsappIcon size={25} round={true}></WhatsappIcon>
            </WhatsappShareButton>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ArticlePage;
