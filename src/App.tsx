import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box } from '@mui/material';
import TakeNote from './components/TakeNote/TakeNote';

function App() {

  return (
    <div>
      {/* <Box sx={{ typography: 'h3', textAlign: 'center' }}>MY-NOTES !</Box>
      <hr /> */}
      <TakeNote/>
    </div>
  );
}

export default App;
