import React, { useEffect, useState,useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { Button, Container, Fade, Backdrop } from "@material-ui/core";
// import SuccessToast from "../../UI/SuccessToast";
//import ErrorToast from "../../UI/ErrorToast";
import ErrorToastv1 from "../../UI/ErrorToastv1";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Modal from "@material-ui/core/Modal";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getAllProvince,getAllLocations} from "../../store/actions";
import SortIcon from "@material-ui/icons/Sort";
import CloseIcon from "@material-ui/icons/Close";
import FilterListIcon from "@material-ui/icons/FilterList";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "../../assets/scss/home.scss";
import {useTranslation} from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
// import qs from 'qs'
import {
  getArticleCategoriesAction,
  getFilteredArticlesAction,
  getSortedArticlesAction,
  resetExploreIn,
  resetSortFilterQuerySearch,
  setExploreInAction,
  setFilterByAction,
  setQueryAction,
  setSearchAction,
  setSortByAction,
  sortAndFilterArticles,
  getArticlesByCategoryAction
} from "../../store/article/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: "0px",
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  },
  searchIcon: {
    padding: "0 8px",
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  closeIcon: {
    padding: "0 8px",
    height: "100%",
    position: "absolute",
    display: "flex",
    top: "0",
    right: "0",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: "5px 5px 5px 0",
    // vertical padding + font size from searchIcon
    paddingLeft: `5px`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backdropFilter: "blur(10px)",
    backgroundColor: "#1f1f1fdb",
    boxShadow: theme.shadows[5],
    width: "100%",
    height: "100%",
    fontSize: "13px",
    height: "100%",
    overflowY: "scroll",
  },
  heading: {
    fontSize: "13px",
    fontWeight: "500",
  },
  accordionOption: {
    padding: "10px 0",
    fontSize: "13px",
    "&:hover": {
      color: "#4285F4",
      cursor: "pointer",
    },
    "&:active": {
      color: "#4285F4",
      cursor: "pointer",
      textDecoration: "underline",
    },
    "&:visited": {
      color: "#4285F4",
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  selectedItem: {
    padding: "10px 0",
    fontSize: "13px",
    color: "#4285F4",
    textDecoration: "underline",
  },
  menuButton: {
    padding: "0 5px",
    fontSize: "10px",
  },
  label: {
    fontSize: "13px",
  },
  backdrop:{
    backgroundColor:'transparent',
    zIndex:99
  },

}));

