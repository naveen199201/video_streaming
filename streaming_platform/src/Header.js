import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './VideoSearch.css';
import { Hidden } from '@mui/material';
import { useDispatch} from 'react-redux';
import { fetchVideos } from './redux/slice';
import BasicMenu from './Profile';
import VideoUpload from './VideoUpload';
import SearchBar from './SearchBar';
import SearchIcon from '@mui/icons-material/Search';
const Header = () => {
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  return (
    <Box className="header-container">
      <Grid container spacing={2} className='header-grid'>
        <Grid container xs={12} className='header'>
          <Grid item sm={4} xs={4}><h1 className="header-title">Streaming Platform</h1></Grid>
          <Grid item sm={4} xs={0}></Grid>
          
            <Grid item sm={3} xs={6} >
              <SearchBar />
            </Grid>
          
          <Grid item sm={0.5} xs={1} className='uploader'>
            <VideoUpload /> 
          </Grid>
          <Grid item sm={0.5} xs={1} className="profile">
            <BasicMenu /> 
          </Grid>
        </Grid>
      </Grid>
      
    </Box>
  );
};

export default Header;
