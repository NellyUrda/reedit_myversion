import React ,{ useEffect }from 'react';
import styles from './App.module.css'
import Header from './features/Header';
import AllTopics from './features/AllTopics';
import Posts from './features/Posts';

function App() {
  return (
   <div className={styles.div}>
    <Header/>
    <div className={styles.topics_postsContainer}> 
      <AllTopics/>
      <Posts/>
    </div>
   </div>

  );
}

export default App;
