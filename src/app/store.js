import { configureStore } from '@reduxjs/toolkit';
import allTopicsReducer from '../features/allTopicsSlice';
import postsReducer from '../features/postsSlice';

export const store = configureStore({
  reducer: {
   allTopics: allTopicsReducer,
   posts: postsReducer
  },
});
 