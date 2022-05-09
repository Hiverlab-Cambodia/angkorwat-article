import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  SwipeableDrawer,
  Slide,
  List,
  Button,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BottomNav from "./BottomNav";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ExploreIcon from "@material-ui/icons/Explore";
import MailIcon from "@material-ui/icons/Mail";
import clsx from "clsx";
import MoreIcon from "@material-ui/icons/MoreVert";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { useDispatch, useSelector } from "react-redux";
import { bookmarkArticleAction ,getBookmarkedArticlesAction} from "../../store/actions";

const HideOnScroll = props => {
  const { children, isNavVisible } = props;


  return (
    <Slide appear={false} direction="up" in={isNavVisible}>
      {children}
    </Slide>
  );
};

const useStyles = makeStyles(theme => ({
  article_bookmark:{

    background:"transparent"

  },
  root: {
    flexGrow: 1,
    background: theme.palette.background.default
  },
  menuButton: {
  
  },
  appBar: {
    top: "auto",
    bottom: 0
  },
  title: {
    flexGrow: 1,
    // display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    display: "none",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  }
}));

const Header = props => {

  const { location, history } = props;
  const articlePageStyle =  {backgroundColor:"transparent",position:"absolute" , boxShadow:"none"} ;
 
  const classes = useStyles();
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [title,setTitle] = useState("Home");
  const headerRef = useRef(null);

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {


    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  useEffect(() => {

   if(location.pathname === "/"){ setTitle("Marketplace Home")}
   if(location?.state?.title === "article-page"){setTitle("")}
   else if(location?.state?.title){
     setTitle(location?.state?.title)
   }
   else{
     setTitle(`Marketplace ${location.pathname.slice(1)}`)
   }
   
  },[location,location.state])

  // useLayoutEffect(() => {
  //     window.scrollTo(0,0);
  // }, [location])

  const handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset + 250;
    if (windowBottom >= docHeight) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }
  };

  const SidebarData = [
    // {
    //   text: "Shop",
    //   icon: <ShoppingBasketIcon />
    // },
    {
      text: "Article",
      icon: <MenuBookIcon />
    }
    // {
    //   text: "Discover",
    //   icon: <ExploreIcon />
    // }
  ];
  const list = anchor => (
    <div>
      <List>
        {SidebarData.map((data, index) => (
          <ListItem
            button
            key={index}
            onClick={() => {
              history.push(`/${data.text.toLowerCase()}`);
              setSidebarStatus(false);
            }}
          >
            <ListItemIcon>{data.icon}</ListItemIcon>
            <ListItemText primary={data.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const {
    Article: { bookmarkArticle , bookmarkedArticleList }
  } = useSelector(state => state);

  const dispatch = useDispatch();

  const [bookmark,setBookmark]=useState(false);


  useEffect(() => {
   
    const article_id = location?.state?.selectedArticle?._id
    
    if(bookmarkedArticleList.some(item => item._id === article_id)){
      setBookmark(true);
    }
    else{
      setBookmark(false);
    }


  }, [location.state]);

  const handleArticleBookmark = () =>{

    if(location?.state?.selectedArticle)
    {
      const data= {};
      data.article_id = location.state.selectedArticle?._id;

      if(data.article_id){

        dispatch(bookmarkArticleAction(data));
        setBookmark(!bookmark);
      }

    }
   
  }
  return (
    <div className={classes.root} ref={headerRef}>
      <AppBar color="inherit" position="static" >
        <Toolbar>
        <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => history.goBack()}
          >
            <ArrowBackIosIcon style={{ fontSize: "1.2rem" }} />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {title}
          </Typography>
          <IconButton aria-label="search" color="inherit">
           { 
                location?.state?.title === "article-page" 
                ? 
                 bookmark === true ? <BookmarkIcon  onClick={handleArticleBookmark} />  :<BookmarkBorderIcon  onClick={handleArticleBookmark} /> 
                : <SearchIcon /> } 
          </IconButton>
          <IconButton
            aria-label="display more actions"
            edge="end"
            color="inherit"
            onClick={() => setSidebarStatus(true)}
          >
            <MoreIcon />
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => setSidebarStatus(true)}
          >
            <MenuIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor={"right"}
        open={sidebarStatus}
        onClose={() => setSidebarStatus(false)}
        onOpen={() => setSidebarStatus(true)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        {list("right")}
      </SwipeableDrawer>
      <HideOnScroll {...props} isNavVisible={isNavVisible}>
        <AppBar color="inherit" className={classes.appBar}>
          <Toolbar>
            <BottomNav location={location} history={history} />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  );
};

export default Header;
