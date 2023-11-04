import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function Toaster(message) {
    return (
        <div>
            <Snackbar
  open={open}
  autoHideDuration={6000}
  message={message}
  action={action}
/>
        </div>
    )
}

export default Toaster
