import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom'
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import './VideoSearch.css';
import VisibilityIcon from '@mui/icons-material/Visibility';


const Feed = () => {
  const navigate = useNavigate();
  const [privacy, setPrivacy] = useState('public');
  const videos =useSelector((state)=> state.videos.videos);

  return (
    <div>
     
      <Grid container className='feed-container'>
        {videos.map(item => (
          <Grid md={3} sm={6} xs={12} padding={1} className='feed-grid'>
            <Card key={item.id} variant="outlined" className='feed-card' onClick={()=> navigate(`/videos/${item.id}/?privacy=${privacy}`, { state: { videosData: videos } })}>
              <CardMedia
                image={item.thumbnail}
                className='feed-card-media'
              />
              <CardContent>
                <Typography variant="h5" component="h2" >
                  {item.title}
                </Typography>
                <Typography color="textSecondary">
                  {item.description}
                </Typography>
                {/* <Grid container>
                  <Grid > */}
                  <span className='view-count'>
                  <VisibilityIcon />
                <span>{item.views_count}</span>
                </span>
                  {/* </Grid>
                </Grid> */}
               </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
    </div>
  );
};

export default Feed;
