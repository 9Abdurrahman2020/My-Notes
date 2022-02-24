import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Note = ({data}:{ data: {
    title: string,
    note: string,
    date: string,
    bgColor: string,
    id?: number
}}) => {

    const color = data.bgColor === 'red' ? 'white' : 'black';

    return (
            <Grid item lg={3} md={4} sm={6} xs={12}>
                <Paper elevation={3} style={{backgroundColor:data.bgColor,color:color,padding:'10px'}}> 
                    <Typography>{data.date}</Typography>
                    <Typography variant='h5'>{data.title}</Typography>
                    <b>{data.note}</b>

                </Paper>
            </Grid>
    );
};

export default Note;