import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, followUser, changeDp } from "../actions/userActions";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import FollowUnfollow from "./FollowUnfollow";
import axios from "axios";
import "./ProfileScreen.css";
// import PostScreen from "./PostScreen";
import GridViewPostScreen from "./GridViewPostScreen";
import FormData from "form-data";
// import MyProfileScreen from "./MyProfileScreen";

function ProfileScreen() {
  const { user } = useSelector((state) => state.userDetailInfo);
  const { user: currUser, token } = useSelector((state) => state.userInfo);
  const { username } = useParams();
  const dispatch = useDispatch();
  // const [dpimage, setDpimage] = useState("");
  const [fileName, setFileName] = useState("");

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };
  const changeOnClick = async () => {
    const formData = new FormData();

    formData.append("displayPicture", fileName);
    await axios.put("/api/auth/adddisplaypicture", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  // const { data: me } = axios.get("/api/auth/getuser", {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  // dispatch({ type: "USER_LOGIN", payload: { me, token } });

  const handleFollowUnfollow = (t, tok, target) => {
    dispatch(followUser(t, tok, target));
  };
  // const DPhandler = () => {
  //   dispatch(changeDp(dpimage, token));
  // };
  // const onChange = (e) => {
  //   setDpimage(e.target.value);
  // };
  useEffect(() => {
    dispatch(getUserDetails(username));
  }, [dispatch, username]);

  const Stalkersfollowing = user.following;
  const Stalkersfollowers = user.followers;
  const PostCount = user.posts;

  return (
    <div className="outer-ProfileScreen">
      {user && currUser ? (
        <div className="ProfileScreen">
          <div className="Upper-Profile">
            <Avatar
              className="DpArea"
              style={{ height: "170px", width: "170px" }}
              src={user.displayPicture}
              alt="dp"
            />
            {/* <Avatar
              className="DpArea"
              style={{ height: "170px", width: "170px" }}
              src={`./public/uploads/dps/${user.displayPicture}`}
              alt="dp"
            /> */}
            <form
              className="changingdp"
              onSubmit={changeOnClick}
              // accept="image/x-png,image/gif,image/jpeg"
              // onSubmit={DPhandler}

              encType="multipart/form-data"
            >
              <input
                type="file"
                // type="text"
                filename="displayPicture"
                className="form-control-file"
                // value={dpimage}
                // placeholder="enter dp link"
                onChange={onChangeFile}
                // onChange={onChange}
              ></input>
              <button type="submit">change DP</button>
            </form>

            <div className="nameBioFollowers">
              <div className="nameAndusername">
                <div className="profilename">{user.name}</div>
                <div className="profileusername">{user.username}</div>
                <div className="buttonsprofile">
                  {currUser ? (
                    <FollowUnfollow
                      handleClick={handleFollowUnfollow}
                      followed={currUser.following.includes(user._id)}
                      targetId={user._id}
                      token={token}
                      type={
                        currUser.following.includes(user._id)
                          ? "unfollow"
                          : "follow"
                      }
                    />
                  ) : (
                    <div>follow User </div>
                  )}
                </div>
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
                    <div className="F-count"> {Stalkersfollowers.length}</div>
                  </div>
                ) : (
                  <div>Loading</div>
                )}
                {Stalkersfollowing ? (
                  <div className="profilefollowing">
                    <div className="F-heading">Following</div>
                    <div className="F-count"> {Stalkersfollowing.length}</div>
                  </div>
                ) : (
                  <div>Loading</div>
                )}
              </div>
            </div>
          </div>
          <div className="Profile-Bio">Name is nibba , Ayush nibba</div>

          {/* <div className="allFeed">
          {user.posts ? (
            user.posts.map((post) => (
              <PostScreen
                photo={post.photo}
                caption={post.caption}
                username={user.username}
                dp_image={user.displayPicture}
              />
            ))
          ) : (
            // .reverse()
            <div>no posts</div>
          )}
        </div> */}

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

export default ProfileScreen;
