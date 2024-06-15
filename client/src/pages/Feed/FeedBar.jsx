import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./Feed.css";
import FeedPosts from "./FeedPosts";
import { toast } from "react-hot-toast";
import { uploadPost } from "../../actions/post";

const FeedBar = () => {
  const [content, setContent] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const User = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch()
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleFileChange = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("content", content);
    formData.append("userPosted", User?.result?.name);
    formData.append("userId", User?.result?._id);

    dispatch(uploadPost(formData))
    setContent("");
    setUploadedFile(null);
  };
  return (
    <div className="container">
      <textarea
        placeholder="Share your thoughts..."
        value={content}
        onChange={handleContentChange}
      />
      <div className="container-2">
      <label htmlFor="file-upload" className="custom-file-upload">
        <img src="https://cdn-icons-png.flaticon.com/128/2716/2716054.png" alt="upload icon" width={30} /> <span>Media</span>
      </label>
      <input id="file-upload" type="file" onChange={handleFileChange}/>
      <button onClick={handleUpload} className="share">Share</button>
      </div>
      <div className="posts-container">
        <FeedPosts />
      </div>
    </div>
  );
};

export default FeedBar;
