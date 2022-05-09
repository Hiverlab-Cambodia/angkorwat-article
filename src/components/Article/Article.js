import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import CardMedia from "@material-ui/core/CardMedia";
import dayjs from "dayjs";

const demoImage =
  "https://images.pexels.com/photos/5993005/pexels-photo-5993005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
const useStyles = makeStyles({
  card: {
    "boxShadow": "none",
    "position": "relative",
    "borderRadius": "10px",
    "backgroundPosition": "center",
    "backgroundSize": "cover",
    "backgroundRepeat": "no-repeat",
    "&:after": {
      content: '""',
      display: "block",
      position: "absolute",
      width: "100%",
      height: "64%",
      bottom: 0,
      zIndex: 1,
    },
  },
  content: {
    background: "linear-gradient(to top, #000, rgb(0 0 0 / 35%));",
    position: "absolute",
    zIndex: 2,
    bottom: 0,
    width: "100%",
    padding: "0 29px 30px 32px",
    display: "flex",
    alignItems: "flex-end",
    height: "100%",
  },
  mediaStyles: {},
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Article = (props) => {

  const { article, history, location, category_title, displayFor } = props;
  
  const clickPath = history.location.pathname.search('article') >= 0 ? '':'article/'

  const language = sessionStorage.getItem("lang");
  const classes = useStyles();
 
return (
  <Card className={classes.card}
    style={{ backgroundImage: article?.media_images[0]?.path ? `url(http://localhost:5006/v1/${article?.media_images[0].path})`: `url(${demoImage})`,
      minHeight: displayFor === "Home" ? "268px" : "200px",
      borderRadius: displayFor === "Home" && "0px",
      // minWidth: displayFor === "Home" && '375px' ,
    }}
    
    onClick={() => {

      if( displayFor==="Bookmark"){
        history.push({
          pathname: `${clickPath}bookmarks/${article._id}/`,
          search: `?lang=${language}`,
          state: { title: "article-page", selectedArticle: article, headerFor:history.location.state?.headerFor ,category:history.location.state?.category},
        });
      } else if(displayFor ==="most-popular") {
        history.push({
          pathname: `${clickPath}${category_title}/${article._id}/`,
          search: `?lang=${language}`,
          state: { title: "most-popular", selectedArticle: article,headerFor:history.location.state?.headerFor},
        });
      } else if(displayFor ==="Home-Search") {
        history.push({
          pathname: `${clickPath}${category_title}/${article._id}/`,
          search: `?lang=${language}`,
          state: { title: "Home-Search", selectedArticle: article,headerFor:history.location.state?.headerFor},
        });
      }else {
        history.push({
          pathname: `${clickPath}${category_title}/${article._id}/`,
          search: `?lang=${language}`,
          state: { title: "article-page", selectedArticle: article,headerFor:history.location.state?.headerFor},
        });
      }
    }}
  >
  <CardContent className={classes.content} style={{ padding: displayFor !== "Home" && "0 9px 20px 20px" }}>
    <div>
      <Typography className={classes.title} color="textSecondary" gutterBottom style={{ fontSize: "12px", fontWeight: "700" }}>
        {language ==='en'? (article?.category?.[0]?.translations?.en?.category_name) : (article?.category?.[0]?.translations?.kh?.category_name)}
      </Typography>
      <Typography variant="h5" component="h2" style={{ fontSize: "18px",fontWeight: "300",textTransform: "capitalize"}}>
        {language ==='en'? (article?.translations?.en?.title.toLowerCase()):(article?.translations?.kh?.title.toLowerCase())}
      </Typography>
      <Typography className={classes.pos} color="textSecondary" style={{ fontSize: "11px", fontWeight: "300" }}>
        {article.updatedAt && dayjs(article.createdAt).format("DD MMMM YYYY")}
      </Typography>
      <Typography variant="body2" component="p" style={{ fontSize: "11px", fontWeight: "300" }}>
        {/* {article.description.length && article.description.length > 70
          ? article.description.slice(0, 70).toLowerCase() + "..."
          : article.description.toLowerCase()} */}
        {language==='en'? (article?.translations?.en?.description.length && article?.translations?.en?.description.length > 70
          ? article?.translations?.en?.description.slice(0, 70).toLowerCase() + "..."
          : article?.translations?.en?.description.toLowerCase()) : (article?.translations?.kh?.description.length && article?.translations?.kh?.description.length > 70
            ? article?.translations?.kh?.description.slice(0, 70).toLowerCase() + "..."
            : article?.translations?.kh?.description.toLowerCase())
          } 
      </Typography>
    </div>
  </CardContent>
</Card>
);
};

export default Article;