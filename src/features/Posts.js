import React, { useEffect } from "react";
import styles from './Posts.module.css'
import { useSelector, useDispatch } from "react-redux";
import { 
     selectFilteredSelectedTopic,
     fetchPostsbyTopic,
     selectFilteredPosts,
     selectFilteredHasError,
     selectFilteredSearchTerm
    } from "./postsSlice";

// react component that renders the posts by the topic selected
function Posts (){
    const dispatch = useDispatch();
    const hasError = useSelector(selectFilteredHasError);
    const topic= useSelector(selectFilteredSelectedTopic);
    let posts = useSelector(selectFilteredPosts);
    const searchTerm = useSelector(selectFilteredSearchTerm);

    useEffect(()=>{
      dispatch(fetchPostsbyTopic(topic));   
    },[topic]);
    
    
    if(hasError){
        return(
            <div>
                <h2>Failed to load posts</h2>
            </div>
        )
    }
    
    // render a message if no match search results
    if (posts.length === 0){
        return(
            <p>No results founded.</p>
        )
    }
    return(
       
        <div >
            {posts.map((post)=>(
            <div key ={post.id} className={styles.postContainer}>
                <h2>{post.subreddit}</h2>
                <p className={styles.author}>r/{post.author}</p>
                <h3>{post.title}</h3>
                <img src={post.url}/>
            </div>
           ))}  
        </div>
   
   
       );
   
}

export default Posts;
