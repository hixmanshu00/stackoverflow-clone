import React from "react";
import Avatar from "../../components/Avatars/Avatar";
import { Link, useNavigate } from "react-router-dom";
import "./Post.css";
import moment from "moment";
import Filter from "bad-words";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../actions/post";

const Post = ({ post }) => {
  const User = useSelector((state) => state.currentUserReducer);
  const userId = User?.result?._id;
  // console.log(userId)
  const type = post.contentType?.split("/")[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filter = new Filter();
  const content = post.content;
  let filteredText = "";
  if (content) {
    filteredText = filter.clean(content);
  }

  const mediaPath =
    process.env.REACT_APP_API_URL + "/post/getMedia/" + post.filename;
  const handleDelete = async () => {
    dispatch(deletePost(post._id, navigate));
  };
  return (
    <div className="post-container">
      <div className="user">
        <Avatar
          backgroundColor="#009dff"
          px="10px"
          py="7px"
          borderRadius="50%"
          color="white"
        >
          <Link
            to={`/Users/${post.userId}`}
            style={{ color: "white", textDecoration: "none" }}
          >
            {post.userPosted.charAt(0).toUpperCase()}
          </Link>
        </Avatar>
        <Link
            to={`/Users/${post.userId}`}
            style={{ color: "Black", textDecoration: "none", marginTop:'5px' }}
          >
        <span style={{ fontWeight: "700" }}>{post.userPosted}</span>
        </Link>
      </div>
      <div className="content">
        <p>{filteredText}</p>

        {type === "image"  ? (
          <img src={mediaPath} alt="post-img" width={600}  style={{margin:'auto'}} />
        ) : <></>}
        {type === 'video' ? (
          <video width="600" height="360" controls autoPlay loop>
            <source src={mediaPath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ): <></>}
        <div className="bottom-container">
          {userId === post.userId ? (
            <button onClick={handleDelete}>Delete</button>
          ) : (
            <></>
          )}
          <p style={{ textAlign: "right", fontSize: "15px", width: "100%" }}>
            posted {moment(post.postedOn).fromNow()}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
