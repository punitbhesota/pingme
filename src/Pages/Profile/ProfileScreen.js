import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, followUser } from "../../actions/userActions";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import FollowUnfollow from "../../Components/FollowUnfollow/FollowUnfollow";
import axios from "axios";
import "./ProfileScreen.css";
import GridViewPostScreen from "../../Components/PostGrid/GridViewPostScreen";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FormData from "form-data";
import PostScreen from "../../Components/Post/PostScreen";

function ProfileScreen() {
  const { user } = useSelector((state) => state.userDetailInfo);
  const { user: currUser, token } = useSelector((state) => state.userInfo);
  const { username } = useParams();
  const dispatch = useDispatch();
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

  const handleFollowUnfollow = (t, tok, target) => {
    dispatch(followUser(t, tok, target));
  };

  useEffect(() => {
    dispatch(getUserDetails(username));
  }, [dispatch, username]);

  const Stalkersfollowing = user?.following;
  const Stalkersfollowers = user?.followers;
  const PostCount = user?.posts;

  return (
    <div className="outer-ProfileScreen">
      {user && currUser ? (
        <div className="ProfileScreen">
          <div className="Upper-Profile">
            <div className="DpArea-container">
              {" "}
              <Avatar
                className="DpArea"
                style={{ height: "170px", width: "170px" }}
                src={user.displayPicture}
                alt="dp"
              />
            </div>

            {currUser.username === username ? (
              <form
                className="changingdp"
                onSubmit={changeOnClick}
                // accept="image/x-png,image/gif,image/jpeg"

                encType="multipart/form-data"
              >
                <label className="custom-file-upload">
                  <input
                    type="file"
                    style={{ display: "none" }}
                    filename="displayPicture"
                    className="form-control-file"
                    onChange={onChangeFile}
                  ></input>
                  <CameraAltIcon fontSize="large" />
                </label>

                <button type="submit">change DP</button>
              </form>
            ) : (
              <></>
            )}
            <div className="nameBioFollowers">
              <div className="nameAndusername">
                <div className="profilename">{user.name}</div>
                <div className="profileusername">{user.username}</div>
                {currUser.username !== username ? (
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
                ) : (
                  <></>
                )}
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
          <div className="Upper-Profile-Mobile">
            <div className="Dp-FFP-container-Mobile">
              {currUser.username === username ? (
                <form
                  className="changingdp"
                  onSubmit={changeOnClick}
                  // accept="image/x-png,image/gif,image/jpeg"

                  encType="multipart/form-data"
                >
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      style={{ display: "none" }}
                      filename="displayPicture"
                      className="form-control-file"
                      onChange={onChangeFile}
                    ></input>
                    <CameraAltIcon fontSize="large" />
                  </label>

                  <button type="submit">change DP</button>
                </form>
              ) : (
                <></>
              )}
              <Avatar
                className="DpArea-Mobile"
                style={{ height: "100px", width: "100px" }}
                src={user.displayPicture}
                alt="dp"
              />
              <div className="FFP">
                {PostCount ? (
                  <div className="profilePosts">
                    <div className="F-heading-mobile">
                      {PostCount.length} &nbsp;Posts
                    </div>
                    <div className="F-count-mobile"></div>
                  </div>
                ) : (
                  <div>Loading</div>
                )}
                {Stalkersfollowers ? (
                  <div className="profilefollowers">
                    <div className="F-heading-mobile">
                      {" "}
                      {Stalkersfollowers.length} &nbsp;Followers
                    </div>
                    <div className="F-count-mobile"> </div>
                  </div>
                ) : (
                  <div>Loading</div>
                )}
                {Stalkersfollowing ? (
                  <div className="profilefollowing">
                    <div className="F-heading-mobile">
                      {" "}
                      {Stalkersfollowing.length} &nbsp;Following
                    </div>
                    <div className="F-count-mobile"> </div>
                  </div>
                ) : (
                  <div>Loading</div>
                )}
              </div>
            </div>

            <div className="nameBiofollow">
              <div className="nameusername-mobile">
                <div className="profilename-mobile">{user.name}</div>
                <div className="profileusername-mobile">{user.username}</div>
              </div>
              <div className="msg-follow-buttons">
                {currUser.username !== username ? (
                  <div className="followbutton-mobile">
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
                ) : (
                  <></>
                )}
                <div>
                  <button className="messagebutton-mobile">Message</button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="Profile-Bio">this is bio</div> */}

          <div className="allFeed">
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
          </div>

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
