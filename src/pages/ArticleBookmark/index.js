import {Button,Container,Grid,Typography,Checkbox} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Article from "../../components/Article/Article";
import ArticleLoader from "../../components/Article/ArticleLoader";
import { getBookmarkedArticlesAction,removeBookmarkedArticlesAction, resetArticleSuccessStatusAction } from "../../store/actions";
import SectionTitle from "../../UI/SectionTitle";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import ArticleHeader from "../../components/Article/ArticleHeader";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import {useTranslation} from "react-i18next";
import SuccessToast from '../../UI/SuccessToast';
import ErrorToast from '../../UI/ErrorToast'; 
import BackToTop from "../../UI/BackToTop";

import { makeStyles } from '@material-ui/core/styles';
import qs from 'qs'

const useStyles = makeStyles({
  root: {
    padding:"5px",
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: 3,
    width: 15,
    height: 15,
    border:"2px solid #fff"
  },
  checkedIcon: {
    backgroundColor: '#1f1f1f',
    '&:before': {
      display: 'block',
      width: 15,
      height: 15
    }
  },
});

const ArticleBookmark = ({ history, location }) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const language = sessionStorage.getItem("lang");
  const [t,i18n] =  useTranslation('common');
  let historyHeader = history.location.state?.headerFor;
  let historyCategory= history.location.state?.category?.translations;
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [showCheckbox, setShowCheckBox] = useState(false);
  const [toggleFilter,setToggleFilter] = useState(false);
  const [deleteFor,setDeleteFor] = useState("Single")
  const [articleChecked,setArticleChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedArticle,setSelectedArticle] = useState({});

  const {Article: { bookmarkedArticleList,removeBookmarkedArticles,loading,successB,successBMessage,errorB,errorBMessage}} = useSelector(state => state);
  
  // saving historyHeader and historyCategory to session
  if (historyHeader !== undefined) {
    sessionStorage.setItem('historyHeader',historyHeader)
    sessionStorage.setItem('historyCategory',JSON.stringify(historyCategory))
  }

  const handleClickOpen = (data) => {
    console.log('1')
    setOpen(true);
    setSelectedArticles([data._id])
  };

  const handleMultipleDelete = () => {
    console.log('2')
    setOpen(true);
  }

  const handleClose = (actionStatus,article={}) => {

    if(actionStatus){

      if(deleteFor === "Single" && article){
        let data = {}
        // data.article_ids = [article._id];
        data.article_ids = selectedArticles;
        // console.log(data.article_ids)
        dispatch(removeBookmarkedArticlesAction(data));
        setSelectedArticles([]);
      }

      if(deleteFor === "Multiple"){
  
        if(selectedArticles.length>0){
          const data = {}
          data.article_ids = selectedArticles;
          dispatch(removeBookmarkedArticlesAction(data));
          setSelectedArticles([]);
        }       
      }
      setOpen(false);
    }
    else{
      // if(deleteFor === "Multiple") {
      //   setShowCheckBox(false);
      //   setSelectedArticles([]);
      // }
      setOpen(false);
    }
  };

  const handleCheck = event => {

    if (event.target.checked) {
      //selectedArticles.push(event.target.value);
      setSelectedArticles([...selectedArticles,event.target.value])
    } else {
      if (selectedArticles.indexOf(event.target.value) !== -1) {
        let selectedArrCopy = [...selectedArticles]
        selectedArrCopy.splice(
          selectedArrCopy.indexOf(event.target.value),
          1
        );
        setSelectedArticles([...selectedArrCopy])
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getBookmarkedArticlesAction());
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

  const getGoBackPath = () => {
  
    // restoring historyHeader and historyCategory from session of they are undefined
    if (historyHeader === undefined) {
      historyHeader = sessionStorage.getItem('historyHeader')
      if(sessionStorage.getItem('historyCategory') !== 'undefined') {
        historyCategory = JSON.parse(sessionStorage.getItem('historyCategory'))
      }
    }


    if(historyHeader==="Home") {
      return `/?token=${sessionStorage.getItem('token')}&lang=${sessionStorage.getItem('lang')}`   
    } else if(historyHeader==='most-popular') {
      return `/article/most-popular?lang=${language}`
    } else {
      if(language==='kh'){ 
        return `/article/${historyCategory?.kh?.category_name}?lang=${language}`
      }else{
        return `/article/${historyCategory?.en?.category_name}?lang=${language}`
      }
    }
    
  }

return (
  <div>
    <BackToTop></BackToTop>
    <ArticleHeader 
      setToggleFilter={setToggleFilter} 
      toggleFilter={toggleFilter} 
      headerFor={"Bookmark"} 
      history={history}
      goBackPath={getGoBackPath()}
      // goBackPath={'/home'}
    >
    </ArticleHeader>
    <Container style={{ padding:'0 20px'}}>
      {successB && <SuccessToast open={successB} message={(language==='en'? successBMessage : t('home.Article(s)-removed-from-bookmark'))} />}
      Article(s)-removed-from-bookmark
      {errorB && <ErrorToast open={errorB} message={errorBMessage} />}
      <Container style={{ display: "flex",alignItems: "center",position:'fixed',top:'15px',zIndex:'150',marginLeft:'10px'}}>
        <Typography variant="h6" color="initial" style={{fontSize:"13px",fontWeight:"500"}}>
          {t('home.bookmarks')}
        </Typography>
        { bookmarkedArticleList?.[0] &&
          <span>
            {showCheckbox ? (
            <span style={{display:'flex',margin:'0',padding:'0'}}>
              <div style={{ marginLeft: "10px",marginRight:'8px',display:'flex',alignItems:'center',fontSize:"12px", textTransform:"none",border:'1px solid #fff',borderRadius:'5px',padding:'0px 10px'}}
                onClick={() => {
                  setShowCheckBox(!showCheckbox);
                  setDeleteFor("Single");
                  setSelectedArticles('')
                }}
              >
                {t('home.cancel')}
              </div>
              <div onClick={()=>{handleMultipleDelete()}} style={{display:'flex',alignItems:'center',padding:"0",minWidth:"40px",textTransform:"none"}}>
                {selectedArticles.length!==0 && <DeleteOutlineOutlinedIcon style={{fontSize:"19px"}} />}
              </div>
            </span>
          ) : (
            <div style={{  marginLeft: "10px",display:'flex',alignItems:'center',fontSize:"12px",textTransform:"none",border:'1px solid #fff',borderRadius:'5px',padding:'0px 10px'}}
              onClick={() => {
                setShowCheckBox(!showCheckbox);
                setDeleteFor("Multiple");
              }}
            >
              {t('home.select')}
            </div>
          )}
            </span>
          }
        </Container>

        <Grid container style={{marginTop:'40px'}}>
          {loading ? (
            Array.from({ length: 4 }, (_, index) => (
              <ArticleLoader key={index} />
            ))
          ) : bookmarkedArticleList?.[0] ? (
            bookmarkedArticleList.map((article, index) => (
              <Grid key={`${article.title}-${index}`} item xs={12} spacing={0} >
                <div style={{position: "relative",top: "35px",zIndex: 3,display:"flex",justifyContent:"flex-end",padding:"0 10px"}}>
                  <div style={{display:"flex",alignItems: "center",backgroundColor:"#64646470",borderRadius:"16px",height: showCheckbox ? "auto" :"25px"}}>
                    {showCheckbox ? (<Checkbox
                      className={classes.root}
                      inputProps={{ "aria-label": "primary checkbox" }}
                      onChange={handleCheck}
                      value={article._id}
                      name={`MultipleDelete-${article._id}`}
                      color="primary"
                      size="small"
                      style={{ transform: "scale(0.789)",width: 25,height: 25,}}
                    />) : (
                      <DeleteOutlineOutlinedIcon style={{ fontSize: 25, height:18,width:25 }}  onClick={() => { handleClickOpen(article)}} />
                    )}
                  </div>
                </div>
                <Article
                  displayFor={"Bookmark"}
                  key={article._id}
                  article={article}
                  history={history}
                  location={location}
                  category_title={article?.category?.translations?.en?.category_name}
                />
              </Grid>
            ))
          ) : (
            <div style={{ flex: 1,height: 200,display: "flex",alignItems: "center",justifyContent: "center"}}>
              <Typography variant="body1">{language==='en'? 'No articles in your bookmark!':t('home.No-articles-in-your-bookmark')}</Typography>
            </div>
          )}
        </Grid>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        onBackdropClick="false"
        PaperProps={{style: { borderRadius: 15 } }}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
         {t('home.confirm')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{fontWeight:"300"}}>
            {t('home.article-remove-msg')} { deleteFor === "Multiple" ? <span style={{fontWeight:"500"}}>{selectedArticles.length}</span> :   <span style={{fontWeight:"500"}}>1</span> }  {(selectedArticles.length<=1) ? t('home.article-remove-msge'):t('home.article-remove-msges')}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{padding:'20px',justifyContent:'center'}}>
          <Button size="small"  onClick={()=>{handleClose(false)}} variant="outlined"  style={{borderRadius: '15px',padding:'7px 10px',width:'100px'}}>
          {t('home.cancel')}
          </Button>
          <Button size="small"  onClick={()=>{handleClose(true,selectedArticle)}} variant="contained" style={{borderRadius: '15px',padding:'7px 10px ',width:'100px'}}>
          {t('home.yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ArticleBookmark;
