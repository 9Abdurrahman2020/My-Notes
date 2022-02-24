import { Button, Paper, Typography } from '@mui/material';
import React from 'react';

const Note = ({data, onClick}:{ data: {
    title: string,
    note: string,
    date: string,
    bgColor: string,
    id: number
}, onClick:any }) => {

    const color = data.bgColor === 'red' ? 'white' : 'black';

    return (
            <div>
                <Paper elevation={3} style={{backgroundColor:data.bgColor,color:color,padding:'15px'}}> 
                    <Typography>{data.date}</Typography>
                    <Typography sx={{mb:1}} variant='h5'>{data.title}</Typography>
                    <b>{data.note}</b>
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <Button>Edit</Button>
                        <Button onClick={ ()=> onClick({type:'REMOVE', id: data.id})}>Delete</Button>
                    </div>
                </Paper>
            </div>
    );
};

export default Note;