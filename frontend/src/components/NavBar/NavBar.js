import "./NavBar.css";
import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, NavLink } from "react-router-dom";

import { logout } from "../../services/auth";
import { LoggedInContext } from "../../App";

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [cookies, , removeCookie] = useCookies(["user_id", "username"]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    removeCookie("user_id");
    removeCookie("username");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="topnav">
      <NavLink to={"/"} className={"battleships-link"}>
        Battleships
      </NavLink>
      {loggedIn ? (
        <div className="topnav-container">
          <button className="topnav-button" onClick={handleLogout}>
            Logout
          </button>
          <NavLink data-cy="navbar-username" to={"/profile"}>{cookies.username}</NavLink>
        </div>
      ) : (
        <div className="topnav-container">
          <NavLink to={"/signup"}>Sign Up</NavLink>
          <NavLink to={"/login"}>Login</NavLink>
        </div>
      )}
    </div>
  );
};

export default NavBar;
