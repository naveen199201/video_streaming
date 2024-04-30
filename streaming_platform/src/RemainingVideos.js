import { Box, Grid } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import VisibilityIcon from '@mui/icons-material/Visibility';

const RemainingVideos = (props) => {
    const videos = props.videos;
    const id = props.id
    const navigate = useNavigate();
    const remainingVideos = videos.filter(video => video.id !== id);
    return (
        <Box >
            <Grid sx={12} container>
                {remainingVideos.map((video) => (
                    <Grid item xs={12}>
                        <Card key={video.id} className='remaining-videos-card' onClick={() => navigate(`/videos/${video.id}/`, { state: { videosData: videos } })}>
                            <Grid container xs={12}>
                                <Grid sm={12} xs={8}>
                                    <CardMedia
                                        sx={{ height: 200, objectFit: 'cover' }}
                                        image={video.thumbnail}
                                        title="green iguana"
                                    />
                                </Grid>
                                <Grid sm={12} xs={4}>
                                    <CardContent>
                                        <Typography variant="h5" component="h2" >
                                            {video.title}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            {video.description}
                                        </Typography>
                                        <span className='view-count'>
                                        <VisibilityIcon/>

                                        <span>{video.views_count}</span>
                                        </span>
                                    </CardContent>

                                </Grid>
                            </Grid>
                        </Card>


                    </Grid>
                ))}

            </Grid>
        </Box>
    );
}

export default RemainingVideos;
