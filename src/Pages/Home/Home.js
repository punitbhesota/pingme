import "./Home.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostScreen from "../../Components/Post/PostScreen";
import ImageIcon from "@mui/icons-material/Image";
import AvailableUsers from "../../Components/AvailableUsers/AvailableUsers";
import FormData from "form-data";
import Avatar from "@mui/material/Avatar";

import { fetchfeedposts } from "../../actions/postActions";
import Navigation from "../../Components/Navigation/Navigation";

function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postList);
  const { token } = useSelector((state) => state.userInfo);
  const { user } = useSelector((state) => state.userInfo);
  const [caption, setCaption] = useState("");
  const [fileName, setFileName] = useState("");

  // const [postDetails, setpostDetails] = useState({
  //   caption: "",
  //   photo: "",
  // });
  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  const addPost = async () => {
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("photo", fileName);
    setCaption("");
    await axios.post("/api/post/addpost", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    dispatch(fetchfeedposts(token));
    return () => {
      dispatch({ type: "POSTS_LIST_CLEANUP" });
    };
  }, [dispatch, token]);

  return (
    <div className="Homepage">
      <Navigation />
      <div className="Home">
        <div className="feed">
          {posts.map((post) => (
            <div>
              <PostScreen
                dp_image={post.user.displayPicture}
                username={post.user.username}
                photo={post.photo}
                caption={post.caption}
              />
            </div>
          ))}
        </div>
        <div className="addPostandOnlineusers">
          <form
            className="add-post"
            onSubmit={addPost}
            encType="multipart/form-data"
          >
            <div className="home-profile">
              {" "}
              <div className="home-profile-pic-container">
                {user ? (
                  <Avatar
                    className="home-profile-pic"
                    src={user.displayPicture}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="home-profile-name">
                {user ? <>{user.username}</> : <></>}
              </div>
            </div>
            <input
              type="text"
              name="caption"
              className="caption-input"
              placeholder="Enter caption for post"
              onChange={(e) => setCaption(e.target.value)}
            />

            <label className="custom-file-upload">
              <input
                className="photo-input"
                // id="photo"
                // name="photo"
                // value={postDetails.photo}
                // onChange={onChange}
                type="file"
                // accept="image/*"
                style={{ display: "none" }}
                filename="photo"
                onChange={onChangeFile}
              ></input>
              <ImageIcon className="add-photo-button" fontSize="large" />
            </label>

            <button className="add-post-button" type="submit">
              ADD POST
            </button>
          </form>
          <div className="home-onlineusers"> </div>
        </div>
        <div className="users">
          {/* <div className="heading-avail-users"></div> */}
          <AvailableUsers />
        </div>
      </div>
    </div>
  );
}

export default Home;
