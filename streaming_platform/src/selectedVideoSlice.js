// slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const selectedVideo = createAsyncThunk(
  'video/fetchVideo',
  async (id, privacy) => {
    try {
      console.log(id);
      console.log(privacy);
      const token = localStorage.getItem('token');
      const tokenString = 'Token ' + token;
      const response = await axios.get(`http://127.0.0.1:8000/videos/${id}/?privacy=${privacy}`, {
        headers: {
          Authorization: tokenString,
        },
      })
      console.log(response.data);
      return response.data;

    } catch (error) {
      throw Error('Error fetching video');
    }
  }
);

const selectedVideoSlice = createSlice({
  name: 'selectedVideo',
  initialState: {
    data: [],
    loading: false,
    error: null,
    views: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(selectedVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectedVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(selectedVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});

export default selectedVideoSlice.reducer;
