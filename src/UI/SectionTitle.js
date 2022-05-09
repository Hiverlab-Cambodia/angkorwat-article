import React from "react";
import { Button, Typography, Container } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useTranslation } from 'react-i18next'

const SectionTitle = ({ title, onClick, customStyles }) => {

  const [ t] = useTranslation('common')

  return (
    <Container
      style={{
        paddingTop: "1rem",
        paddingBottom: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize:"14px",
        ...customStyles
      }}
    >
      <Typography style={{fontSize:"14px",fontWeight:"500"}} color="default">
        {title}
      </Typography>
      {onClick ? (
        <Button variant="text" style={{textTransform:"Capitalize"}} color="default" onClick={onClick}>
          {t('home.view-all')} <ArrowForwardIosIcon style={{fontSize:"14px", marginLeft:5 }} />
        </Button>
      ) : null}
    </Container>
  );
};

export default SectionTitle;
