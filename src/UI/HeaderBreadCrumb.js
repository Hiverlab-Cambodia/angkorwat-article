import React from "react";
import { Typography, Breadcrumbs } from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const HeaderBreadCrumb = ({ path, history }) => {
  return (
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        style={{margin:'1rem 0 0 0'}}
      >
        {path &&
          path.length > 0 &&
          path.map((element, index) =>
            path.length - 1 === index ? (
              <span>{element}</span>
            ) : (
                <Typography
                  color="inherit"
                  href="/getting-started/installation/"
                  onClick={() => history.goBack()}
                  style={{cursor:'pointer'}}
                >
                  {element}
                </Typography>
            )
          )}
      </Breadcrumbs>
  );
};

export default HeaderBreadCrumb;
