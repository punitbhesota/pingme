import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../actions/userActions";
import { useParams } from "react-router-dom";
// import PostScreen from "./PostScreen";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import "./ProfileScreen.css";
import GridViewPostScreen from "./GridViewPostScreen";
import FormData from "form-data";

function MyProfileScreen() {
  const { user } = useSelector((state) => state.userDetailInfo);
  const { user: currUser, token } = useSelector((state) => state.userInfo);
  const { username } = useParams();
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("");

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };
  const changeOnClick = (e) => {
    e.preventDefualt();

    const formData = new FormData();

    formData.append("displayPicture", fileName);

    axios.put(
      "/api/auth/adddisplaypicture",
      { formData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  useEffect(() => {
    dispatch(getUserDetails(currUser.username));
  }, [dispatch, currUser.username]);

  const Stalkersfollowing = currUser.following;
  const Stalkersfollowers = currUser.followers;
  const PostCount = currUser.posts;

  return (
    <div className="outer-ProfileScreen">
      {user ? (
        <div className="ProfileScreen">
          <div className="Upper-Profile">
            <Avatar
              className="DpArea"
              style={{ height: "170px", width: "170px" }}
              src={user.displayPicture}
              alt="dp"
            />
            <form
              className="changingdp"
              onSubmit={changeOnClick}
              encType="multipart/form-data"
            >
              <input
                type="file"
                // type="text"
                filename="displayPicture"
                className="form-control-file"
                onChange={onChangeFile}
              ></input>
              <button type="submit">change DP</button>
            </form>

            <div className="nameBioFollowers">
              <div className="nameAndusername">
                <div className="profilename">{user.name}</div>
                <div className="profileusername">{user.username}</div>
              </div>

              <div className="followerAndfollowing">
                {PostCount ? (
                  <div className="profilePosts">
                    <div className="F-heading">Posts</div>
                    <div className="F-count">{PostCount.length}</div>
                  </div>
                ) : (
                  <div>Loading</div>
                )}
                {Stalkersfollowers ? (
                  <div className="profilefollowers">
                    <div className="F-heading">Followers</div>
                    {/* {Stalkersfollowers.map((follow) => (
                      <div className="followingList">{follow}</div>
                    ))} */}
                    <div className="F-count"> {Stalkersfollowers.length}</div>
                  </div>
                ) : (
                  <div>Loading</div>
                )}
                {Stalkersfollowing ? (
                  <div className="profilefollowing">
                    <div className="F-heading">Following</div>

                    {/* {Stalkersfollowing.map((follow) => (
                      <div className="followingList">{follow}</div>
                    ))} */}
                    <div className="F-count"> {Stalkersfollowing.length}</div>
                  </div>
                ) : (
                  <div>Loading</div>
                )}
              </div>
            </div>
          </div>
          <div className="Profile-Bio">Name is nibba , Ayush nibba</div>

          <div className="allFeedGrid">
            {user.posts ? (
              user.posts.map((post) => (
                <GridViewPostScreen photo={post.photo} />
              ))
            ) : (
              <div> no posts </div>
            )}
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default MyProfileScreen;
