import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import './takeNote.css';
import Note from '../TakeNote/Note/Note'

const TakeNote = () => {
    interface INote {
        title: string,
        note: string,
        date: string,
        bgColor: string,
        id?: number
    }
    const date = new Date().toLocaleDateString()
    const [open, setOpen] = useState(false);
    const [ color, setColor ] = useState<string>('white');
    const titleRef = useRef<HTMLInputElement>(null);
    const noteRef = useRef<HTMLInputElement>(null);

    type actionType = { type:'ADD', payload: INote} | { type:'REMOVE', id: number} | {type:'LSNOTES', payload: INote[]};

    const reducer = (state: INote[], action: actionType ) =>{
        switch(action.type){
            case 'ADD':
                    return [
                        ...state ,
                        {...action.payload}
                    ];
            case 'REMOVE':
                return state;
            case 'LSNOTES':
                return action.payload;
        }
    }
    const [notes, dispatch] = useReducer(reducer, [])

    const handleOnSave = () =>{
        if(titleRef.current && noteRef.current){
            const newNote: INote = {
                title: titleRef.current.value,
                note: noteRef.current.value,
                date: date,
                bgColor: color,
                id: notes.length
            }
            dispatch({type:'ADD', payload:newNote})
            setNoteToLocalS([...notes, newNote])
            titleRef.current.value = '';
            noteRef.current.value = '';
            setOpen(false);
        }
    }
    // set note to local storage
    const setNoteToLocalS =(note: INote[])=>{
        localStorage.setItem('notes',JSON.stringify(note))
    }
    // get notes from local storage
    const getNotesFromLocalS = () =>{
        const notesJson = localStorage.getItem('notes')
        if(notesJson){
            const notesArray = JSON.parse(notesJson)
            dispatch({type:'LSNOTES', payload: notesArray})
        }
    }
    useEffect( ()=>{
        getNotesFromLocalS()
    },[])
    
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    
    return (
        <div>
            <Box sx={{ display:'flex', justifyContent:'center', mt:3}}><Button variant="contained" onClick={ handleClickOpen }>Take a note</Button></Box>
            <Dialog open={open} onClose={handleClose} >
                <div style={{backgroundColor:color}}>
                    <DialogTitle>Your Note </DialogTitle>
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
                        <Button variant="contained"color="error" onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleOnSave} variant="contained" color="success">Save</Button>
                    </DialogActions>
                    </DialogContent>
                    
                </div>
                
            </Dialog>
            <Container sx={{mt:2}}>
                <Grid container spacing={2}>
                    {
                        notes.reverse().map( note =><Note key={note.id} data={note} />)
                    }
                </Grid>
            </Container>
        </div>
    );
};

export default TakeNote;