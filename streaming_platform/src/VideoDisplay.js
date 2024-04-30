import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import VisibilityIcon from '@mui/icons-material/Visibility';

const VideoDisplay = () => {
  const [videoData, setVideoData] = useState([]);
  const [privacy, setPrivacy] = useState("public");
  const navigate = useNavigate();
  console.log(privacy)

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const token = localStorage.getItem('token');
        const tokenString = 'Token ' + token;
        const response = await axios.get(`http://127.0.0.1:8000/videos/?privacy=${privacy}`, {
          headers: {
            Authorization: tokenString,
          },
        });
        setVideoData(response.data);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };
    fetchVideoData();
  }, [privacy]);

  return (
    <>
          <Header/>

    <div className='display-container'>
      {/* <h2>Video Display</h2> */}
      <div className="video-category" >
        <button className={ privacy==='private'?'active':null} onClick={() => setPrivacy('private')}>Private Video</button>
        <button className={ privacy==='public'?'active':null} onClick={() => setPrivacy('public')}>Public Video</button>
      </div>
      <Grid container spacing={2}>
        {videoData.map(item => (
          <Grid item md={3} sm={6} xs={12} key={item.id} className='feed-grid'>
            <Card   className='feed-card'
              variant="outlined"
              sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              onClick={() => navigate(`/videos/${item.id}/?privacy=${privacy}`, { state: { videosData: videoData } })}
            >
              <CardMedia
                component="img"
                image={item.thumbnail}
                alt="Video Thumbnail"
                height="200"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h1">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.description}
                </Typography>
                <span className='view-count'>
                  <VisibilityIcon />
                <span>{item.views_count}</span>
                </span>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
    </>

  );
};

export default VideoDisplay;
