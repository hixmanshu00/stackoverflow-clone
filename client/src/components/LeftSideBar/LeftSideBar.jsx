import React from "react";
import "./LeftSideBar.css";
import { NavLink } from "react-router-dom";
import Globe from "../../assets/earth.png";
const LeftSideBar = ({ slideIn, handleSlideIn }) => {
  const slideInStyle = {
    transform: "translateX(0%)",
  };

  const slideOutStyle = {
    transform: "translateX(-100%)",
  };
  return (
    <div
      className="left-sidebar"
      style={slideIn ? slideInStyle : slideOutStyle}
    >
      <nav className="side-bar">
        {/* <button onClick={() => handleSlideIn()} className="nav-btn"> */}
          <NavLink to="/" className="side-nav-links" activeClassName="active" onClick={() => handleSlideIn()}>
            <p>Home</p>
          </NavLink>
        {/* </button> */}
        {/* <button onClick={() => handleSlideIn()} className="nav-btn"> */}
          <NavLink
            to="/feed"
            className="side-nav-links"
            activeClassName="active"
            onClick={() => handleSlideIn()}
          >
            <p>Feed</p>
          </NavLink>
        {/* </button> */}

        <div className="side-nav-div">
          <div>
            <p>PUBLIC</p>
          </div>
          {/* <button onClick={() => handleSlideIn()} className="nav-btn"> */}
            <NavLink
              to="/Questions"
              className="side-nav-links"
              activeClassName="active"
              style={{ paddingLeft: "8px" }}
              onClick={() => handleSlideIn()}
            >
              <img src={Globe} width={14} alt="Globe" id="globe" />
              <p style={{ paddingLeft: "18px" }}> Questions</p>
            </NavLink>
          {/* </button> */}

          {/* <button onClick={() => handleSlideIn()} className="nav-btn"> */}
            <NavLink
              to="/Tags"
              className="side-nav-links"
              activeClassName="active"
              style={{ paddingLeft: "40px" }}
              onClick={() => handleSlideIn()}
            >
              <p>Tags</p>
            </NavLink>
          {/* </button> */}

          {/* <button onClick={() => handleSlideIn()} className="nav-btn"> */}
            <NavLink
              to="/Users"
              className="side-nav-links"
              activeClassName="active"
              style={{ paddingLeft: "40px" }}
              onClick={() => handleSlideIn()}
            >
              <p>Users</p>
            </NavLink>
          {/* </button> */}
        </div>
      </nav>
    </div>
  );
};

export default LeftSideBar;
