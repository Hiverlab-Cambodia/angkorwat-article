import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    width: "150px",
    height: "220px",
    backgroundColor:" #1f1f1f",
    margin: "10px",
    borderRadius: "8px",
    backgroundColor:"#424242",
    flexShrink:0
  },
  media: {
    height: 100,
  },
});

export default function RecommendationCard(props) {
    const {imgPath,isService,isProduct} = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imgPath}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" style={{fontSize:"14px"}}>
            {isService && isService.service_title}{isProduct && isProduct.product_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {isService && isService.package}{isProduct && isProduct.price} $
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}
