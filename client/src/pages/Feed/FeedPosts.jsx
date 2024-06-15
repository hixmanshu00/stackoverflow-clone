import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useSelector } from "react-redux";
import { LoaderIcon } from "react-hot-toast";
import './Post.css'
const FeedPosts =  () => {

  const post =  useSelector(state => state.postReducer)
  const posts = post.data
  let newPosts = []
  if(posts){
    newPosts = posts.slice().reverse()
  }
  if(posts)

  return (
    <div className="inner-container">
      {newPosts.map((post) => (
        <div>
          <Post post={post}/>
        </div>
      ))}
    </div>   
  ) 
  else
  return(
    <LoaderIcon style={{width:'20px', height:'20px', marginTop:'100px'}} />
    )
};

export default FeedPosts;
