import React from "react";
import styles from './Header.module.css'
// in terminal:  npm install react-icons to use React icons
// from the page, copy the icon and use it like a react component
import { BsReddit } from 'react-icons/bs';
import { useDispatch } from "react-redux";
import { setSearchTerm } from "./postsSlice";

// react component that renders the header of the application
function Header() {
  const dispatch = useDispatch();

  function handleChangeInput(e){
    e.preventDefault();
    // dispatch the action setSearchTerm from postsSlice to change the state of searchTerm
    dispatch(setSearchTerm(e.target.value)); 
  }
    return (
        <div className={styles.header}>  
          <div className={styles.logoDiv} >
            <BsReddit  size={28} className={styles.redditIcon}/>
            <p className={styles.logoName}><span className={styles.span}>Reddit</span>myVersion</p>
          </div>
          <form className={styles.searchForm}>
            <input 
            type="text"
            placeholder="Search"
            id="search"
            onChange={handleChangeInput}
            />
          </form>
        </div>
    );
}

export default Header;