const ArticleHeader = (props) => {
  
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    setToggleFilter,
    toggleFilter,
    toggleSearch,
    setQuery,
    setToggleSearch,
    headerFor,
    history,
    location,
    category,
    category_title,
    goBackPath,
    setPage
  } = props;

  const [t,i18n] =  useTranslation('common');
  // console.log(t,i18n)
  const matches = useMediaQuery("(min-width:306px)");
  const [open, setOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [openError, setOpenError]=useState(false);

  // SORT & FILTER
  const [openSort, setOpenSort] = useState(false);
  const [filterData, setFilterData] = useState(null);

  // SEARCH
  const [search, setSearch] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const language = sessionStorage.getItem("lang");

  let exploreInLang = '';

  const {
    Article: { categoryList, sort_by, filter_by, search_by, query, exploreIn,articleList},
    Common: { provinceList, locationsList},
  } = useSelector((state) => state);

  const filter_byRef = useRef(filter_by);
  filter_byRef.current = filter_by;
  
  // store category in session database
  if(category !== null && category !== undefined) {
    sessionStorage.setItem('prop_category',JSON.stringify(category));
  }

  useEffect(() => {

    dispatch(getArticleCategoriesAction());
    dispatch(getAllLocations());

    // Handling search
    let session_search_title = sessionStorage.getItem('search_title')
    if(session_search_title!== null){
      setSearchTitle(session_search_title)
      setSearch(session_search_title)
      handleSearch(undefined,session_search_title)
    }
    // temple Storage
    let session_by= sessionStorage.getItem('by')
    let session_lable= sessionStorage.getItem('label')
    let session_label_id = sessionStorage.getItem('label_id')
    let session_selected_data= JSON.parse(sessionStorage.getItem('selectedData'));

    if (session_by!==null && session_lable!==null && session_label_id!==null && session_selected_data!==null){
      dispatch(setExploreInAction({
          by: session_by,
          label:session_lable,
          label_id:session_label_id
        })
      );

      dispatch(setFilterByAction({
          filter_by: {
            ...filter_by,
            location: session_selected_data,
          },
        })
      );
      if(headerFor!=='Home'){
        sessionStorage.setItem('location',JSON.stringify(session_selected_data));
      }
    }
    // handling filter after store
    let sessionFilter_cat =  JSON.parse(sessionStorage.getItem('category'));
    let sessionFilter_sub =  JSON.parse(sessionStorage.getItem('sub_category'));
    let sessionFilter_location = JSON.parse(sessionStorage.getItem('location'));
   
    if(sessionFilter_sub!==null && sessionFilter_location!==null){
      dispatch(setFilterByAction({

          filter_by: {
            ...filter_by,
            sub_category: sessionFilter_sub,
            location:sessionFilter_location
          },
        })
      );
      setTimeout(handleFilter,100);
    } else if (sessionFilter_cat!==null && sessionFilter_location!==null) {
        dispatch(setFilterByAction({
            filter_by: {
              ...filter_by,
              category: sessionFilter_cat,
              location:sessionFilter_location
            },
          })
        );
        setTimeout(handleFilterMp,100);
    } else if(sessionFilter_sub!==null){
      dispatch(setFilterByAction({
          filter_by: {
            ...filter_by,
            sub_category: sessionFilter_sub,
          },
        })
      );
      setTimeout(handleFilter,100);
    } else if(sessionFilter_cat!==null){
      dispatch(setFilterByAction({
          filter_by: {
            ...filter_by,
            sub_category: sessionFilter_cat,
          },
        })
      );
      setTimeout(handleFilterMp,100);
    // } else if(sessionFilter_location!==null && headerFor !== "Home"){
    } else if(sessionFilter_location!==null){
      dispatch(setFilterByAction({
          filter_by: {
            ...filter_by,
            location:sessionFilter_location,
          },
        })
      );
      if(headerFor==='most-popular' || headerFor==='Home'){
        setTimeout(handleFilterMp,100);
      } else {
        setTimeout(handleFilter,100);
      }
    }
  }, []);

  if(locationsList!=[]){
    let provinceList = locationsList?.province 
    let templeList = locationsList?.temple
  
    if (provinceList!== undefined && templeList!==undefined && exploreIn.label_id!==""){
      
      let allList = [...provinceList, ...templeList]
      exploreInLang = allList.filter(el=>el._id===exploreIn.label_id)[0].translations[language]
      
    }
  }

  // remove session storage
  const removeSession_c =()=>{
    sessionStorage.removeItem('category')
  }
  const removeSession_sc =()=>{
    sessionStorage.removeItem('sub_category')
    sessionStorage.removeItem('prop_category')
  }
  const removeSession_l =()=>{
    sessionStorage.removeItem('location')
  }

  // handale search
  const handleSearch = (e,staleSearch) => {

    if(e!=undefined){
      e.preventDefault();
    }
    if (search.trim() !== "" || staleSearch !== "") {
      const filterData = {};
      filterData.filter_by = "title";
      filterData.title = search;
      if(staleSearch !== "") {
        filterData.title = staleSearch;
      } 
      filterData.lang=language;

      // category wise search
      if (category?._id){
        filterData.category_id = category._id;
      }

      if (filterData.filter_by) {
        
        filterData.page = 1;
        filterData.limit = 10;

        dispatch(getFilteredArticlesAction(filterData));
        dispatch(setSearchAction({ search_by: search }));
        setQuery({
          for: "filter",
          data: filterData,
        });
        dispatch(setQueryAction({ query: {
          for: "filter",
          data: filterData,
        }}));
        setToggleSearch(true);
        sessionStorage.setItem('search_title',search)
        setSearch("");
      }
    }
    setIsSearchFocused(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  //handale close

  const handleClose = (filterData) => {

    if (filterData.filter_by) {

      filterData.page = 1;
      filterData.limit = 10;
      setFilterData(filterData);

      if (sort_by !== "" && sort_by !== "clear") {
       
        filterData.sort_by = sort_by;
        dispatch(sortAndFilterArticles(filterData));

        const queryData = {
          for: "sort-and-filter",
          data: filterData,
        };
        dispatch(setQueryAction({ query: queryData }));
      } else {
        dispatch(getFilteredArticlesAction(filterData));

        const queryData = {
          for: "filter",
          data: filterData,
        };

        dispatch(setQueryAction({ query: queryData }));
      }
      setToggleFilter(true);
    }
    setOpen(false);
  };

  // FOR FILTER
  const handleFilter = (closeFor) => {
 
    let subCategoryFilter = filter_byRef.current.sub_category;
    let locationFilter = (language==='en')? filter_byRef.current?.location?.translations?.en?.province_name: filter_byRef.current?.location?.translations?.kh?.province_name;
    let templeFilter = (language==='en')? filter_byRef.current?.location?.translations?.en?.temple_name : filter_byRef.current?.location?.translations?.kh?.temple_name;
    let titleFilter = searchTitle !== "";
   
    if((subCategoryFilter===null ||subCategoryFilter===undefined) && (locationFilter===null ||locationFilter===undefined)&& (templeFilter===null||templeFilter===undefined)){
      setOpenError(true)
    }else{
      if(closeFor){

        if(closeFor === 'sub_category')
        {
          subCategoryFilter = null;
        }

        if(closeFor === 'location')
        {
          locationFilter = null;
          templeFilter = null;
        } else {
          dispatch( setExploreInAction({
              by: "Location", 
              label: filter_byRef.current?.location?.translations.en.province_name === undefined ? (filter_byRef?.current?.location?.translations?.en?.temple_name === undefined ? 'All locations' : filter_byRef?.current?.location?.translations?.en?.temple_name) : filter_byRef?.current?.location?.translations?.en?.province_name,
              label_id: filter_byRef.currenty?.location?._id === undefined ? "" : filter_byRef.currenty?.location?._id
            })
          );
        }
    }

    const filterData = {};
    filterData.sort_by = sort_by;
    filterData.page = 1;
    filterData.limit = 10;

    if ((category === null || category === undefined) && (sessionStorage.getItem('prop_category') === null || sessionStorage.getItem('prop_category') === undefined)) {
      return;
    }

    if(subCategoryFilter && locationFilter && titleFilter) {
     
      filterData.filter_by = "category-title-sub_category-province";
      filterData.category_id = (category !== null && category !== undefined) ? category._id : JSON.parse(sessionStorage.getItem('prop_category'))._id
      filterData.sub_category_id = subCategoryFilter._id;
      filterData.province_id = filter_byRef.current.location._id;
      filterData.title = searchTitle;

    }else if (subCategoryFilter && templeFilter && titleFilter){
     
      filterData.filter_by = "category-title-sub_category-temple";
      filterData.category_id = (category !== null && category !== undefined) ? category._id : JSON.parse(sessionStorage.getItem('prop_category'))._id
      filterData.sub_category_id = subCategoryFilter._id;
      filterData.temple_id = filter_byRef.current.location._id;
      filterData.title = searchTitle;

    }else if(subCategoryFilter && titleFilter) {
     
      filterData.filter_by = "category-title-sub_category";
      filterData.category_id = (category !== null && category !== undefined) ? category._id : JSON.parse(sessionStorage.getItem('prop_category'))._id
      filterData.sub_category_id = subCategoryFilter._id;
      filterData.title = searchTitle;

    }else if(locationFilter && titleFilter) {
     
      filterData.filter_by = "category-title-province";
      filterData.category_id = (category !== null && category !== undefined) ? category._id : JSON.parse(sessionStorage.getItem('prop_category'))._id
      filterData.province_id = filter_byRef.current.location._id;
      filterData.title = searchTitle;

    }else if(templeFilter && titleFilter) {
     
      filterData.filter_by = "category-title-temple";
      filterData.category_id = (category !== null && category !== undefined) ? category._id : JSON.parse(sessionStorage.getItem('prop_category'))._id
    
      filterData.temple_id = filter_byRef.current.location._id;
      filterData.title = searchTitle;

    }else if(titleFilter) {
     
      filterData.filter_by = "category-title";
      filterData.category_id = (category !== null && category !== undefined) ? category._id : JSON.parse(sessionStorage.getItem('prop_category'))._id
      filterData.title = searchTitle;

    }else if(subCategoryFilter && locationFilter) {
     
      filterData.filter_by = "category-sub_category-province";
      filterData.category_id = (category !== null && category !== undefined) ? category._id : JSON.parse(sessionStorage.getItem('prop_category'))._id
      filterData.sub_category_id = subCategoryFilter._id;
      filterData.province_id = filter_byRef.current.location._id;

    }else if (subCategoryFilter && templeFilter)
    {
     
      filterData.filter_by = "category-and-temple";
      filterData.category_id = (category !== null && category !== undefined) ? category._id : JSON.parse(sessionStorage.getItem('prop_category'))._id
      filterData.temple_id = filter_byRef.current.location._id;
    } else if (subCategoryFilter) {
     
      filterData.filter_by = "category-and-sub-category";
      filterData.category_id = (category !== null && category !== undefined) ? category._id : JSON.parse(sessionStorage.getItem('prop_category'))._id
      filterData.sub_category_id = subCategoryFilter._id;

    } else if (locationFilter) {
     
      filterData.filter_by = "category-and-province";
      filterData.category_id = (category !== null && category !== undefined) ? category._id : JSON.parse(sessionStorage.getItem('prop_category'))._id
      filterData.province_id = filter_byRef.current.location._id;
    }else if (templeFilter) {
     
      filterData.filter_by = "category-and-temple";
      filterData.category_id = (category !== null && category !== undefined) ? category._id : JSON.parse(sessionStorage.getItem('prop_category'))._id
      filterData.temple_id = filter_byRef.current.location._id;

    }else {
      return;
    }

    const queryData = {
      for: "sort-and-filter",
      data: filterData,
    };
    
    dispatch(setQueryAction({ query: queryData }));
    dispatch(sortAndFilterArticles(filterData));
    setToggleFilter(true);
    setOpen(false);
    }
  };
  //=================Handale FilterClear=========
  const handaleFilterClear = () => {
    dispatch(setExploreInAction({ 
        by: "", 
        label: 'All locations',
        label_id: ''
      })
    );
    dispatch(setFilterByAction({
        filter_by: {
          ...filter_by,
          sub_category: null,
          location: null
        },
      })
    );
    removeSession_sc();
    removeSession_l();
    sessionStorage.removeItem('by')
    sessionStorage.removeItem('label')
    sessionStorage.removeItem('label_id')
    sessionStorage.removeItem('selectedData');
  }
  //====================== Handle filter category mostpopular=====================
  const handleFilterMp = (closeFor) => {
   
    let CategoryFilter = filter_byRef?.current.category;
    let locationFilter = (language==='en')? filter_byRef?.current?.location?.translations?.en?.province_name: filter_byRef?.current?.location?.translations?.kh?.province_name;
    let templeFilter = (language==='en')? filter_byRef?.current?.location?.translations?.en?.temple_name : filter_byRef?.current?.location?.translations?.kh?.temple_name;
    let titleFilter = searchTitle !== "";

    if((CategoryFilter===null ||CategoryFilter===undefined) && (locationFilter===null ||locationFilter===undefined)&& (templeFilter===null||templeFilter===undefined)){
      setOpenError(true)
    }else{

    if(closeFor){

      if(closeFor === 'category')
      {
        CategoryFilter = null;
      }

      if(closeFor === 'location'){
        locationFilter = null;
        templeFilter = null;
      } else {

        dispatch(setExploreInAction({
            by: "Location", 
            label: filter_byRef?.current?.location?.translations?.en?.province_name === undefined ? (filter_byRef?.current?.location?.translations?.en?.temple_name === undefined ? 'All locations' : filter_byRef?.current?.location?.translations?.en?.temple_name) : filter_byRef?.current?.location?.translations?.en?.province_name,
            label_id: filter_byRef?.currenty?.location?._id === undefined ? "" : filter_byRef.currenty?.location?._id
          
          })
        );
      }
    }

    const filterData = {};
    filterData.sort_by = sort_by;
    filterData.page = 1;
    filterData.limit = 10;
    filterData.page_type='most-popular'

    if(CategoryFilter && titleFilter && locationFilter ){

      filterData.filter_by = "category-title-province";
      filterData.category_id =  CategoryFilter._id;
      filterData.province_id = filter_byRef.current.location._id;
      filterData.title = searchTitle;
      
    }else if(CategoryFilter && titleFilter && templeFilter ){

      filterData.filter_by = "category-title-temple";
      filterData.category_id =  CategoryFilter._id;
      filterData.temple_id = filter_byRef.current.location._id;
      filterData.title = searchTitle;
      
    }else if(CategoryFilter && titleFilter){

      filterData.filter_by = "category-title";
      filterData.category_id =  CategoryFilter._id;
      filterData.title = searchTitle;

    }else if(locationFilter && titleFilter){

      filterData.filter_by = "title-province";
      filterData.province_id = filter_byRef.current.location._id;
      filterData.title = searchTitle;

    }else if(templeFilter && titleFilter){

      // filterData.filter_by = "temple-title";
      filterData.filter_by = "title-temple";
      filterData.temple_id = filter_byRef.current.location._id;
      filterData.title = searchTitle;

    }else if (CategoryFilter && locationFilter) {

      filterData.filter_by = "category-and-province";
      filterData.category_id =  CategoryFilter._id 
      filterData.province_id = filter_byRef.current.location._id;

    }else if (CategoryFilter && templeFilter){

      filterData.filter_by = "category-and-temple";
      filterData.category_id =  CategoryFilter._id 
      filterData.temple_id = filter_byRef.current.location._id;

    } else if (CategoryFilter) {

      filterData.filter_by = "category";
      filterData.category_id =  CategoryFilter._id ;

    } else if (locationFilter) {

      filterData.filter_by = "province";
      filterData.province_id = filter_byRef.current.location._id;

    }else if (templeFilter) {

      filterData.filter_by = "temple";
      filterData.temple_id = filter_byRef.current.location._id;

    }else if (titleFilter) {

      filterData.filter_by = "title";
      filterData.title = searchTitle;

    }else {
      return;
    }
    const queryData = {
      for: "sort-and-filter",
      data: filterData,
    };
  
    dispatch(setQueryAction({ query: queryData }));
    dispatch(sortAndFilterArticles(filterData));
    setToggleFilter(true);
    setOpen(false);
    }
  };

  //===============Clear filter=============
  const handaleFilterMpClear =()=>{

    dispatch(resetExploreIn());
    dispatch(setFilterByAction({filter_by: { ...filter_by, category: null,location: null }}));
    sessionStorage.removeItem('by')
    sessionStorage.removeItem('label')
    sessionStorage.removeItem('label_id')
    sessionStorage.removeItem('selectedData');
    sessionStorage.removeItem('location');
    removeSession_sc()
    removeSession_l()
    removeSession_c();
    handleFilter("category");
  }

  const handaleFilterHomeClear =()=>{
    dispatch(resetExploreIn());
    dispatch(setFilterByAction({filter_by: { ...filter_by, category: null,location: null }}));
    sessionStorage.removeItem('by')
    sessionStorage.removeItem('label')
    sessionStorage.removeItem('label_id')
    sessionStorage.removeItem('selectedData');
    sessionStorage.removeItem('location');
    removeSession_sc()
    removeSession_l()
    removeSession_c();
    sessionStorage.removeItem('search_title');
  }
  // ========== FOR SORT ================

  const handleSort = () => {
    setOpenSort(true);
  };

  const handleSortBy = (event) => {

    const { value } = event.target;
  
    if (value !== "clear") {

      dispatch(setSortByAction({ sort_by: value }));
      let sortData = {}
      if (query?.data) {
        sortData = query?.data;
      }
      sortData.page = 1;
      sortData.limit = 10;

      if (headerFor !== "most-popular" && headerFor!=="Home") {
        sortData.category_id = category._id;
      }

      sortData.sort_by = value.toLowerCase();

      if (filter_by !== "" && filter_by !== "All locations" && filter_by.sub_category!==null) {
        sortData.sort_by = value;
        let sortAndFilterData;
       
        if (filterData) {
          sortAndFilterData = {
            ...filterData,
            ...sortData,
          };

        } else {
          sortAndFilterData = {
            ...query.data,
            ...sortData,
          };

        }
        
        dispatch(sortAndFilterArticles(sortAndFilterData));

        const queryData = {
          for: "sort-and-filter",
          data: sortAndFilterData,
          
        };
       
        dispatch(setQueryAction({ query: queryData }));
      
      } else {
       
        if(search_by != "") {
          dispatch(sortAndFilterArticles(sortData));
          const queryData = {
            for: "sort",
            data: sortData,
          };
          dispatch(setQueryAction({ query: queryData }));
        }else{
          dispatch(getSortedArticlesAction(sortData));
          const queryData = {
            for: "sort",
            data: sortData,
          };
          dispatch(setQueryAction({ query: queryData }));
        }
      }
      setToggleFilter(true);

    } else if (value === "clear") {
   
      dispatch(setSortByAction({ sort_by: value }));

      if (filterData) {
        dispatch(getFilteredArticlesAction(filterData));
        const queryData = {
          for: "filter",
          data: filterData,
        };

        dispatch(setQueryAction({ query: queryData }));

      } else {
        setToggleFilter(false);
      }
    }
    setOpenSort(false);
  };

  // Home page 
  const homePageFiltersRender = () => {
    return (
      // Explore home
      <div style={{position:'fixed',top:'55px',padding:'0 0 10px 0',background:'rgb(45, 45, 45)',display: "flex",alignItems: "center",justifyContent: "center",fontSize: matches ? "13px" : "9px",fontWeight: "500",width:'100%',zIndex:'150',}}>
        <div style={{ marginRight: "20px"}}>{t('home.explore')} :</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{display: "flex",alignItems: "center",border: "1px solid rgba(255, 255, 255, 0.23)"}}>
            
            <Button style={{borderRadius: "0",padding: "3px 10px",fontWeight: "500",textTransform: "Capitalize",fontSize: matches ? "13px" : "9px"}}
              onClick={handleOpen}>
              <LocationOnOutlinedIcon style={{ fontSize: "20px" }}></LocationOnOutlinedIcon>{" "}
              <span style={{ borderLeft: "1px solid #fff",marginLeft: "5px",paddingLeft: "10px"}}>
                {exploreIn?.label == 'All locations'? t('home.all-locations'): exploreInLang.temple_name || exploreInLang.province_name}
              </span>
            </Button>

            {exploreIn?.label!=='All locations' && (
              <CloseSharpIcon style={{ fontSize: "16px", marginRight: "5px"}}
                onClick={() => {
                  window.scrollTo(0, 0);
                  setToggleFilter(false);
                  dispatch(resetExploreIn());
                  dispatch(setFilterByAction({
                      filter_by: { ...filter_by, location: null },
                    })
                  );
                  sessionStorage.removeItem('by')
                  sessionStorage.removeItem('label')
                  sessionStorage.removeItem('label_id')
                  sessionStorage.removeItem('selectedData');
                  sessionStorage.removeItem('location');
                  removeSession_sc()
                  removeSession_l()
                }}

              ></CloseSharpIcon>
            )}
          </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{timeout: 500}}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <div style={{display: "flex",alignItems: "center",padding: "13px 13px"}}>
                  <div style={{display: "flex",alignItems: "center",marginRight: "18px"}}>
                    <ArrowBackIosSharpIcon style={{fontSize:'20px'}} onClick={handleClose}></ArrowBackIosSharpIcon>
                  </div>{" "}
                <div>{t('home.location-modal-title')}</div>{" "}
              </div>
              <div style={{display: "flex",alignItems: "center",fontSize: matches ? "13px" : "9px",borderBottom: "1px solid #525660",paddingBottom: "10px",paddingLeft: "55px"}}>
                <div style={{marginRight:"20px"}}>{t('home.explore')}</div>
                  <Button variant="outlined" disabled style={{borderRadius: "0",padding: "3px 10px",fontWeight: "500",textTransform: "Capitalize",fontSize: matches ? "13px" : "9px"}}>
                    <LocationOnOutlinedIcon style={{ fontSize: "20px" }}></LocationOnOutlinedIcon>{" "}
                    <span style={{ borderLeft: "1px solid #fff",marginLeft: "5px",paddingLeft: "10px",color: "#4285F4",fontSize: matches ? "13px" : "9px"}}>
                      {exploreIn?.label == 'All locations'? t('home.all-locations'): exploreInLang.temple_name || exploreInLang.province_name}
                    </span>
                  </Button>
                </div>
                {/* ====================== HOME PAGE TEMPLE =====================*/}
                <Accordion style={{ margin: "0",borderRadius: "0",backgroundColor: "transparent",borderBottom: "1px solid #525660"}} defaultExpanded={true}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography className={classes.heading}> {t('home.by-temple')}</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{display: "flex",flexDirection: "column",justifyContent: "space-around",paddingTop: "10px",paddingLeft: "22px"}}>
                  {/* new */}
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="Location Filter"
                        name="location-filter"
                        value={filter_by?.location?.translations?.en?.temple_name === undefined ? null :filter_by?.location?.translations?.en?.temple_name}
                      > 
                        {open && locationsList.temple.sort((a,b) => (a.temple_order > b.temple_order ) ? 1 : ((b.temple_order > a.temple_order ) ? -1 : 0)).map((data,index) => {
                          return (
                            <FormControlLabel
                              key={`${index}-${data._id}`}
                              value={data?.translations?.en?.temple_name}
                              control={<Radio size={"small"} />}
                              label={(language==='en')?(data?.translations?.en?.temple_name):(data?.translations?.kh?.temple_name)}
                              classes={{label: classes.label }}
                              onClick={() => {
                                sessionStorage.setItem('by',"Temple");
                                sessionStorage.setItem('label',(language==='en')?(data?.translations?.en?.temple_name) : (data?.translations?.kh?.temple_name));
                                sessionStorage.setItem('label_id',data._id);
                                sessionStorage.setItem('selectedData',JSON.stringify(data));
                                sessionStorage.setItem('location',JSON.stringify(data));
                                dispatch(setExploreInAction({
                                    by: "Temple",
                                    label:(language==='en')? (data?.translations?.en?.temple_name) : (data?.translations?.kh?.temple_name),
                                    label_id:data._id
                                  })
                                );
                                dispatch(setFilterByAction({
                                    filter_by: {
                                      ...filter_by,
                                      location: data,
                                    },
                                  })
                                );
                                setOpen(false);
                              }}
                            />
                          )
                        })
                        }
                      </RadioGroup>
                    </FormControl>
                  </AccordionDetails>
                </Accordion>

                {/* =============== End Home Temple =======================*/}
                <Accordion style={{margin: "0",borderRadius: "0",backgroundColor: "transparent",borderBottom: "1px solid #525660"}}defaultExpanded={true}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography className={classes.heading}> {t('home.by-location')} </Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{display: "flex",flexDirection: "column",justifyContent: "space-around",paddingTop: "0px",paddingLeft: "22px"}}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="Location Filter"
                        name="location-filter"
                        value={filter_by?.location?.translations?.en?.province_name === undefined ? null :filter_by?.location?.translations?.en?.province_name}
                      >
                      {open &&
                        locationsList.province.sort((a,b) => (a.province_order > b.province_order) ? 1 : ((b.province_order > a.province_order) ? -1 : 0)).map((data, index) => (
                          <FormControlLabel
                            key={`${index}-${data._id}`}
                            value={data?.translations?.en?.province_name}
                            control={<Radio size={"small"} />}
                            label={(language==='en')?(data?.translations?.en?.province_name):(data?.translations?.kh?.province_name)}
                            classes={{ label: classes.label}}
                            onClick={() => {
                              const filterData = {};
                              filterData.filter_by = "province";
                              filterData.province_id = data._id;
                              sessionStorage.setItem('by','Location');
                              sessionStorage.setItem('label',(language==='en')?data.translations.en.province_name:data.translations.kh.province_name);
                              sessionStorage.setItem('label_id',data._id)
                              sessionStorage.setItem('selectedData',JSON.stringify(data));
                              sessionStorage.setItem('location',JSON.stringify(data));
                              dispatch(setExploreInAction({ 
                                  by: "Location", 
                                  label: (language==='en')? data.translations.en.province_name : data.translations.kh.province_name,
                                  label_id: data._id
                                })
                              );
                              dispatch(setFilterByAction({
                                  filter_by: {
                                    ...filter_by,
                                    location: data,
                                  },
                                })
                              );
                              setOpen(false);
                            }}
                          >
                        </FormControlLabel>
                      ))}
                      </RadioGroup>
                    </FormControl>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Fade>
          </Modal>
        </div>
      </div>
    )
  }

