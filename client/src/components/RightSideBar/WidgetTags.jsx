import React from "react";
import "./RightSideBar.css";

const WidgetTags = () => {
  const tags = [
    "c",
    "css",
    "firebase",
    "html",
    "java",
    "javascript",
    "mern",
    "mongodb",
    "mysql",
    "next.js",
    "node.js",
    "php",
    "reactjs",
  ];
  return <div className="widget-tags">
    <h4>Watched tags</h4>
    <div className="widget-tags-div">
        {
            tags.map((tag) => (
                <p key={tag}>{tag}</p>
            ))
        }
    </div>
  </div>;
};

export default WidgetTags;
