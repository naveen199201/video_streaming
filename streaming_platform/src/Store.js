// store.js
import { configureStore } from '@reduxjs/toolkit';
import videosReducer from './redux/slice';
import  selectedVideoReducer from './selectedVideoSlice';

const store = configureStore({
  reducer: {
    videos: videosReducer,
    selectedVideo:selectedVideoReducer
  }
});

export default store;
