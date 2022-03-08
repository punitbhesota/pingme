import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
// import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import {
  // followUser,
  getAllUsers,
  logoutUser,
} from "../../actions/userActions";

import "./InnerNavMobile.css";
import Avatar from "@mui/material/Avatar";

function InnerNavMobile() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const Changehandler = (e) => {
    setSearch(e.target.value);
  };

  const NavStyle = {
    textDecoration: "None",
  };
  const openSearchDialog = () => {
    const openSearchforBox = () => {
      if (
        document.querySelector(".search-for-users").style.display === "flex"
      ) {
        return (document.querySelector(".search-for-users").style.display =
          "none");
      } else {
        return (document.querySelector(".search-for-users").style.display =
          "flex");
      }
    };
    const openSearchforinput = () => {
      if (
        document.querySelector(".search-for-users-input").style.width ===
        "200px"
      ) {
        return (document.querySelector(".search-for-users-input").style.width =
          "0px");
      } else {
        return (document.querySelector(".search-for-users-input").style.width =
          "200px");
      }
    };
    openSearchforBox();
    openSearchforinput();
  };
  const {
    user: currUser,
    // ,token
  } = useSelector((state) => state.userInfo);

  const { users } = useSelector((state) => state.userList);
  useEffect(() => {
    dispatch(getAllUsers());
    return () => {
      dispatch({ type: "USER_LIST_CLEANUP" });
    };
  }, [dispatch]);

  const submitHandler = async (e) => {
    dispatch(logoutUser());
  };

  const FilteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="InnerNavMobile">
      {users && currUser ? (
        <div className="innerNavMobile-inner">
          <Link to="/home" style={NavStyle}>
            <img
              src="./home-mobile-icon.png"
              alt=""
              className="home-icon-mobile"
            />
          </Link>
          <Link to="/availableusersmobile" style={NavStyle}>
            {/* <div className="nav-search-div-mobile"> */}
            <SearchIcon className="nav-search-mobile" />
            {/* </div> */}
          </Link>

          <Link to="/chatnow" style={NavStyle}>
            <AddCircleRoundedIcon
              className="addpost-icon-mobile"
              fontSize="large"
            />
          </Link>

          <Link to="/chatnow" style={NavStyle}>
            <ForumRoundedIcon className="chatpage-icon-mobile" />
          </Link>

          <Link to="/login" style={NavStyle}>
            <button className="logOut-mobile" onClick={submitHandler}>
              <ExitToAppRoundedIcon />
            </button>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default InnerNavMobile;