const homePageSortFiltersRender = () => {
//  console.log(searchTitle)
  return(
    <div>
      <div style={{fontSize: "13px",fontWeight: "500",background:"rgb(45, 45, 45)",position:'fixed',top: "45px",zIndex:'150',width:'100%',padding:'10px 0 10px 0'}}>
        <Container  style={{display: "flex",alignItems: "center",justifyContent: "space-between",}}>
        {/* =======SORT FILTER========== */}
        
      <div style={{ display: "flex" }}>
          <div style={{display:'flex',justifyContent: 'flexStart'}}>
          {searchTitle.length!==0 && <Typography style={{fontSize: "12px",fontWeight: "500",}}>
          {"total_articles_count" in articleList ? articleList.total_articles_count : 0} {t('home.Results-for-Keywords')} "{sessionStorage.getItem('search_title')}"
            </Typography>}
          </div>
        </div>

        {/* =====SORT====== */}
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", marginRight: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography style={{ marginRight: "10px", fontSize: "12px" }} onClick={handleSort}>
                {t('home.sort')}
              </Typography>
            </div>
            <SortIcon style={{ fontSize: "20px" }} onClick={handleSort}></SortIcon>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={openSort}
              onClose={() => { setOpenSort(false)}}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{ timeout: 500}}
            >
              <Fade in={openSort}>
                <div className={classes.paper}>
                  <div style={{display: "flex",alignItems: "center",padding: "13px 13px"}}>
                    <div style={{display: "flex",alignItems: "center",marginRight: "18px"}}>
                      <ArrowBackIosSharpIcon onClick={() => {setOpenSort(false)}} style={{fontSize:'20px'}}></ArrowBackIosSharpIcon>
                    </div>{" "}
                    <div style={{ fontWeight: "500" }}> {t('home.sort-by')}</div>
                  </div>
                  <div style={{ padding: "20px", fontSize: "13px" }}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="Sort By"
                        name="sort-by"
                        value={sort_by}
                        onChange={handleSortBy}
                      >
                        <FormControlLabel
                          value="popularity"
                          control={<Radio size={"small"} />}
                          label={t('home.popularity')}
                          classes={{label: classes.label}}
                        />
                        <FormControlLabel
                          value="alphabetical"
                          control={<Radio size={"small"} />}
                          label={t('home.alphabetical')}
                          classes={{label: classes.label}}
                        />
                        <FormControlLabel
                          value="date"
                          control={<Radio size={"small"} />}
                          label={t('home.date')}
                          classes={{label: classes.label}}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </Fade>
            </Modal>
          </div>

          {/* ================= FILTER ===============*/}

          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography style={{ marginRight: "10px", fontSize: "12px" }} onClick={handleOpen}>
                {t('home.filter')}
              </Typography>
            </div>
            <FilterListIcon style={{ fontSize: "20px" }} onClick={handleOpen}></FilterListIcon>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{ timeout: 500}}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <div style={{display: "flex",alignItems: "center",padding: "13px 13px"}}>
                    <div style={{ display: "flex",alignItems: "center",marginRight: "18px"}}>
                      <ArrowBackIosSharpIcon style={{fontSize:'20px'}} onClick={handleClose}></ArrowBackIosSharpIcon>
                    </div>{" "}
                    <div style={{ fontWeight: "500" }}>{t('home.filter-by')}</div>{" "}
                  </div>
                  {/*=================== Mostpopular Filter options ================== */}
                  <Accordion style={{ margin: "0",borderRadius: "0",backgroundColor: "transparent",borderBottom: "1px solid #525660"}} defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Typography className={classes.heading}> {t('home.by-category')} </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{display: "flex",flexDirection: "column",justifyContent: "space-around",paddingTop: "0px",paddingLeft: "22px"}}>
                    {/* ======== Filter Category ============== */}
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="category Filter"
                          name="category-filter"
                          value={filter_by?.category?.translations?.en?.category_name === undefined ? null : filter_by?.category?.translations?.en?.category_name }
                        >
                          {open && categoryList.length > 0 ? (
                            categoryList.map((category, index) => (
                                <FormControlLabel
                                  key={`${index}-${category?._id}`}
                                  value={category?.translations?.en?.category_name}
                                  control={<Radio size={"small"} />}
                                  label={(language==='en')?(category?.translations?.en?.category_name):(category?.translations?.kh?.category_name)}
                                  classes={{label: classes.label}}
                                  onClick={() => {
                                    sessionStorage.setItem('category',JSON.stringify(category));
                                    dispatch(setFilterByAction({
                                        filter_by: {
                                          ...filter_by,
                                          category: category,
                                        },
                                      })
                                    );
                                  }}
                                />
                              )
                            )
                          ) : (
                            <Typography>No sub category found for this category</Typography>
                          )}
                        </RadioGroup>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                  {/* ============ mostpopular location Filter */}
                  <Accordion style={{margin: "0",borderRadius: "0",backgroundColor: "transparent",borderBottom: "1px solid #525660"}} defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Typography className={classes.heading}> {t('home.by-location')}</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{display: "flex",flexDirection: "column",justifyContent: "space-around",paddingTop: "0px",paddingLeft: "22px"}}> 
                      <Typography variant="subtitle1" color="initial" style={{marginBottom:'0.3rem',fontSize:14}} >
                        {t('home.by-temple')}
                      </Typography>
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="Location Filter"
                          name="location-filter"
                          value={filter_by?.location?.translations?.en?.temple_name === undefined ? null :filter_by?.location?.translations?.en?.temple_name}
                        >
                        {open && locationsList && locationsList.temple.map((data,index)=> {
                        return (
                          <FormControlLabel
                            key={`${index}-${data._id}`}
                            value={data?.translations?.en?.temple_name}
                            control={<Radio size={"small"} />}
                            label={(language==='en')?(data?.translations?.en?.temple_name):(data?.translations?.kh?.temple_name)}
                            classes={{label: classes.label}}
                            onClick={() => {
                              sessionStorage.setItem('by',"Temple");
                              sessionStorage.setItem('label',data?.translations?.en?.temple_name);
                              sessionStorage.setItem('label_id',data._id);
                              sessionStorage.setItem('selectedData',JSON.stringify(data));
                              sessionStorage.setItem('location',JSON.stringify(data));
                              dispatch(setExploreInAction({
                                by: "Temple",
                                label:(language==='en')? (data?.translations?.en?.temple_name) : (data?.translations?.kh?.temple_name),
                                label_id:data._id
                                })
                              );
                              dispatch(setFilterByAction({
                                  filter_by: {
                                    ...filter_by,
                                    location: data,
                                  },
                                })
                              );
                            }}
                          />)})
                        }
                      </RadioGroup>
                    </FormControl>
                    <Typography variant="subtitle1" color="initial" style={{marginTop:'1rem',marginBottom:'0.3rem',fontSize:14}} >
                      {t('home.by-province')}
                    </Typography>
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="Location Filter"
                          name="location-filter"
                          value={filter_by?.location?.translations?.en?.province_name === undefined ? null :filter_by?.location?.translations?.en?.province_name}
                        >
                          {open && locationsList && locationsList.province.map((data, index) => (
                            <FormControlLabel
                              key={`${index}-${data._id}`}
                              value={data?.translations?.en?.province_name}
                              control={<Radio size={"small"} />}
                              label={(language==='en')?(data?.translations?.en?.province_name):(data?.translations?.kh?.province_name)}
                              classes={{label: classes.label}}
                              onClick={() => {
                                sessionStorage.setItem('by',"location");
                                sessionStorage.setItem('label',data?.translations?.en?.province_name);
                                sessionStorage.setItem('label_id',data._id);
                                sessionStorage.setItem('selectedData',JSON.stringify(data));
                                sessionStorage.setItem('location',JSON.stringify(data));
                                dispatch(setExploreInAction({ 
                                  by: "Location", 
                                  label: (language==='en')? data.translations.en.province_name : data.translations.kh.province_name,
                                  label_id: data._id
                                })
                              );
                                dispatch(setFilterByAction({
                                  filter_by: {
                                    ...filter_by,
                                    location: data,
                                  },
                                }));
                              }}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                  <div style={{ display: "flex",alignItems: "center",justifyContent: "center",marginTop: "20px",marginBottom:'2rem'}}>
                    <Button variant="contained" color="#fff" size="small" style={{borderRadius:'10px'}}
                      onClick={()=>handleFilterMp(false)}>
                      {t('home.apply')}
                    </Button>
                    <Button variant="contained" size="small" style={{borderRadius:'10px',marginLeft:'10px'}} onClick={()=>handaleFilterMpClear()}>
                      {t('home.clear')}
                    </Button>
                  </div>
                </div>
              </Fade>
            </Modal>
          </div>
        </div>
        </Container>
      </div>
      <div style={{ position:'fixed',zIndex:'150',top:'80px',background:'rgb(45, 45, 45)',width:'100%',
        padding:(Boolean(filter_by.category || filter_by.location))? '10px 0 10px 0' : '0px'}}>
        
        <Container>
          {filter_by && typeof filter_by === 'object' && toggleFilter && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography style={{ fontSize: "12px" }}>
                  {(filter_by?.category!==null && filter_by?.category!==undefined || filter_by?.location!==null && filter_by?.location!==undefined)? t('home.filter-by') : ''}
              </Typography>{" "}
              {filter_by?.category && (
                <Button variant="outlined" style={{padding: "0px 2px 0px 5px",fontSize: "8px",fontWeight: "300",margin: "0px 2px",textTransform: "Capitalize"}}>
                  {(language==='en')? (filter_by?.category?.translations?.en?.category_name):(filter_by?.category?.translations?.kh?.category_name)}
                  <CloseSharpIcon
                    style={{ fontSize: "16px", margin: "5px 0px 5px 3px" }}
                    onClick={() => {
                      if (!filter_by.location) {
                        setToggleFilter(false);
                      }
                    dispatch( setFilterByAction({
                          filter_by: {
                            ...filter_by,
                            category: null,
                          },
                        })
                      );
                      removeSession_c();
                      handleFilterMp("category");
                    }}
                  ></CloseSharpIcon>
                </Button>
              )}
              {filter_by?.location?.translations?.en?.province_name && (
                <Button variant="outlined" style={{ padding: "0px 2px 0px 5px", fontSize: "8px",fontWeight: "300",margin: "0px 2px",textTransform: "Capitalize"}}>
                  {(language==='en')? (filter_by?.location?.translations?.en?.province_name): (filter_by.location?.translations?.kh?.province_name)}
                    <CloseSharpIcon style={{ fontSize: "16px", margin: "5px 0px 5px 3px" }}
                      onClick={() => {
                        if (!filter_by.category) {
                          setToggleFilter(false);
                        }
                        dispatch(setExploreInAction({ 
                            by: "", 
                            label: 'All locations',
                            label_id: ''
                          })
                        );
                        dispatch(setFilterByAction({
                            filter_by: { ...filter_by, location: null },
                          })
                        );
                        removeSession_l();
                        sessionStorage.removeItem('by')
                        sessionStorage.removeItem('label')
                        sessionStorage.removeItem('label_id')
                        sessionStorage.removeItem('selectedData');
                        handleFilterMp("location");
                      }}
                    ></CloseSharpIcon>
                </Button>
              )}
              {filter_by?.location?.translations?.en?.temple_name && (
                <Button variant="outlined" style={{ padding: "0px 2px 0px 5px",fontSize: "8px",fontWeight: "300",margin: "0px 2px",textTransform: "Capitalize"}}>
                  {(language==='en')? (filter_by?.location?.translations?.en?.temple_name):filter_by?.location?.translations?.kh?.temple_name}
                  <CloseSharpIcon style={{ fontSize: "16px", margin: "5px 0px 5px 3px" }}
                    onClick={() => {
                      if (!filter_by.category) {
                        setToggleFilter(false);
                      }
                      dispatch(setExploreInAction({ 
                          by: "", 
                          label: 'All locations',
                          label_id: ''
                        })
                      );
                      dispatch(setFilterByAction({
                          filter_by: { ...filter_by, location: null },
                        })
                      );
                      removeSession_l();
                      sessionStorage.removeItem('by')
                      sessionStorage.removeItem('label')
                      sessionStorage.removeItem('label_id')
                      sessionStorage.removeItem('selectedData');
                      handleFilterMp("location");
                    }}
                  ></CloseSharpIcon>
                </Button>
              )}
            </div>
          )}
        </Container>
      </div>
    </div>
  )
}

