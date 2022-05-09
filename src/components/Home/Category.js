import React from "react";
import {
  Typography,
  Container,
  Card,
  CardActionArea,
  CardMedia,
  makeStyles,
  Grid,
} from "@material-ui/core";
import SectionTitle from "../../UI/SectionTitle";
import CategoryLoader from "./CategoryLoader";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 180,
  },
  mediaLabel:{
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
});

const Category = ({ history, categoryList, isCategorySectionLoading }) => {
  const classes = useStyles();

  return (
    <div>
      <SectionTitle title="Category" />
      <Container>
      <Grid container spacing={3}>
        {isCategorySectionLoading ? (
          Array.from({length:4},(_,index)=><CategoryLoader key={index} />)
        ) : categoryList.map((category, index) => (
              <Grid key={category.translations?.en?.category_name} item xs={12} md={6} lg={4}>
                <Card
                  className={classes.root}
                  onClick={() =>
                    history.push({
                      pathname: `${category.translations?.en?.category_name}`,
                      state: { subCategory: category.sub_category },
                    })
                  }
                >
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={category.image}
                      title={category.translations?.en?.category_name}
                    >
                      <div className={classes.mediaLabel}>
                        <Typography variant="h4" color="initial" align="center" style={{padding:'0 10px'}}>
                          {category.translations?.en?.category_name}
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

export default Category;
