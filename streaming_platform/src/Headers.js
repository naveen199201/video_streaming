import React from 'react'
import VideoSearch from './Search'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const Headers = () => {
    return (
        <Box  >
            <Grid container spacing={2} className='header'>               
                <Grid item xs={12} >
                    <VideoSearch  />
                </Grid>
            </Grid >
        </Box>
    )
}

export default Headers