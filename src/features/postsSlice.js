import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

// async thunk func that requests posts by topic from www.reedit.com and returns a 
// Js promise, the posts by topic
export const fetchPostsbyTopic = createAsyncThunk(
  'posts/getPostsbyTopic',
  async(topic) =>{
    const baseUrl = 'https://www.reddit.com';

    try{
      // topic represents the url, ex home: /r/Home/
      const response = await fetch(`${baseUrl}${topic}.json`);
      if(response.ok){
        const jsonResponse = await response.json();

        let posts = [];
        posts = jsonResponse.data.children.map((post)=> post.data);
        console.log("posts:");
        console.log(posts);
        return posts;
      }
    }catch (error){
      console.log(error);
    }
  }
)

// the slice for the posts state
export const postsSlice = createSlice({
  name: 'posts',
  initialState:{
    posts: [],
    isLoading: false,
    hasError: false,
    selectedTopic: '/r/Home/',
    searchTerm: ''
  },
  reducers: {
    setSelectedTopic: (state, action) =>{
      state.selectedTopic = action.payload;
    },
    setSearchTerm:(state, action) =>{
    state.searchTerm = action.payload;
    }
  },
  extraReducers:{
    [fetchPostsbyTopic.pending]:(state, action)=>{
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchPostsbyTopic.fulfilled]:(state, action)=>{
      state.posts = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchPostsbyTopic.rejected]:(state, action)=>{
      state.isLoading = false;
      state.hasError = true;
    }
  }

})


// .selectedTopic state selector
export const selectSelectedTopic =(state)=>state.posts.selectedTopic;
export const selectFilteredSelectedTopic= (state) =>{
  const selectedTopic = selectSelectedTopic(state);
  return selectedTopic; 
}
// .hasError state selector
export const selectHasError =(state)=>state.posts.hasError;
export const selectFilteredHasError =(state)=>{
  const hasError = selectHasError(state);
  return hasError;
}

// .searchTerm state selector
export const selectSearchTerm = (state) => state.posts.searchTerm;
export const selectFilteredSearchTerm= (state) =>{
  const searchTerm = selectSearchTerm(state);
  return searchTerm;
}

// .posts state selector
export const selectPosts = (state)=>state.posts.posts;

export const selectFilteredPosts = createSelector(
  [selectPosts, selectSearchTerm],
  (posts, searchTerm) => {
    if (searchTerm !== '') {
      return posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return posts;
  }
);


// export actions an reducer
export const {setSelectedTopic, setSearchTerm} = postsSlice.actions;
export default postsSlice.reducer;
