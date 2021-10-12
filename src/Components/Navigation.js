import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../actions/userActions";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";

import "./Navigation.css";
function Navigation() {
  const NavStyle = {
    textDecoration: "None",
  };
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    dispatch(logoutUser());
  };
  return (
    <div className="Navigation">
      <Link to="/" style={NavStyle}>
        <div className="logo">
          <div>pingme.</div>
        </div>
      </Link>
      <div className="buttonss">
        <AccountCircleSharpIcon className="account-icon" fontSize="large" />
        <Link to="/login" style={NavStyle}>
          <button className="logOut" onClick={submitHandler}>
            LOG
            <br /> OUT.
          </button>
        </Link>
        {/* <Link to="/signup" style={NavStyle}>
          <div className="signUp">sign up.</div>
        </Link> */}
      </div>
    </div>
  );
}

export default Navigation;
