import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const TakeNote = () => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
        <div>
            <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center',height:'100vh' }}><Button variant="contained" onClick={ handleClickOpen }>Take a note</Button></Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Note</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="outlined" onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TakeNote;