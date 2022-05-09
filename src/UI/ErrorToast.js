import React, { useState } from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useDispatch } from 'react-redux'
import { resetArticleSuccessStatusAction } from '../store/actions'

const ErrorToast = ({open,message}) => {
  

  const [openToast,setOpenToast] = useState(open);
  const dispatch = useDispatch();

  const handleClose = () => {

    dispatch(resetArticleSuccessStatusAction());  
    setOpenToast(false);

  }

  return (
    <Snackbar open={openToast} autoHideDuration={3000}  onClose={handleClose}>
        <Alert icon={false} onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
  )
}

export default ErrorToast