const mostPopularFiltersRender = () => {
return (
  <div>
    <div style={{ fontSize: "13px",fontWeight: "500",background:"rgb(45, 45, 45)",position:'fixed',top: "45px",zIndex:'150',width:'100%',padding:'10px 0 10px 0'}}>
      <Container style={{display: "flex",alignItems: "center",justifyContent: "space-between",}}>
        {/* =======SORT FILTER========== */}
        <div>
          <Typography style={{marginRight: "10px",fontSize: "12px",fontWeight: "500"}}>
            {t('home.most-popular')}
          </Typography>
        </div>
        {/* =====SORT====== */}
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", marginRight: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography style={{ marginRight: "10px", fontSize: "12px" }}onClick={handleSort}>
                {t('home.sort')}
              </Typography>
            </div>
            <SortIcon style={{ fontSize: "20px" }}onClick={handleSort}></SortIcon>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={openSort}
              onClose={() => {setOpenSort(false)}}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{timeout: 500}}
            >
              <Fade in={openSort}>
                <div className={classes.paper}>
                  <div style={{display: "flex",alignItems: "center",padding: "13px 13px"}}>
                    <div style={{display: "flex",alignItems: "center",marginRight: "18px"}}>
                      <ArrowBackIosSharpIcon onClick={() => {setOpenSort(false)}} style={{fontSize:'20px'}}></ArrowBackIosSharpIcon>
                    </div>{" "}
                    <div style={{ fontWeight: "500" }}> {t('home.sort-by')}</div>
                  </div>
                  <div style={{ padding: "20px", fontSize: "13px" }}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="Sort By"
                        name="sort-by"
                        value={sort_by}
                        onChange={handleSortBy}>

                        <FormControlLabel
                          value="popularity"
                          control={<Radio size={"small"} />}
                          label={t('home.popularity')}
                          classes={{label: classes.label}}/>

                        <FormControlLabel
                          value="alphabetical"
                          control={<Radio size={"small"} />}
                          label={t('home.alphabetical')}
                          classes={{ label: classes.label}}/>

                        <FormControlLabel
                          value="date"
                          control={<Radio size={"small"} />}
                          label={t('home.date')}
                          classes={{label: classes.label}}/>
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </Fade>
            </Modal>
          </div>
          {/* ================= FILTER ===============*/}
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography style={{ marginRight: "10px", fontSize: "12px" }} onClick={handleOpen}>
                {t('home.filter')}
              </Typography>
            </div>
            <FilterListIcon style={{ fontSize: "20px" }} onClick={handleOpen}></FilterListIcon>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{timeout: 500}}
              >
                <Fade in={open}>
                  <div className={classes.paper}>
                    <div style={{display: "flex",alignItems: "center",padding: "13px 13px"}}>
                      <div style={{display: "flex",alignItems: "center",marginRight: "18px"}}>
                        <ArrowBackIosSharpIcon style={{fontSize:'20px'}} onClick={handleClose}></ArrowBackIosSharpIcon>
                      </div>{" "}
                    <div style={{ fontWeight: "500" }}>{t('home.filter-by')}</div>{" "}
                  </div>
                  {/*=================== Mostpopular Filter options ================== */}
                  <Accordion style={{margin: "0",borderRadius: "0",backgroundColor: "transparent",borderBottom: "1px solid #525660"}}defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Typography className={classes.heading}> {t('home.by-category')} </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{display: "flex",flexDirection: "column",justifyContent: "space-around",paddingTop: "0px",paddingLeft: "22px"}}>
                    {/* ======== Filter Category ============== */}
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="category Filter"
                          name="category-filter"
                          value={filter_by?.category?.translations?.en?.category_name === undefined ? null : filter_by?.category?.translations?.en?.category_name }
                        >
                        {open && categoryList.length > 0 ? (categoryList.map((category, index) => (
                          <FormControlLabel
                            key={`${index}-${category?._id}`}
                            value={category?.translations?.en?.category_name}
                            control={<Radio size={"small"} />}
                            label={(language==='en')?(category?.translations?.en?.category_name):(category?.translations?.kh?.category_name)}
                            classes={{label: classes.label}}
                            onClick={() => {
                              sessionStorage.setItem('category',JSON.stringify(category));
                              dispatch(setFilterByAction({
                                  filter_by: {
                                    ...filter_by,
                                    category: category,
                                  },
                                })
                              );
                            }}
                          />))
                          ) : (
                          <Typography> No sub category found for this category </Typography>
                          )}
                        </RadioGroup>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                  {/* ============ mostpopular location Filter */}
                  <Accordion style={{margin: "0",borderRadius: "0",backgroundColor: "transparent",borderBottom: "1px solid #525660"}} defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Typography className={classes.heading}> {t('home.by-location')} </Typography>
                      </AccordionSummary>
                        <AccordionDetails style={{ display: "flex",flexDirection: "column",justifyContent: "space-around",paddingTop: "0px",paddingLeft: "22px"}}> 
                          <Typography variant="subtitle1" color="initial" style={{marginBottom:'0.3rem',fontSize:14}} > {t('home.by-temple')} </Typography>
                          <FormControl component="fieldset">
                            <RadioGroup
                              aria-label="Location Filter"
                              name="location-filter"
                              value={filter_by?.location?.translations?.en?.temple_name === undefined ? null :filter_by?.location?.translations?.en?.temple_name}
                            >
                            {open && locationsList && locationsList.temple.map((data,index)=> {
                            return (
                              <FormControlLabel
                                key={`${index}-${data._id}`}
                                value={data?.translations?.en?.temple_name}
                                control={<Radio size={"small"} />}
                                label={(language==='en')?(data?.translations?.en?.temple_name):(data?.translations?.kh?.temple_name)}
                                classes={{label: classes.label}}
                                onClick={() => {
                                  sessionStorage.setItem('by',"Temple");
                                  sessionStorage.setItem('label',data?.translations?.en?.temple_name);
                                  sessionStorage.setItem('label_id',data._id);
                                  sessionStorage.setItem('selectedData',JSON.stringify(data));
                                  sessionStorage.setItem('location',JSON.stringify(data));
                                  dispatch(setFilterByAction({
                                      filter_by: {
                                        ...filter_by,
                                        location: data,
                                      },
                                    })
                                  );
                                }}
                              />)})
                            }
                          </RadioGroup>
                        </FormControl>
                        <Typography variant="subtitle1" color="initial" style={{marginTop:'1rem',marginBottom:'0.3rem',fontSize:14}} >
                          {t('home.by-province')}
                        </Typography>
                        <FormControl component="fieldset">
                          <RadioGroup
                            aria-label="Location Filter"
                            name="location-filter"
                            value={filter_by?.location?.translations?.en?.province_name === undefined ? null :filter_by?.location?.translations?.en?.province_name}
                          >
                          {open && locationsList && locationsList.province.map((data, index) => (
                            <FormControlLabel
                              key={`${index}-${data._id}`}
                              value={data?.translations?.en?.province_name}
                              control={<Radio size={"small"} />}
                              label={(language==='en')?(data?.translations?.en?.province_name):(data?.translations?.kh?.province_name)}
                              classes={{label: classes.label}}
                              onClick={() => {
                                sessionStorage.setItem('by',"location");
                                sessionStorage.setItem('label',data?.translations?.en?.province_name);
                                sessionStorage.setItem('label_id',data._id);
                                sessionStorage.setItem('selectedData',JSON.stringify(data));
                                sessionStorage.setItem('location',JSON.stringify(data));
                                dispatch(setFilterByAction({
                                    filter_by: {
                                      ...filter_by,
                                      location: data,
                                    },
                                  })
                                );
                              }}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                  <div style={{display: "flex",alignItems: "center",justifyContent: "center",marginTop: "20px",marginBottom:'2rem'}}>
                    <Button variant="contained" color="#fff" size="small" style={{ borderRadius:'10px',marginRight:'10px'}} onClick={()=>handleFilterMp(false)}>
                      {t('home.apply')}
                    </Button>
                    <Button variant="contained" size="small" style={{borderRadius:'10px'}} onClick={()=>handaleFilterMpClear()}>
                      {t('home.clear')}
                    </Button>
                  </div>
                </div>
              </Fade>
            </Modal>
          </div>
        </div>
      </Container>
    </div>
    <div style={{ position:'fixed',zIndex:'150', top:'80px',background:'rgb(45, 45, 45)',width:'100%',
                padding:(Boolean(filter_by.category || filter_by.location))? '10px 0 10px 0' : '0px'}}>
      <Container>
        {toggleSearch && <div style={{display:'flex',justifyContent: 'flexStart',padding:'0px 0 10px 0px' }}>
        {searchTitle.length!==0 && <Typography style={{fontSize: "12px",fontWeight: "500"}}>
        {"total_articles_count" in articleList ? articleList.total_articles_count : 0} {t('home.Results-for-Keywords')} "{searchTitle}"
          </Typography>}
      </div>}
      {filter_by && typeof filter_by === 'object' && toggleFilter && (<div style={{ display: "flex", alignItems: "center" }}>
          <Typography style={{ fontSize: "12px" }}>
            {((filter_by?.category!==null && filter_by?.category!==undefined) || (filter_by?.location!==null && filter_by?.location!==undefined))? t('home.filter-by') : ''}
          </Typography>{" "}
          {filter_by?.category && (<Button variant="outlined" style={{padding: "0px 2px 0px 5px",fontSize: "8px",fontWeight: "300",margin: "0px 2px",textTransform: "Capitalize"}}>
              {(language==='en')? (filter_by?.category?.translations?.en?.category_name):(filter_by?.category?.translations?.kh?.category_name)}
                <CloseSharpIcon style={{ fontSize: "16px", margin: "5px 0px 5px 3px" }}
                  onClick={() => {
                    if (!filter_by.location) {
                      setToggleFilter(false);
                    }
                    dispatch(setFilterByAction({
                        filter_by: {
                          ...filter_by,
                          category: null,
                        },
                      })
                    );
                    removeSession_c();
                    handleFilterMp("category");
                  }}></CloseSharpIcon>
            </Button>
          )}
          {filter_by?.location?.translations?.en?.province_name && (
            <Button variant="outlined" style={{padding: "0px 2px 0px 5px",fontSize: "8px",fontWeight: "300",margin: "0px 2px",textTransform: "Capitalize"}}>
              {(language==='en')? (filter_by?.location?.translations?.en?.province_name): (filter_by.location?.translations?.kh?.province_name)}
                <CloseSharpIcon style={{ fontSize: "16px", margin: "5px 0px 5px 3px" }}
                  onClick={() => {
                    if (!filter_by.category) {
                      setToggleFilter(false);
                    }
                    dispatch( setExploreInAction({ 
                        by: "", 
                        label: 'All locations',
                        label_id: ''
                      })
                    );
                    dispatch(setFilterByAction({
                        filter_by: { ...filter_by, location: null },
                      })
                    );
                    removeSession_l();
                    sessionStorage.removeItem('by')
                    sessionStorage.removeItem('label')
                    sessionStorage.removeItem('label_id')
                    sessionStorage.removeItem('selectedData');
                    handleFilterMp("location");
                  }}
                ></CloseSharpIcon>
            </Button>
          )}
          {filter_by?.location?.translations?.en?.temple_name && (
            <Button variant="outlined" style={{padding: "0px 2px 0px 5px",fontSize: "8px",fontWeight: "300",margin: "0px 2px",textTransform: "Capitalize"}}>
              {(language==='en')? (filter_by?.location?.translations?.en?.temple_name):filter_by?.location?.translations?.kh?.temple_name}
              <CloseSharpIcon style={{ fontSize: "16px", margin: "5px 0px 5px 3px" }}
                onClick={() => {
                  if (!filter_by.category) {
                    setToggleFilter(false);
                  }
                  dispatch(setExploreInAction({ 
                      by: "", 
                      label: 'All locations',
                      label_id: ''
                    })
                  );
                  dispatch(setFilterByAction({
                      filter_by: { ...filter_by, location: null },
                    })
                  );
                  removeSession_l();
                  sessionStorage.removeItem('by')
                  sessionStorage.removeItem('label')
                  sessionStorage.removeItem('label_id')
                  sessionStorage.removeItem('selectedData');
                  handleFilterMp("location");
                }}
              ></CloseSharpIcon>
            </Button>
          )}
        </div>
      )}
    </Container>
  </div>
</div>
)}

const articlesByCategoryRender = () => {
  return (
    <div className="category">
      <div style={{ fontSize: "13px",fontWeight: "500",top: "45px",background:'rgb(45 45 45)',padding:'10px 0 10px 0',width:'100%',position:'fixed',zIndex:'150'}}>
      {/* SORT FILTER */}
      <Container style={{ display: "flex", alignItems: "center",justifyContent: "space-between"}}>
        <div>
          <Typography style={{marginRight: "10px",fontSize: "12px",fontWeight: "500"}}> {category_title} </Typography>
        </div> 

        <div style={{ display: "flex" }}>
          {/* SORT */}
          <div style={{ display: "flex", marginRight: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography style={{ marginRight: "10px", fontSize: "12px" }} onClick={handleSort}> {t('home.sort')} </Typography>
            </div>
            <SortIcon style={{ fontSize: "20px" }} onClick={handleSort}></SortIcon>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={openSort}
              onClose={() => { setOpenSort(false);}}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{ timeout: 500}}
            >
              <Fade in={openSort}>
                <div className={classes.paper}>
                  <div style={{ display: "flex",alignItems: "center",padding: "13px 13px",}}>
                    <div style={{display: "flex",alignItems: "center",marginRight: "18px",}}>
                      <ArrowBackIosSharpIcon style={{ fontSize: "20px" }} onClick={() => {setOpenSort(false);}}></ArrowBackIosSharpIcon>
                    </div>{" "}
                    <div style={{ fontWeight: "500" }}>{t('home.sort-by')}</div>
                  </div>
                  <div style={{ padding: "20px", fontSize: "13px" }}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="Sort By"
                        name="sort-by"
                        value={sort_by}
                        onChange={handleSortBy}
                      >
                        <FormControlLabel
                          value="popularity"
                          control={<Radio size={"small"} />}
                          label={t('home.popularity')}
                          classes={{label: classes.label}}
                        />
                        <FormControlLabel
                          value="alphabetical"
                          control={<Radio size={"small"} />}
                          label={t('home.alphabetical')}
                          classes={{label: classes.label}}
                        />
                        <FormControlLabel
                          value="date"
                          control={<Radio size={"small"} />}
                          label={t('home.date')}
                          classes={{label: classes.label}}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </Fade>
            </Modal>
         </div>
        {/* FILTER */}
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography style={{ marginRight: "10px", fontSize: "12px" }} onClick={handleOpen}>
              {t('home.filter')}
            </Typography>
          </div>
          <FilterListIcon style={{ fontSize: "20px" }}onClick={handleOpen}></FilterListIcon>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{timeout: 500}}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <div style={{display: "flex",alignItems: "center",padding: "13px 13px"}}>
                  <div style={{display: "flex",alignItems: "center",marginRight: "18px"}}>
                    <ArrowBackIosSharpIcon style={{fontSize:'20px'}} onClick={handleClose}></ArrowBackIosSharpIcon>
                  </div>{" "}
                  <div style={{ fontWeight: "500" }}>{t('home.filter-by')}</div>{" "}
                </div>
                <Accordion style={{margin: "0",borderRadius: "0",backgroundColor: "transparent",borderBottom: "1px solid #525660"}} defaultExpanded={true}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography className={classes.heading}> {t('home.by-sub-category')} </Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ display: "flex",flexDirection: "column",justifyContent: "space-around",paddingTop: "0px",paddingLeft: "22px"}}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="Subcategory Filter"
                      name="sub-category-filter"
                      value={filter_by?.sub_category?.translations?.en?.name=== undefined ? null :filter_by?.sub_category?.translations?.en?.name }
                    >
                    {open && category.sub_category.length > 0 ? (category.sub_category.map((sub_category, index) => (
                      <FormControlLabel
                        key={`${index}-${sub_category?._id}`}
                        value={sub_category?.translations?.en?.name}
                        control={<Radio size={"small"} />}
                        label={(language==='en')?(sub_category?.translations?.en?.name):(sub_category?.translations?.kh?.name)}
                        classes={{label: classes.label}}
                        onClick={() => {
                          sessionStorage.setItem('sub_category',JSON.stringify(sub_category));
                              dispatch(setFilterByAction({
                                  filter_by: {
                                    ...filter_by,
                                    sub_category: sub_category,
                                  },
                                })
                              );
                            }}
                      />
                    )
                    )) : ( <Typography> No sub category found for this category </Typography> )}
                  </RadioGroup>
                </FormControl>
              </AccordionDetails>
              </Accordion>

              <Accordion style={{ margin: "0",borderRadius: "0",backgroundColor: "transparent",borderBottom: "1px solid #525660",}}defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography className={classes.heading}> {t('home.by-location')} </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ display: "flex",flexDirection: "column",justifyContent: "space-around",paddingTop: "0px",paddingLeft: "22px"}}> 
                  <Typography variant="subtitle1" color="initial" style={{marginBottom:'0.3rem',fontSize:14}} >
                    {t('home.by-temple')}
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="Location Filter"
                      name="location-filter"
                      value={filter_by?.location?.translations?.en?.temple_name === undefined ? null :filter_by?.location?.translations?.en?.temple_name}
                    >
                    {open && locationsList.temple.map((data,index)=> {
                      return (
                        <FormControlLabel
                          key={`${index}-${data?._id}`}
                          value={data?.translations?.en?.temple_name}
                          control={<Radio size={"small"} />}
                          label={(language==='en')?(data?.translations?.en?.temple_name):(data?.translations?.kh?.temple_name)}
                          classes={{label: classes.label}}
                          onClick={() => {
                            sessionStorage.setItem('by',"Temple");
                            sessionStorage.setItem('label',data?.translations?.en?.temple_name);
                            sessionStorage.setItem('label_id',data._id);
                            sessionStorage.setItem('selectedData',JSON.stringify(data));
                            sessionStorage.setItem('location',JSON.stringify(data));
                            dispatch(setFilterByAction({
                                filter_by: {
                                  ...filter_by,
                                  location: data,
                                },
                              })
                            );
                          }}
                        />)})
                      }
                    </RadioGroup>
                  </FormControl>   
                  <Typography variant="subtitle1" color="initial" style={{marginTop:'1rem',marginBottom:'0.3rem',fontSize:14}} >
                     {t('home.by-province')}
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="Location Filter"
                      name="location-filter"
                      value={filter_by?.location?.translations?.en?.province_name === undefined ? null :filter_by?.location?.translations?.en?.province_name}
                    >
                    {open && locationsList.province.map((data, index) => (
                      <FormControlLabel
                        key={`${index}-${data?._id}`}
                        value={data.translations.en.province_name}
                        control={<Radio size={"small"} />}
                        label={(language==='en')?(data?.translations?.en?.province_name):(data?.translations?.kh?.province_name)}
                        classes={{label: classes.label}}
                        onClick={() => {
                          sessionStorage.setItem('by',"location");
                          sessionStorage.setItem('label',data?.translations?.en?.province_name);
                          sessionStorage.setItem('label_id',data._id);
                          sessionStorage.setItem('selectedData',JSON.stringify(data));
                          sessionStorage.setItem('location',JSON.stringify(data));
                          dispatch(setFilterByAction({
                            filter_by: {
                              ...filter_by,
                              location: data,
                            },
                          })
                          );
                          }}
                      ></FormControlLabel>
                    ))}
                  </RadioGroup>
                </FormControl>
              </AccordionDetails>
            </Accordion>
            <div style={{display: "flex",alignItems: "center",justifyContent: "center",marginTop: "20px",marginBottom:'2rem',}}>
              <Button variant="contained" size="small" style={{borderRadius:'10px',marginRight:'10px'}} onClick={handleFilter}>
                {t('home.apply')}
              </Button>
              <Button variant="contained" size="small" style={{borderRadius:'10px'}} onClick={()=>handaleFilterClear()}>
                {t('home.clear')}
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      </div>
    </div>
  </Container>
