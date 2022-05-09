// import React, { useEffect, useState } from "react";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// import InputBase from "@material-ui/core/InputBase";
// import { fade, makeStyles } from "@material-ui/core/styles";
// import SearchIcon from "@material-ui/icons/Search";
// import { Button, Container, Fade, Backdrop } from "@material-ui/core";

// import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
// import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
// import Modal from "@material-ui/core/Modal";
// import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
// import Accordion from "@material-ui/core/Accordion";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import CloseSharpIcon from "@material-ui/icons/CloseSharp";

// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import { getAllProvince } from "../../store/actions";
// import SortIcon from "@material-ui/icons/Sort";
// import CloseIcon from '@material-ui/icons/Close';
// import FilterListIcon from "@material-ui/icons/FilterList";

// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import "../../assets/scss/home.scss";


// import {
//   getFilteredArticlesAction,
//   getSortedArticlesAction,
//   resetSortFilterQuerySearch,
//   setFilterByAction,
//   setQueryAction,
//   setSearchAction,
//   setSortByAction,
//   sortAndFilterArticles,
// } from "../../store/article/actions";

// import { useDispatch, useSelector } from "react-redux";

// import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginLeft: "0px",
//   },
//   title: {
//     flexGrow: 1,
//     display: "none",
//     [theme.breakpoints.up("sm")]: {
//       display: "block",
//     },
//   },
//   search: {
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     "&:hover": {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(1),
//       width: "auto",
//     },
//     backdrop: {
//       zIndex: theme.zIndex.drawer + 1,
//       color: '#fff',
//     }
//   },
//   searchIcon: {
//     padding: "0 8px",
//     height: "100%",
//     position: "absolute",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex:100
//   },
//   closeIcon: {
//     padding: "0 8px",
//     height: "100%",
//     position: "absolute",
//     display: "flex",
//     top:"0",
//     right:"0",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex:100
//   },
//   inputRoot: {
//     color: "inherit",
//   },
//   inputInput: {
//     padding: "5px 5px 5px 0",
//     // vertical padding + font size from searchIcon
//     paddingLeft: `5px`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       width: "12ch",
//       "&:focus": {
//         width: "20ch",
//       },
//     },
//   },
//   modal: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   paper: {
//     // backgroundColor: "rgba(0,0,0, 0.6)",
//     backdropFilter: "blur(10px)",
//     backgroundColor: "#1f1f1fdb",
//     boxShadow: theme.shadows[5],
//     width: "100%",
//     height: "100%",
//     fontSize: "13px",
//     height:"100%",
//     overflowY:"scroll"
//   },
//   heading: {
//     fontSize: "13px",
//     fontWeight: "500",
//   },
//   accordionOption: {
//     padding: "10px 0",
//     fontSize: "13px",
//     "&:hover": {
//       color: "#4285F4",
//       cursor: "pointer",
//     },
//     "&:active": {
//       color: "#4285F4",
//       cursor: "pointer",
//       textDecoration: "underline",
//     },
//     "&:visited": {
//       color: "#4285F4",
//       cursor: "pointer",
//       textDecoration: "underline",
//     },
//   },
//   selectedItem: {
//     padding: "10px 0",
//     fontSize: "13px",
//     color: "#4285F4",
//     textDecoration: "underline",
//   },
//   menuButton: {
//     padding: "0 5px",
//     fontSize: "10px",
//   },
//   label: {
//     fontSize: "13px",
//   },
// }));

// const ArticleHeader = (props) => {
//   const {
//     setToggleFilter,
//     toggleFilter,
//     toggleSearch,
//     setQuery,
//     setToggleSearch,
//     headerFor,
//     history,
//     category,
//     category_title,
//   } = props;

//   const matches = useMediaQuery("(min-width:306px)");
//   const [open, setOpen] = useState(false);

//   // SORT & FILTER
//   const [openSort, setOpenSort] = useState(false);
//   const [filterData,setFilterData] = useState(null);

//   // SEARCH
//   const [search, setSearch] = useState("");

 

//   useEffect(() => {
//     dispatch(getAllProvince());

//     if(['Home','most-popular'].includes(headerFor)){
//       dispatch(resetSortFilterQuerySearch());
//     }
//   }, []);


//   const {
//     Article: {
//       categoryList,
//       sort_by,
//       filter_by,
//       search_by,
//       query
//     },

//     Common: { provinceList },
//   } = useSelector((state) => state);

//   const handleSearch = (e) => {

//     e.preventDefault();

//     if(search.trim() !== ""){

//       const filterData = {};
//       filterData.filter_by = "title";
//       filterData.title = search;
//       if (filterData.filter_by) {
  
//         filterData.page = 1;
//         filterData.limit = 10;
        
//         dispatch(getFilteredArticlesAction(filterData));
//         dispatch(setSearchAction({search_by:search}))
//         setQuery({
//           for:'filter',
//           data:filterData
//         })
//         setToggleSearch(true);
  
  
//       }


//     }


//   };

//   // FOR FILTER
//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (filterData) => {

//     if (filterData.filter_by) {

//       filterData.page = 1;
//       filterData.limit = 10;

//       setFilterData(filterData);

//       if((sort_by !== "" ) && (sort_by !== "clear")){

//         console.log(sort_by);

//         filterData.sort_by = sort_by;
//         dispatch(sortAndFilterArticles(filterData));

//         const queryData = {
//           for:'sort-and-filter',
//           data:filterData
//         }

//         dispatch(setQueryAction({query:queryData}))

//       }
//       else{

//         dispatch(getFilteredArticlesAction(filterData));

//         const queryData = {
//           for:'filter',
//           data:filterData
//         }

//         dispatch(setQueryAction({query:queryData}))
//       }

      

//       setToggleFilter(true);
//     }
//     setOpen(false);
//   };


//   // FOR SORT
//   const handleSort = () => {
//     setOpenSort(true);
//   };

//   const handleSortBy = (event) => {
//     const { value } = event.target;

//     if (value !== "clear") {

//       dispatch(setSortByAction({sort_by:value}));

//       const sortData = {};

//       sortData.page = 1;
//       sortData.limit = 10;

//       if(!headerFor === "most-popular"){

//         sortData.category_id = category._id;

//       }
    
//       sortData.sort_by = value.toLowerCase();
        

//       if(filter_by!== "" && filter_by!=="All locations"){

//         sortData.sort_by = value;

//         let sortAndFilterData;


//         console.log(filterData,query);

//         if(filterData){

//           sortAndFilterData = {
//             ...filterData,
//             ...sortData
            
//         }

//         }
//         else{

//           sortAndFilterData = {
//             ...query.data,
//             ...sortData
           
//         }

//         }


       

//         dispatch(sortAndFilterArticles(sortAndFilterData));

//         const queryData = {
//           for:'sort-and-filter',
//           data:sortAndFilterData
//         }
//         console.log(queryData);

//         dispatch(setQueryAction({query:queryData}));

//       }
//       else{

//         dispatch(getSortedArticlesAction(sortData));

//         const queryData = {
//           for:'sort',
//           data:sortData
//         }

//         dispatch(setQueryAction({query:queryData}));

//       }    

//       setToggleFilter(true);
//     }
//     else if(value === "clear"){
//      dispatch(setSortByAction({sort_by:value}));
//       if(filterData){

//         dispatch(getFilteredArticlesAction(filterData));

//         const queryData = {
//           for:'filter',
//           data:filterData
//         }
      
//         dispatch(setQueryAction({query:queryData}));

//       }
//       else{

//         setToggleFilter(false);

//       }
//     }

//     setOpenSort(false);
//   };

//   const dispatch = useDispatch();

//   const classes = useStyles();

//   return (
//     <Container
//       style={{
//         textAlign: "center",
//         padding: "10px 15px",
//         backgroundColor: " #1F1F1F",
//       }}
//     >
//       {/* SEARCH BAR HEADER */}
//       <div style={{ display: "flex", alignItems: "center" }}>
//         {headerFor !== "Home" && (
//           <IconButton
//             edge="start"
//             className={classes.menuButton}
//             color="inherit"
//             aria-label="open drawer"
//             style={{ marginLeft: "0px" }}
//             onClick={() => history.goBack()}
//           >
//             <ArrowBackIosIcon style={{ fontSize: "20px" }} />
//           </IconButton>
//         )}

//         {/* SEARCH BAR */}
//         <div className={classes.search} style={{ width: "100%" }}>
//           <div className={classes.searchIcon} onClick={handleSearch} >
//             <SearchIcon  />
//           </div>
//           <form id="search-text" onSubmit={handleSearch}>
//             <InputBase
//               classes={{
//                 root: classes.inputRoot,
//                 input: classes.inputInput,
//               }}
//               style={{ width: "80%" }}
//               inputProps={{ "aria-label": "search" }}
//               value={search}
//               onChange = {(event)=>{

//                 if (event.target.value.trim() !== "") {
                 
//                   setSearch(event.target.value);
                
//                 } 
//                 else if (event.target.value.trim() === "") {

//                   setSearch("");
//                   dispatch(resetSortFilterQuerySearch())
               
//                   setToggleSearch(false);
//                 }
               
               
//               }}

//             />
//           </form>
//          {search && search!== "" &&  <div className={classes.closeIcon} onClick={()=>{
//              setSearch("");
//              dispatch(resetSortFilterQuerySearch())
          
//              setToggleSearch(false);

//           }} >
//             <CloseIcon  />
//           </div>}
//         </div>

//         <IconButton
//           edge="end"
//           className={classes.menuButton}
//           color="inherit"
//           aria-label="open drawer"
//           onClick={() =>
//             history.push({
//               pathname: "/article/bookmarks",
//               // state:{ title:item.label } ,
//             })
//           }
//         >
//           <BookmarkBorderIcon style={{ fontSize: "23px" }}></BookmarkBorderIcon>
//         </IconButton>
//       </div>


      
//       {/* HEADER TEXT */}
//       {/* HOME PAGE TEXT */}
//       {headerFor === "Home" && !toggleSearch && (
//         <div>
//           <div
//             style={{
//               fontSize: matches ? "16px" : "12px",
//               fontWeight: "500",
//             }}
//           >
//             <p style={{ marginBottom: "0" }}>Your essential travel guide to</p>
//             <p style={{ marginTop: "0" }}>Discover Cambodia</p>
//           </div>
//         </div>
//       )}

//       {/* DIFFERENT FILTERS */}
//       {/* HOME PAGE FILTERS */}
//       {headerFor === "Home" && !toggleSearch &&(
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: matches ? "13px" : "9px",
//             fontWeight: "500",
//           }}
//         >
//           <div style={{ marginRight: "20px" }}>Explore :</div>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 border: "1px solid rgba(255, 255, 255, 0.23)",
//               }}
//             >
//               <Button
//                 style={{
//                   borderRadius: "0",
//                   padding: "3px 10px",
//                   fontWeight: "500",
//                   textTransform: "Capitalize",
//                   fontSize: matches ? "13px" : "9px",
//                 }}
//                 onClick={handleOpen}
//               >
//                 <LocationOnOutlinedIcon
//                   style={{ fontSize: "20px" }}
//                 ></LocationOnOutlinedIcon>{" "}
//                 <span
//                   style={{
//                     borderLeft: "1px solid #fff",
//                     marginLeft: "5px",
//                     paddingLeft: "10px",
//                   }}
//                 >
//                   {filter_by}
//                 </span>
//               </Button>
//               {toggleFilter && (
//                 <CloseSharpIcon
//                   style={{ fontSize: "16px", marginRight: "5px" }}
//                   onClick={() => {
//                     setToggleFilter(false);
//                     dispatch(setFilterByAction({filter_by:'All locations'}))
//                   }}
//                 ></CloseSharpIcon>
//               )}
//             </div>

//             <Modal
//               aria-labelledby="transition-modal-title"
//               aria-describedby="transition-modal-description"
//               className={classes.modal}
//               open={open}
//               onClose={handleClose}
//               closeAfterTransition
//               BackdropComponent={Backdrop}
//               BackdropProps={{
//                 timeout: 500,
//               }}
//             >
//               <Fade in={open}>
//                 <div className={classes.paper}>
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       padding: "13px 13px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         marginRight: "18px",
//                       }}
//                     >
//                       <ArrowBackIosSharpIcon
//                         onClick={handleClose}
//                       ></ArrowBackIosSharpIcon>
//                     </div>{" "}
//                     <div>Select a Specific Destination Below</div>{" "}
//                   </div>

//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       fontSize: matches ? "13px" : "9px",
//                       borderBottom: "1px solid #525660",
//                       paddingBottom: "10px",
//                       paddingLeft:"55px"
//                     }}
//                   >
//                     <div style={{marginRight:"20px"}}>Explore</div>
//                     <Button
//                       variant="outlined"
//                       style={{
//                         borderRadius: "0",
//                         padding: "3px 10px",
//                         fontWeight: "500",
//                         textTransform: "Capitalize",
//                         fontSize: matches ? "13px" : "9px"
//                       }}
//                       disabled
//                     >
//                       <LocationOnOutlinedIcon
//                         style={{ fontSize: "20px" }}
//                       ></LocationOnOutlinedIcon>{" "}
//                       <span
//                         style={{
//                           borderLeft: "1px solid #fff",
//                           marginLeft: "5px",
//                           paddingLeft: "10px",
//                           color: "#4285F4",
//                           fontSize: matches ? "13px" : "9px",
//                         }}
//                       >
//                         {filter_by}
//                       </span>
//                     </Button>
//                   </div>
//                   <Accordion
//                     style={{
//                       margin: "0",
//                       borderRadius: "0",
//                       backgroundColor: "transparent",
//                       borderBottom: "1px solid #525660",
//                     }}
//                     defaultExpanded={true}
//                   >
//                     <AccordionSummary
//                       expandIcon={<ExpandMoreIcon />}
//                       aria-controls="panel1a-content"
//                       id="panel1a-header"
//                     >
//                       <Typography className={classes.heading}>
//                         By Temple
//                       </Typography>
//                     </AccordionSummary>
//                     <AccordionDetails
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "space-around",
//                         paddingTop: "10px",
//                         paddingLeft: "22px"
//                       }}
//                     >
//                       {open &&
//                         categoryList.map((data) => {
//                           if (
//                             data.category_name.toLowerCase() === "temple guide"
//                           ) {
//                             return data.sub_category.map(
//                               (sub_category, index) => (
//                                 <Typography
//                                   key={`${sub_category._id}-${index}`}
//                                   className={
//                                     filter_by === sub_category.name
//                                       ? classes.selectedItem
//                                       : classes.accordionOption
//                                   }
//                                   onClick={() => {
//                                     const filterData = {};
//                                     filterData.filter_by =
//                                       "category-and-sub-category";
//                                     filterData.category_id = data._id;
//                                     filterData.sub_category_id =
//                                       sub_category._id;

//                                     dispatch(setFilterByAction({filter_by:sub_category.name}))
//                                     handleClose(filterData);
//                                   }}
//                                 >
//                                   {sub_category.name}
//                                 </Typography>
//                               )
//                             );
//                           }
//                         })}
//                     </AccordionDetails>
//                   </Accordion>

//                   <Accordion
//                     style={{
//                       margin: "0",
//                       borderRadius: "0",
//                       backgroundColor: "transparent",
//                       borderBottom: "1px solid #525660",
//                     }}
//                     defaultExpanded={true}
//                   >
//                     <AccordionSummary
//                       expandIcon={<ExpandMoreIcon />}
//                       aria-controls="panel1a-content"
//                       id="panel1a-header"
//                     >
//                       <Typography className={classes.heading}>
//                         By Location
//                       </Typography>
//                     </AccordionSummary>
//                     <AccordionDetails
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "space-around",
//                         paddingTop: "0px",
//                         paddingLeft: "22px"
//                       }}
//                     >
//                       {open &&
//                         provinceList.map((data, index) => (
//                           <Typography
//                             key={`${data._id}-${index}`}
//                             className={
//                               filter_by === data.province
//                                 ? classes.selectedItem
//                                 : classes.accordionOption
//                             }
//                             onClick={() => {
//                               const filterData = {};
//                               filterData.filter_by = "province";
//                               filterData.province_id = data._id;
//                               dispatch(setFilterByAction({filter_by:data.province}));
//                               handleClose(filterData);
//                             }}
//                           >
//                             {" "}
//                             {data.province}{" "}
//                           </Typography>
//                         ))}
//                     </AccordionDetails>
//                   </Accordion>
//                 </div>
//               </Fade>
//             </Modal>
//           </div>
//         </div>
//       )}

//       { toggleSearch &&
//                 <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   fontSize: "13px",
//                   fontWeight: "500",
//                   marginTop: "20px",
//                 }}
//               >
//                 <Typography
//                   style={{ marginRight: "10px", fontSize: "12px", fontWeight: "500" }}
//                 >
//                   Search result
//                 </Typography>
//               </div>
//       }





//       {/* Articles Page FILTERS */}
//       {/* {forPopular && (
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             fontSize: "13px",
//             fontWeight: "500",
//             marginTop: "20px",
//           }}
//         >
//           <Typography
//             style={{ marginRight: "10px", fontSize: "12px", fontWeight: "500" }}
//           >
//             MostPopular
//           </Typography>
//         </div>
//       )} */}


//       {headerFor === "most-popular" && !toggleSearch && (
//               <div>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     fontSize: "13px",
//                     fontWeight: "500",
//                     marginTop: "20px",
//                   }}
//                 >
//                   {/* SORT FILTER */}
//                   <div>
//                     <Typography
//                       style={{
//                         marginRight: "10px",
//                         fontSize: "12px",
//                         fontWeight: "500",
//                       }}
//                     >
//                     Most Popular
//                     </Typography>
//                   </div>

//                   {/* SORT */}
//                   <div style={{ display: "flex" }}>
//                     <div style={{ display: "flex", marginRight: "10px" }}>
//                       <div style={{ display: "flex", alignItems: "center" }}>
//                         <Typography
//                           style={{ marginRight: "10px", fontSize: "12px" }}
//                           onClick={handleSort}
//                         >
//                           Sort
//                         </Typography>
//                       </div>

//                       <SortIcon
//                         style={{ fontSize: "20px" }}
//                         onClick={handleSort}
//                       ></SortIcon>
//                       <Modal
//                         aria-labelledby="transition-modal-title"
//                         aria-describedby="transition-modal-description"
//                         className={classes.modal}
//                         open={openSort}
//                         onClose={() => {
//                           setOpenSort(false);
//                         }}
//                         closeAfterTransition
//                         BackdropComponent={Backdrop}
//                         BackdropProps={{
//                           timeout: 500,
//                         }}
//                       >
//                         <Fade in={openSort}>
//                           <div className={classes.paper}>
//                             <div
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 padding: "13px 13px",
//                                 // borderBottom: "1px solid #525660"
//                               }}
//                             >
//                               <div
//                                 style={{
//                                   display: "flex",
//                                   alignItems: "center",
//                                   marginRight: "18px",
//                                 }}
//                               >
//                                 <ArrowBackIosSharpIcon
//                                   onClick={() => {
//                                     setOpenSort(false);
//                                   }}
//                                 ></ArrowBackIosSharpIcon>
//                               </div>{" "}
//                               <div style={{ fontWeight: "500" }}> Sort By</div>
//                             </div>
//                             <div style={{ padding: "20px", fontSize: "13px" }}>
//                               <FormControl component="fieldset">
//                                 <RadioGroup
//                                   aria-label="Sort By"
//                                   name="sort-by"
//                                   value={sort_by}
//                                   onChange={handleSortBy}
//                                 >

//                                   <FormControlLabel
//                                     value="popularity"
//                                     control={<Radio size={"small"} />}
//                                     label="Popularity"
//                                     classes={{
//                                       label: classes.label,
//                                     }}
//                                   />

//                                   <FormControlLabel
//                                     value="popularity_alphabetical"
//                                     control={<Radio size={"small"} />}
//                                     label="Alphabetical"
//                                     classes={{
//                                       label: classes.label,
//                                     }}
//                                   />                                 
//                                    <FormControlLabel
//                                     value="popularity_date"
//                                     control={<Radio size={"small"} />}
//                                     label="Date"
//                                     classes={{
//                                       label: classes.label,
//                                     }}
//                                   />
//                                 </RadioGroup>
//                               </FormControl>
//                             </div>
//                           </div>
//                         </Fade>
//                       </Modal>
//                     </div>

//                     {/* FILTER */}
//                     <div style={{ display: "flex" }}>
//                       <div style={{ display: "flex", alignItems: "center" }}>
//                         <Typography
//                           style={{ marginRight: "10px", fontSize: "12px" }}
//                           onClick={handleOpen}
//                         >
//                           Filter
//                         </Typography>

//                       </div>

//                       <FilterListIcon
//                         style={{ fontSize: "20px" }}
//                         onClick={handleOpen}
//                       ></FilterListIcon>
//                       <Modal
//                         aria-labelledby="transition-modal-title"
//                         aria-describedby="transition-modal-description"
//                         className={classes.modal}
//                         open={open}
//                         onClose={handleClose}
//                         closeAfterTransition
//                         BackdropComponent={Backdrop}
//                         BackdropProps={{
//                           timeout: 500,
//                         }}
//                       >
//                         <Fade in={open}>
//                           <div className={classes.paper}>
//                             <div
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 padding: "13px 13px",
//                                 // borderBottom: "1px solid #525660"
//                               }}
//                             >
//                               <div
//                                 style={{
//                                   display: "flex",
//                                   alignItems: "center",
//                                   marginRight: "18px",
//                                 }}
//                               >
//                                 <ArrowBackIosSharpIcon
//                                   onClick={handleClose}
//                                 ></ArrowBackIosSharpIcon>
//                               </div>{" "}
//                               <div style={{ fontWeight: "500" }}>Filter By</div>{" "}
//                             </div>
                            
//                             <Accordion
//                     style={{
//                       margin: "0",
//                       borderRadius: "0",
//                       backgroundColor: "transparent",
//                       borderBottom: "1px solid #525660",
//                     }}
//                     defaultExpanded={true}
//                   >
//                     <AccordionSummary
//                       expandIcon={<ExpandMoreIcon />}
//                       aria-controls="panel1a-content"
//                       id="panel1a-header"
//                     >
//                       <Typography className={classes.heading}>
//                         By Location
//                       </Typography>
//                     </AccordionSummary>
//                     <AccordionDetails
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "space-around",
//                         paddingTop: "0px",
//                         paddingLeft: "22px"
//                       }}
//                     >
//                       {open &&
//                         provinceList.map((data, index) => (
//                           <Typography
//                             key={`${data._id}-${index}`}
//                             className={
//                               filter_by === data.province
//                                 ? classes.selectedItem
//                                 : classes.accordionOption
//                             }
//                             onClick={() => {
//                               const filterData = {};
//                               filterData.filter_by = "popularity_province";
//                               filterData.province_id = data._id;
//                               dispatch(setFilterByAction({filter_by:data.province}))
//                               handleClose(filterData);
//                             }}
//                           >
//                             {" "}
//                             {data.province}{" "}
//                           </Typography>
//                         ))}
//                     </AccordionDetails>
//                   </Accordion>
                            

//                           </div>
//                         </Fade>
//                       </Modal>
//                     </div>
//                   </div>
//                 </div>
//                 <div style={{ marginTop: "10px" }}>
//                   {/* {sortBy !== "" && toggleFilter && (
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <Typography style={{ fontSize: "12px" }}>Sorted By</Typography>{" "}
//                       <Button
//                         variant="outlined"
//                         style={{
//                           padding: "0 5px",
//                           fontSize: "12px",
//                           fontWeight: "200",
//                           margin: "0 10px",
//                           textTransform: "Capitalize",
//                         }}
//                       >
//                         {sortBy}
//                         <CloseSharpIcon
//                           style={{ fontSize: "16px" ,margin:"5px"}}
//                           onClick={() => {
//                             setToggleFilter(false);
//                             setSortBy("");
//                             setOpenSort(false);
//                           }}
//                         ></CloseSharpIcon>
//                       </Button>
//                     </div>
//                   )} */}
//                   {filter_by !== "" && filter_by!== "All locations" && toggleFilter && (
//                       <div style={{ display: "flex", alignItems: "center" }}>
//                       <Typography style={{ fontSize: "12px" }}>Filtered By</Typography>{" "}
//                           <Button
//                             variant="outlined"
//                             style={{
//                               padding: "0 5px",
//                               fontSize: "12px",
//                               fontWeight: "200",
//                               margin: "0 10px",
//                               textTransform: "Capitalize",
//                             }}
//                           >
//                             {filter_by}
//                             <CloseSharpIcon
//                               style={{ fontSize: "16px",margin:"5px" }}
//                               onClick={() => {
//                                 setToggleFilter(false);
//                                 dispatch(setFilterByAction({filter_by:""}))
//                                 setFilterData(null);
//                               }}
//                             ></CloseSharpIcon>
//                           </Button>
//                           </div>
//                         )}
//                 </div>
//               </div>
//             )}




//       {headerFor === "articles-by-category" &&   !toggleSearch &&(
//         <div>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               fontSize: "13px",
//               fontWeight: "500",
//               marginTop: "20px",
//             }}
//           >
//             {/* SORT FILTER */}
//             <div>
//               <Typography
//                 style={{
//                   marginRight: "10px",
//                   fontSize: "12px",
//                   fontWeight: "500",
//                 }}
//               >
//                 {category_title}
//               </Typography>
//             </div>

           
//             <div style={{ display: "flex" }}>
//                {/* SORT */}
//               <div style={{ display: "flex", marginRight: "10px" }}>
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                   <Typography
//                     style={{ marginRight: "10px", fontSize: "12px" }}
//                     onClick={handleSort}
//                   >
//                     Sort
//                   </Typography>
//                 </div>

//                 <SortIcon
//                   style={{ fontSize: "20px" }}
//                   onClick={handleSort}
//                 ></SortIcon>
//                 <Modal
//                   aria-labelledby="transition-modal-title"
//                   aria-describedby="transition-modal-description"
//                   className={classes.modal}
//                   open={openSort}
//                   onClose={() => {
//                     setOpenSort(false);
//                   }}
//                   closeAfterTransition
//                   BackdropComponent={Backdrop}
//                   BackdropProps={{
//                     timeout: 500,
//                   }}
//                 >
//                   <Fade in={openSort}>
//                     <div className={classes.paper}>
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           padding: "13px 13px",
//                           // borderBottom: "1px solid #525660"
//                         }}
//                       >
//                         <div
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             marginRight: "18px",
//                           }}
//                         >
//                           <ArrowBackIosSharpIcon
//                             onClick={() => {
//                               setOpenSort(false);
//                             }}
//                           ></ArrowBackIosSharpIcon>
//                         </div>{" "}
//                         <div style={{ fontWeight: "500" }}> Sort By</div>
//                       </div>
//                       <div style={{ padding: "20px", fontSize: "13px" }}>
//                         <FormControl component="fieldset">
//                           <RadioGroup
//                             aria-label="Sort By"
//                             name="sort-by"
//                             value={sort_by}
//                             onChange={handleSortBy}
//                           >
//                             <FormControlLabel
//                               value="popularity"
//                               control={<Radio size={"small"} />}
//                               label="Popularity"
//                               classes={{
//                                 label: classes.label,
//                               }}
                  
//                             />
//                             <FormControlLabel
//                               value="alphabetical"
//                               control={<Radio size={"small"} />}
//                               label="Alphabetical"
//                               classes={{
//                                 label: classes.label,
//                               }}
//                             />
//                             <FormControlLabel
//                               value="date"
//                               control={<Radio size={"small"} />}
//                               label="Date"
//                               classes={{
//                                 label: classes.label,
//                               }}
//                             />
                            
//                           </RadioGroup>
//                         </FormControl>
//                       </div>
//                     </div>
//                   </Fade>
//                 </Modal>
//               </div>

//               {/* FILTER */}
//               <div style={{ display: "flex" }}>
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                   <Typography
//                     style={{ marginRight: "10px", fontSize: "12px" }}
//                     onClick={handleOpen}
//                   >
//                     Filter
//                   </Typography>

//                 </div>

//                 <FilterListIcon
//                   style={{ fontSize: "20px" }}
//                   onClick={handleOpen}
//                 ></FilterListIcon>
//                 <Modal
//                   aria-labelledby="transition-modal-title"
//                   aria-describedby="transition-modal-description"
//                   className={classes.modal}
//                   open={open}
//                   onClose={handleClose}
//                   closeAfterTransition
//                   BackdropComponent={Backdrop}
//                   BackdropProps={{
//                     timeout: 500,
//                   }}
//                 >
//                   <Fade in={open}>
//                     <div className={classes.paper}>
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           padding: "13px 13px",
//                           // borderBottom: "1px solid #525660"
//                         }}
//                       >
//                         <div
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             marginRight: "18px",
//                           }}
//                         >
//                           <ArrowBackIosSharpIcon
//                             onClick={handleClose}
//                           ></ArrowBackIosSharpIcon>
//                         </div>{" "}
//                         <div style={{ fontWeight: "500" }}>Filter By</div>{" "}
//                       </div>
//                       <Accordion
//                         style={{
//                           margin: "0",
//                           borderRadius: "0",
//                           backgroundColor: "transparent",
//                           borderBottom: "1px solid #525660",
//                         }}
//                         defaultExpanded={true}
//                       >
//                         <AccordionSummary
//                           expandIcon={<ExpandMoreIcon />}
//                           aria-controls="panel1a-content"
//                           id="panel1a-header"
//                         >
//                           <Typography className={classes.heading}>
//                             By SubCategory
//                           </Typography>
//                         </AccordionSummary>
//                         <AccordionDetails
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             justifyContent: "space-around",
//                             paddingTop: "0px",
//                             paddingLeft: "22px",
//                           }}
//                         >
//                           {open && category.sub_category.length > 0 ? (
//                             category.sub_category.map((sub_category, index) => (
//                               <Typography
//                                 key={`${sub_category._id}-${index}`}
//                                 className={
//                                   filter_by === sub_category.name
//                                     ? classes.selectedItem
//                                     : classes.accordionOption
//                                 }
//                                 onClick={() => {
//                                   const filterData = {};
//                                   filterData.filter_by =
//                                     "category-and-sub-category";
//                                   filterData.category_id = category._id;
//                                   filterData.sub_category_id = sub_category._id;

//                                   dispatch(setFilterByAction({filter_by:sub_category.name}))
//                                   handleClose(filterData);
//                                 }}
//                               >
//                                 {sub_category.name}
//                               </Typography>
//                             ))
//                           ) : (
//                             <Typography>
//                               No sub category found for this category
//                             </Typography>
//                           )}
//                         </AccordionDetails>
//                       </Accordion>

//                       <Accordion
//                         style={{
//                           margin: "0",
//                           borderRadius: "0",
//                           backgroundColor: "transparent",
//                           borderBottom: "1px solid #525660",
//                         }}
//                         defaultExpanded={true}
//                       >
//                         <AccordionSummary
//                           expandIcon={<ExpandMoreIcon />}
//                           aria-controls="panel1a-content"
//                           id="panel1a-header"
//                         >
//                           <Typography className={classes.heading}>
//                             By Location
//                           </Typography>
//                         </AccordionSummary>
//                         <AccordionDetails
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             justifyContent: "space-around",
//                             paddingTop: "0px",
//                             paddingLeft: "22px",
//                           }}
//                         >
//                           {open &&
//                             provinceList.map((data, index) => (
//                               <Typography
//                                 key={`${data._id}-${index}`}
//                                 className={
//                                   filter_by === data.province
//                                     ? classes.selectedItem
//                                     : classes.accordionOption
//                                 }
//                                 onClick={() => {
//                                   const filterData = {};
//                                   filterData.filter_by =
//                                     "category-and-province";
//                                   filterData.province_id = data._id;
//                                   filterData.category_id = category._id;
//                                   dispatch(setFilterByAction({filter_by:data.province}))
//                                   handleClose(filterData);
//                                 }}
//                               >
//                                 {" "}
//                                 {data.province}{" "}
//                               </Typography>
//                             ))}
//                         </AccordionDetails>
//                       </Accordion>
//                     </div>
//                   </Fade>
//                 </Modal>
//               </div>
//             </div>
//           </div>
//           <div style={{ marginTop: "10px" }}>
//             {filter_by !== "" && filter_by !== "All locations" && toggleFilter && (
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                 <Typography style={{ fontSize: "12px" }}>Filtered By</Typography>{" "}
//                     <Button
//                       variant="outlined"
//                       style={{
//                         padding: "0 5px",
//                         fontSize: "12px",
//                         fontWeight: "200",
//                         margin: "0 10px",
//                         textTransform: "Capitalize",
//                       }}
//                     >
//                       {filter_by}
//                       <CloseSharpIcon
//                         style={{ fontSize: "16px",margin:"5px" }}
//                         onClick={() => {
//                           setToggleFilter(false);
//                           setFilterData(null);
//                           dispatch(setFilterByAction({filter_by:""}))
//                         }}
//                       ></CloseSharpIcon>
//                     </Button>
//                     </div>
//                   )}
//           </div>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default ArticleHeader;
