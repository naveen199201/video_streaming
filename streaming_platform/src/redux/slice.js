// slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async (query) => {
    try {
      const token = localStorage.getItem('token');
      const tokenString = 'Token ' + token;
      let response;
      if (query !=null) {
        response = await axios.get(`http://127.0.0.1:8000/videos/?q=${query}`, {
          headers: {
            Authorization: tokenString,
          },
        });
      } else {
        response = await axios.get(`http://127.0.0.1:8000/videos/`, {
          headers: {
            Authorization: tokenString,
          },
        });
      }

      return response.data;

    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }
);

const videosSlice = createSlice({
  name: 'videos',
  initialState: {
    videos: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default videosSlice.reducer;
