import React from 'react'
import { CircularProgress, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  wrapper:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    width:'100%'
  },
  desc:{
    marginTop:'1rem'
  }
}))

const CustomLoader = ({customStyles,description}) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper} style={customStyles ? {...customStyles} : {}}>
      <CircularProgress color='secondary' />
      {description !=='' && <Typography variant="body2" color="initial" className={classes.desc}>{description}</Typography>}
    </div>
  )
}

export default CustomLoader
