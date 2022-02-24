import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

const Note = ({data, onClick}:{ data: {
    title: string,
    note: string,
    date: string,
    bgColor: string,
    id: string
}, onClick:any }) => {
    interface INote {
        title: string,
        note: string,
        date: string,
        bgColor: string,
        id: string
    }
    const [open, setOpen] = useState(false);
    const date = new Date().toLocaleDateString();
    const bgColor = data.bgColor === 'red' ? 'white' : 'black';
    const [ color, setColor ] = useState<string>(data.bgColor);
    const titleRef = useRef<HTMLInputElement>(null);
    const noteRef = useRef<HTMLInputElement>(null);

    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
    useEffect( ()=>{
        setColor(data.bgColor)
    },[open])
    // set note to local storage
    const setNoteToLocalS =(note: INote[])=>{
        localStorage.setItem('notes',JSON.stringify(note))
    }

    const handleOnSave = () =>{
        if(titleRef.current && noteRef.current){
            const newNote: INote = {
                title: titleRef.current.value,
                note: noteRef.current.value,
                date: date,
                bgColor: color,
                id: data.id
            }
            onClick({type:'EDIT', id:data.id, payload: newNote})
            setOpen(false);
        }
    }
    return (
            <div>
                <Dialog open={open} onClose={handleClose} >
                <div style={{backgroundColor:color}}>
                    <DialogTitle>Edit Note </DialogTitle>
                    <DialogContent>
                        <Box><Typography>Background Color:</Typography></Box>
                    <Box className='color-box-container' sx={{my:1}}>
                        <div onClick={ ()=> setColor('white')} className={`color-box ${color === 'white' && 'active-color'}`} style={{backgroundColor:'white', marginRight:'5px'}}></div>
                        <div onClick={ ()=> setColor('red')}className={`color-box ${color === 'red' && 'active-color'}`} style={{backgroundColor:'red', marginRight:'5px'}}></div>
                        <div onClick={ ()=> setColor('yellow')} className={`color-box ${color === 'yellow' && 'active-color'}`} style={{backgroundColor:'yellow', marginRight:'5px'}}></div>
                        <div onClick={ ()=> setColor('pink')} className={`color-box ${color === 'pink' && 'active-color'}`} style={{backgroundColor:'pink', marginRight:'5px'}}></div>
                        <div onClick={ ()=> setColor('orange')} className={`color-box ${color === 'orange' && 'active-color'}`} style={{backgroundColor:'orange', marginRight:'5px'}}></div>
                        <div onClick={ ()=> setColor('violet')} className={`color-box ${color === 'violet' && 'active-color'}`} style={{backgroundColor:'violet', marginRight:'5px'}}></div>
                    </Box>
                    <TextField
                        margin="dense"
                        id="title"
                        label="Title"
                        name="title"
                        type="text"
                        fullWidth
                        variant="outlined"
                        inputRef={ titleRef }
                        defaultValue={data.title}
                    />
                    <TextField
                        margin="dense"
                        name="note"
                        id="note"
                        label="Your Note"
                        type="text"
                        fullWidth
                        variant="outlined"
                        multiline
                        inputRef={ noteRef }
                        defaultValue={data.note}
                    />
                    <TextField
                    margin="dense"
                    disabled
                    id="outlined-disabled"
                    label="Date"
                    defaultValue={date}
                    fullWidth
                    />
                    <DialogActions sx={{mt:1}}>
                        <Button onClick={handleClose} variant="contained"color="error">Cancel</Button>
                        <Button onClick={ handleOnSave } variant="contained" color="success">Save</Button>
                    </DialogActions>
                    </DialogContent>
                    
                </div>
                
            </Dialog>
                <Paper elevation={3} style={{backgroundColor:data.bgColor,color:bgColor,padding:'15px'}}> 
                    <Typography>{data.date}</Typography>
                    <Typography sx={{mb:1}} variant='h5'>{data.title}</Typography>
                    <b>{data.note}</b>
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <Button onClick={handleClickOpen}>Edit</Button>
                        <Button onClick={ ()=> onClick({type:'REMOVE', id: data.id})}>Delete</Button>
                    </div>
                </Paper>
            </div>
    );
};

export default Note;