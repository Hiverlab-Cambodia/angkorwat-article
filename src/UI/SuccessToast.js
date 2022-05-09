import React, { useState } from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { resetArticleSuccessStatusAction } from '../store/actions'
import { useDispatch } from 'react-redux'

const SuccessToast = ({open,message}) => {

  const [openToast,setOpenToast] = useState(open);
  const dispatch = useDispatch();

  const handleClose = () => {

    dispatch(resetArticleSuccessStatusAction());  
    setOpenToast(false);

  }

  return (
    <Snackbar open={openToast} autoHideDuration={3000}  onClose={handleClose}>
        <Alert icon={false} severity="success" style={{color: "#fff",
    backgroundColor:" black"}}>
          {message}
        </Alert>
      </Snackbar>
  )
}

export default SuccessToast
//Add this in snakbar and alert tag if needed in future onClose={handleClose}