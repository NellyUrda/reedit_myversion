import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// async thunk func that makes a request to www.reedit.com and returns a Js promise,
// the topics
export const fetchTopics = createAsyncThunk(
    'allTopics/fetchTopics', 
    async () =>{
         const baseUrl = 'https://www.reddit.com';

         try{
           const response = await fetch(`${baseUrl}/subreddits.json`);
           if(response.ok){
               const jsonResponse = await response.json();
               
               let topics = [];
               topics = jsonResponse.data.children.map((subreddit) => subreddit.data);
               return topics;
               
           }
       
         }catch(error){
           console.log(error);
         }
    }
       
)

// the slice for the topics state
export const allTopicsSlice = createSlice({
    name: 'allTopics',
    initialState:{
        topics: [],
        isLoading: false,
        hasError: false
    },
    reducers: {},
    extraReducers: {
        [fetchTopics.pending]:(state, action) =>{
            state.isLoading = true;
            state.hasError = false;
        },
        [fetchTopics.fulfilled]:(state, action)=>{
            state.topics= action.payload;
            state.isLoading= false;
            state.hasError = false;
        },
        [fetchTopics.rejected]:(state, action)=>{
            state.isLoading = false;
            state.hasError = true;
        }

    }

});


// selectors for .topics state
export const selectAllTopics =(state)=>state.allTopics.topics;
export const selectFilteredAllTopics =(state)=>{
    const topics = selectAllTopics(state);
    return topics;
}

export default allTopicsSlice.reducer;