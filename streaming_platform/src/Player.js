import React, { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RemainingVideos from './RemainingVideos';
import SimpleBottomNavigation from './Footer';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Box, Hidden } from '@mui/material';
import Header from './Header';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Player = () => {
  const [playingVideo, setPlayingVideo] = useState(null);
  const { videoId } = useParams();
  const id = Number(videoId);
  console.log(id)
  const location = useLocation();
  console.log(location.state.videosData);
  const videosData = location.state.videosData;
  console.log(videosData);
  const [hasPlayedForTenSeconds, setHasPlayedForTenSeconds] = useState(false);
  const [privacy, setPrivacy] = useState('public');
  const playerRef = useRef(null);

  useEffect(() => {
    const playVideo = videosData.filter(video => video.id === id);
    console.log(playVideo);
    setPlayingVideo(playVideo);

  }, [videoId, id, videosData]);

  console.log(playingVideo);

  useEffect(() => {
    if (hasPlayedForTenSeconds) {
      incrementViewCount();
    }
  }, [hasPlayedForTenSeconds]);

  const handleProgress = (state) => {
    if (state.playedSeconds >= 10 && !hasPlayedForTenSeconds) {
      setHasPlayedForTenSeconds(true);
    }
  };

  const incrementViewCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const tokenString = 'Token ' + token;
      await axios.patch(
        `http://127.0.0.1:8000/videos/${id}/`,
        { views_count: playingVideo[0].views_count + 1 }, // Increment view count
        {
          headers: {
            Authorization: tokenString,
          },
        }
      );
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  };
  if (!playingVideo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <Box className='container'>
        <Grid container xs={12} >
          <Grid sm={9} xs={12} className='player' justifyContent={'center'}  >
            <ReactPlayer
              className='video-player'
              ref={playerRef}
              url={playingVideo[0].file}
              controls
              onProgress={handleProgress}
              width='95%'
              height='70vh'
            // style={}

            />
            <div className='playing-video-title'>
              <span className='playing-video-title'> {playingVideo[0].title}</span>
            </div >
            <span className='view-count'>
              <VisibilityIcon />
              <span>{playingVideo[0].views_count}</span>
            </span>

          </Grid>
          <Grid sm={3} xs={12} >
            <RemainingVideos videos={videosData} id={id} />
          </Grid>

        </Grid>
      </Box>
    </div >
  );
};

export default Player;