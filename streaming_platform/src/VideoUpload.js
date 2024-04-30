import React, { useState } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import './VideoSearch.css';

const VideoUpload = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [privacy, setPrivacy] = useState('public');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const uploaderId = '1';

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleThumbnailChange = (event) => {
    setThumbnail(event.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('file', file);
      formData.append('thumbnail', thumbnail);
      formData.append('privacy', privacy);
      formData.append('uploader', uploaderId);

      // Get user's authentication token from localStorage
      const token = localStorage.getItem('token');

      // Make a POST request to upload the video with the user's token
      const response = await axios.post('http://127.0.0.1:8000/videos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}`
        },
      });

      // Handle success
      console.log('Video uploaded:', response.data);
      alert('video uploaded successfully')
      setSuccess(true);
    } catch (error) {
      // Handle error
      console.error('Error uploading video:', error);
      setError('Error uploading video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='button'  >
      <Button className='button' onClick={handleOpen}><FileUploadOutlinedIcon /></Button>
      <Dialog open={open} onClose={handleClose }>
        <DialogTitle>Upload Video</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {/* <Grid item xs={12}> */}
            {/* <Grid container spacing={2}> */}
            <Grid item xs={4}>
              <label>Title:</label>
              </Grid>
              <Grid item xs={8}>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </Grid>
              
            <Grid item xs={4}>
              <label>Description:</label>
              </Grid>
              <Grid item xs={6}>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </Grid>
            <Grid item xs={4}>
              <label>Thumbnail:</label>
              </Grid>
              <Grid item xs={8}>
              <input type="file" onChange={handleThumbnailChange} />
            </Grid>
            <Grid item xs={4}>
              <label>Video File:</label>
              </Grid>
              <Grid item xs={8}>
              <input type="file" onChange={handleFileChange} />
            </Grid>
            <Grid item xs={4}>
              <label>Privacy:</label>
              </Grid>
              <Grid item xs={8}>
              <select value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary" disabled={!title || !description || !file || loading}>
            {loading ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
    </div>
  );
};

export default VideoUpload;