</div>
{/*===============================Filter By categoty tags===================== */}
<div style={{fontSize: "13px",fontWeight: "500",top: "80px",background:'rgb(45 45 45)',
    padding:(Boolean(filter_by.sub_category || filter_by.location))? '10px 0 10px 0' : '0px',
    width:'100%',position:'fixed',zIndex:'150'}}>
  <Container>
    {toggleSearch && <div style={{display:'flex',justifyContent: 'flexStart',padding:'0px 0 10px 0px' }}>
    {searchTitle.length!==0 && <Typography style={{fontSize: "12px",fontWeight: "500"}}> {t('home.Results-for-Keywords')} "{searchTitle}" </Typography>}
    </div>}   
    {filter_by !== "" && filter_by !== "All locations"  && (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography style={{ fontSize: "12px" }}>
          {(filter_by?.sub_category!==null && filter_by?.sub_category!==undefined ||
            filter_by?.location!==null && filter_by?.location!==undefined)? t('home.filter-by') : ''}
        </Typography>{" "}

          {filter_by?.sub_category && (
            <Button variant="outlined" style={{padding: "0px 2px 0px 5px",fontSize: "8px",fontWeight: "300",margin: "0px 2px",textTransform: "Capitalize",}}>
              {(language==='en')? (filter_by?.sub_category?.translations?.en?.name):(filter_by?.sub_category?.translations?.kh?.name)}
                <CloseSharpIcon style={{ fontSize: "16px", margin: "5px 0px 5px 3px" }}
                  onClick={() => {
                    if (!filter_by.location) {
                      setToggleFilter(false);
                    }
                    dispatch(setFilterByAction({
                          filter_by: {
                            ...filter_by,
                            sub_category: null,
                          },
                        })
                    );
                    
                    removeSession_sc();
                    setPage(1);
                    handleFilter("sub_category");
                  }}
               ></CloseSharpIcon>
            </Button>
          )}
          {filter_by?.location?.translations?.en?.province_name && (
            <Button variant="outlined" style={{ padding: "0px 2px 0px 5px",fontSize: "8px",fontWeight: "300",margin: "0px 2px",textTransform: "Capitalize"}}>
              {(language==='en')? (filter_by?.location?.translations?.en?.province_name): (filter_by.location?.translations?.kh?.province_name)}
                <CloseSharpIcon style={{ fontSize: "16px", margin: "5px 0px 5px 3px" }}
                    onClick={() => {
                      if (!filter_by.sub_category) {
                        setToggleFilter(false);
                      }
                      dispatch(setExploreInAction({ 
                        by: "", 
                        label: 'All locations',
                        label_id: ''
                      })
                    );
                    dispatch(setFilterByAction({
                        filter_by: { ...filter_by, location: null },
                      })
                    );
                    removeSession_l();
                    sessionStorage.removeItem('by')
                    sessionStorage.removeItem('label')
                    sessionStorage.removeItem('label_id')
                    sessionStorage.removeItem('selectedData');
                    setPage(1);
                    handleFilter("location");
                  }}
                ></CloseSharpIcon>
              </Button>
          )}

          {filter_by?.location?.translations?.en?.temple_name && (
            <Button variant="outlined" style={{padding: "0px 2px 0px 5px",fontSize: "8px",fontWeight: "300",margin: "0px 2px",textTransform: "Capitalize"}}>
              {(language==='en')? (filter_by?.location?.translations?.en?.temple_name):filter_by?.location?.translations?.kh?.temple_name}
                <CloseSharpIcon style={{ fontSize: "16px", margin: "5px 0px 5px 3px" }}
                  onClick={() => {

                    if (!filter_by.sub_category) {
                      setToggleFilter(false);
                    }
                    dispatch(setExploreInAction({ 
                        by: "", 
                        label: 'All locations',
                        label_id: ''
                      })
                    );
                    dispatch(setFilterByAction({
                      filter_by: { ...filter_by, location: null },
                      })
                    );
                    removeSession_l();
                    sessionStorage.removeItem('by')
                    sessionStorage.removeItem('label')
                    sessionStorage.removeItem('label_id')
                    sessionStorage.removeItem('selectedData');
                    setPage(1);
                    handleFilter("location");
                  }}
                ></CloseSharpIcon>
              </Button>
          )}
        </div>
        )}
      </Container>
    </div>
  </div>
  )
}
return (
    <div style={{ textAlign: "center", backgroundColor: " #1F1F1F",width:'100%'}}>
      {openError && <ErrorToastv1 open={openError} message={"Select atleast one item"} setOpenError={setOpenError}/>}
      
      {/*========= SEARCH BAR HEADER ================*/}
      <Backdrop className={classes.backdrop} open={isSearchFocused} onClick={()=>setIsSearchFocused(false)} />
      <div style={{ background:'#2D2D2D', display: "flex",alignItems: "center",position:'fixed',top:'0',width:'100%',zIndex:'150',padding:'15px'}}>
        {headerFor !== "Home" && (
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer"
            style={{ marginLeft: "0px"}}
            onClick={() => {
              removeSession_sc();
              removeSession_c();
              removeSession_l();
              window.scroll(0,0);
              dispatch(setFilterByAction({
                    filter_by: {
                      ...filter_by,
                      sub_category: null,
                    },
                  })
                );

              dispatch(setSortByAction({ sort_by: "date" }));
                if (toggleSearch) {
                  setToggleSearch(false);
                } else {
                  // console.log('check')
                  goBackPath ? history.push(goBackPath) : history.goBack()
                }
              }}
            >
            <ArrowBackIosIcon style={{ fontSize: "20px" }} />
          </IconButton>
        )}
        
        {/* =========== SEARCH BAR not Bookmark =================== */}
        {(headerFor == "Home" && toggleSearch) && (
          
          <ArrowBackIosSharpIcon style={{ fontSize: "20px",marginRight:'10px' }}
            onClick={() => { 
                            
                // following clears the session storage and redux for filter and sort
                handaleFilterHomeClear()
                handleSortBy({target:{value:'date'}})

                setOpenSort(false);
                setToggleSearch(false); 
                setToggleFilter(false);
                history.replace(`/?lang=${sessionStorage.getItem('lang')}&token=${sessionStorage.getItem('token')}`)}}>
          </ArrowBackIosSharpIcon>
        )}
    
      {headerFor !== "Bookmark" &&(
        <div className={classes.search} style={{ width: "100%",zIndex:100 }}>
          <div className={classes.searchIcon} onClick={handleSearch} > <SearchIcon /> </div>
            <form id="search-text" onSubmit={(e)=>{handleSearch(e,"")}}>
              <InputBase classes={{root: classes.inputRoot,input: classes.inputInput}}
                style={{ width: "80%"}}
                inputProps={{ "aria-label": "search" }}
                value={search}
                onClick={()=>setIsSearchFocused(true)}
                onChange = {(event)=>{
                  if (event.target.value.trim() !== "") {
                    setSearch(event.target.value);
                    setSearchTitle(event.target.value)
                  } else if (event.target.value.trim() === "") {
                    setSearch("");
                    setSearchTitle("");
                  }
                }}
              />
            </form>
            {search && search !== "" && (
              <div className={classes.closeIcon}
                onClick={() => {
                  setSearch("");
                  // dispatch(resetSortFilterQuerySearch());

                  // if (category?._id){
                  //   dispatch( getArticlesByCategoryAction({
                  //       filter_by: "category",
                  //       category_id: category._id,
                  //       page: 1,
                  //       limit: 10,
                  //     })
                  //   );
                  // }
                  // setToggleSearch(false);
                }}
              >
              <CloseIcon />
            </div>)}
          </div>)}

          {headerFor !== "Bookmark" &&(
            <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="open drawer"
              onClick={() =>
                history.push({
                  pathname: "/article/bookmarks",
                  search:`?lang=${sessionStorage.getItem("lang")}`,
                  state:{ headerFor,category } 
                })
              }
            >
          <BookmarkBorderIcon style={{ fontSize: "23px" }}></BookmarkBorderIcon>
          </IconButton>)}   
      </div>

      {/*=============== DIFFERENT FILTERS =================*/}
      {/*=============== HOME PAGE FILTERS =================*/}

      {headerFor === "Home" && !toggleSearch && homePageFiltersRender()}
      {headerFor === "Home" && toggleSearch && homePageSortFiltersRender()}

      {/* =========== HEADER TEXT ========================= */}
      {/* =========== HOME PAGE TEXT ====================== */}

      {headerFor === "Home" && !toggleSearch && (
        <div>
          <div style={{ fontSize: matches ? "16px" : "12px",fontWeight: "500",marginTop:'20px'}}>
            {/*==========Home page title================= */}
            <p style={{ marginBottom: "0" }}>{t('home.title')}</p>
            <p style={{ marginTop: "0"}}>{t('home.sub-title')}</p>
          </div>
        </div>
      )}

      {/* {toggleSearch && (
        <div style={{display: "flex",alignItems: "center",justifyContent: "space-between",fontSize: "13px",fontWeight: "500",marginTop: "20px",}}>
          <Typography style={{ marginRight: "10px", fontSize: "12px", fontWeight: "500" }}>
            Search result
          </Typography>
        </div>
      )} */}
     {/* ===================== Most popular header ====================== */}

      {/* {headerFor === "most-popular" && !toggleSearch && mostPopularFiltersRender()} */}
      
      {headerFor === "most-popular" && mostPopularFiltersRender()}

      {/*===============Article category =============================== */}
      {headerFor === "articles-by-category" && articlesByCategoryRender()}
      {/* {headerFor === "articles-by-category" && !toggleSearch && ( */}
      
    </div>
  );
};

export default ArticleHeader;