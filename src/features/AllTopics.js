import React, { useEffect } from 'react';
import styles from './AllTopics.module.css'
import { useSelector, useDispatch } from "react-redux";
import { selectFilteredAllTopics } from "./allTopicsSlice";
import { setSelectedTopic } from "./postsSlice";
import { fetchPostsbyTopic } from "./postsSlice";
import { fetchTopics } from "./allTopicsSlice";

// component that renders topics fetched from www.reedit.com
function AllTopics (){
  const dispatch = useDispatch();
  const allTopics = useSelector(selectFilteredAllTopics);

  useEffect(()=> {
    dispatch(fetchTopics());
  },[dispatch])


    return(
     <div className={styles.topicsContainer}>
        <h2>Topics</h2>
        <ul>
            {allTopics.map((topic)=>(
                 <li key={topic.id}>
                    <button type="button" onClick={()=>dispatch(setSelectedTopic(topic.url))} >
                        {topic.display_name}
                    </button>
                </li>
            ))}
        </ul>
     </div>

    );
}

export default AllTopics;

