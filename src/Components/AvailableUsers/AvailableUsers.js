import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, followUser } from "../../actions/userActions";
import FollowUnfollow from "../FollowUnfollow/FollowUnfollow.js";
import "./AvailableUsers.css";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

function AvailableUsers() {
  const { users } = useSelector((state) => state.userList);
  const { user, token } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const NavStyle = {
    textDecoration: "None",
    color: "white",
  };

  const handleFollowUnfollow = (t, tok, target) => {
    dispatch(followUser(t, tok, target));
  };

  useEffect(() => {
    dispatch(getAllUsers());
    return () => {
      dispatch({ type: "USER_LIST_CLEANUP" });
    };
  }, [dispatch]);

  return (
    <>
      {user ? (
        <div className="AvailableUsers">
          {users.map((userr) =>
            userr._id !== user._id ? (
              <div className="FullUserListCard" key={userr.username}>
                <Link
                  className="UserlistCard"
                  to={`/${userr.username}`}
                  style={NavStyle}
                >
                  <div>
                    <Avatar
                      className="avatar-userlist"
                      style={{ background: " white " }}
                      src={userr.displayPicture}
                      alt={userr.username}
                    />
                  </div>
                  <div className="nameUsername">
                    <div className="UserlistCard--username">
                      {" "}
                      {userr.username}
                    </div>
                    <div className="UserlistCard--name">{userr.name}</div>
                  </div>
                </Link>
                <FollowUnfollow
                  handleClick={handleFollowUnfollow}
                  followed={user.following.includes(userr._id)}
                  targetId={userr._id}
                  token={token}
                  type={
                    user.following.includes(userr._id) ? "unfollow" : "follow"
                  }
                />
              </div>
            ) : (
              <></>
            )
          )}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}
export default AvailableUsers;
