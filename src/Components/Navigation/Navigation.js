import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  // followUser,
  getAllUsers,
  logoutUser,
} from "../../actions/userActions";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";

import "./Navigation.css";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
// import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
// import FollowUnfollow from "../FollowUnfollow/FollowUnfollow";

function Navigation() {
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
  const [search, setSearch] = useState("");
  const { users } = useSelector((state) => state.userList);

  const Changehandler = (e) => {
    setSearch(e.target.value);
  };

  const dispatch = useDispatch();

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

  // const handleFollowUnfollow = (t, tok, target) => {
  //   dispatch(followUser(t, tok, target));
  // };

  return (
    <div className="Navigation">
      <Link to="/" style={NavStyle}>
        <div className="logo">
          <div>pingme.</div>
        </div>
      </Link>
      {users && currUser ? (
        <div className="buttonss">
          <form>
            <input
              className="search-for-users-input"
              onChange={Changehandler}
            />
          </form>
          <div className="search-for-users">
            {FilteredUsers.map((user) => (
              <div className="FullUserListCard-nav">
                <Link
                  onClick={openSearchDialog}
                  className="UserlistCard"
                  to={`/${user.username}`}
                  style={NavStyle}
                >
                  <div>
                    <Avatar
                      className="avatar-userlist"
                      style={{ background: " white " }}
                      src={user.displayPicture}
                      alt={user.username}
                    />
                  </div>
                  <div className="nameUsername">
                    <div className="UserlistCard--username home-username">
                      {user.username}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="nav-search-div">
            <SearchIcon
              onClick={openSearchDialog}
              className="nav-search"
              fontSize="large"
            />
          </div>
          <Link className="chatpage-icon-outer" to="/chatnow" style={NavStyle}>
            <ForumRoundedIcon className="chatpage-icon" />
          </Link>

          <Link to="/login" style={NavStyle}>
            <button className="logOut" onClick={submitHandler}>
              LOG
              <br />
              OUT.
            </button>
          </Link>
          <Link to={`/${currUser.username}`} style={NavStyle}>
            <div className="avatar-nav">
              <Avatar className="avatar-nav" src={currUser.displayPicture} />
            </div>
            <img className="img-nav" alt="" src={currUser.displayPicture} />
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Navigation;
