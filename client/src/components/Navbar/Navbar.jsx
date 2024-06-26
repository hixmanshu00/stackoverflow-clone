import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import search from "../../assets/search.svg";
import Avatar from "../Avatars/Avatar";
import "./Navbar.css";
import decode from "jwt-decode";
import setCurrentUser from "../../actions/currentUser";
import Logout from "../Oauth/logout";
import { toast } from "react-hot-toast";
import bars from "../../assets/bars.svg";

const Navbar = ({handleSlideIn}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var User = useSelector((state) => state.currentUserReducer);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth");
    dispatch(setCurrentUser(null));
    toast.success('Logged out !!')
  };
  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [dispatch]);

  return (
    <nav className="main-nav">
      <div className="navbar">
        <button className="slide-in-icon" onClick={() => handleSlideIn()}>
          <img src={bars} alt="bars" width="15" />
        </button>
        <div className="navbar-1">
          <Link to="/" className="nav-item nav-logo">
            <img
              src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.svg"
              alt=""
              width={170}
            />
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            About
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            Products
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">
            For Teams
          </Link>
          <form>
            <input type="text" placeholder="Search..." />
            <img src={search} alt="search" width="18" className="search-icon" />
          </form>
        </div>
        <div className="navbar-2">
          {User === null ? (
            <Link to="/Auth" className="nav-item nav-links">
              Log in
            </Link>
          ) : (
            <>
              <Avatar
                backgroundColor="#009dff"
                px="10px"
                py="7px"
                borderRadius="50%"
                color="white"
              >
                <Link
                  to={`/Users/${User?.result?._id}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {User.result.name.charAt(0).toUpperCase()}
                </Link>
              </Avatar>
              <button className="nav-item nav-links" style={{padding:'6px 3px',cursor:'pointer'}} >
                <Logout handleLogout={handleLogout} />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
