import React from "react";
import {Typography,Container,Card,CardActionArea,CardMedia,makeStyles,Grid} from "@material-ui/core";
import SectionTitle from "../../UI/SectionTitle";
import CategoryLoader from "../Home/CategoryLoader";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  root: {
    height: "140px",
    borderRadius: "16px",
  },
  media: {
    background: "linear-gradient(to top, #000000bd, rgba(0,0,0,0))",
  },
  mediaLabel: {
    fontSize: "23px",
    fontWight: "500",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    height: "140px",
    paddingBottom: "15px",
  },
});

const ArticleCategory = ({history,location,categoryList,isCategorySectionLoading}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("common");
  const language = sessionStorage.getItem("lang");

return (
  <div>
    <SectionTitle title={t("home.browse-by-interest")} />
      <Container>
        <Grid container spacing={3}>
          {isCategorySectionLoading
            ? Array.from({ length: 4 }, (_, index) => (<CategoryLoader key={index} />))
            : categoryList.map((category, index) => (
                <Grid key={category?.translations?.en?.category_name} item xs={12} md={6} lg={4}>
                  <Card className={classes.root}
                    style={{backgroundImage: category.category_image
                        ? `url(http://localhost:5006/v1/${category.category_image})`
                        : "",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                    onClick={() => {
                     
                      history.push({
                        pathname: `article/${
                          language==='en'? (category?.translations?.en?.category_name):(category?.translations?.kh?.category_name)
                        }`,
                        search:`?lang=${sessionStorage.getItem("lang")}`,
                        state: {
                          selectedCategory: category,
                          title: language==='en'? (category?.translations?.en?.category_name) :(category?.translations?.kh?.category_name ),
                          categoryList,
                        },
                      });
                    }}
                  >
                    <CardActionArea>
                      <CardMedia className={classes.media}>
                        <div className={classes.mediaLabel}>
                          <Typography color="initial" align="center" style={{padding: "0 10px",fontSize: "23px",fontWeight: "500"}}>
                            {language==='en'? (category?.translations?.en?.category_name):(category?.translations?.kh?.category_name)}
                          </Typography>
                        </div>
                      </CardMedia>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ArticleCategory;
