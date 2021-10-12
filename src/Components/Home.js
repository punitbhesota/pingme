import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostScreen from "./PostScreen";
import "./Home.css";
// import ProfileScreen from "./ProfileScreen";
import ImageIcon from "@mui/icons-material/Image";
import AvailableUsers from "./AvailableUsers";
import { fetchfeedposts, addPost } from "../actions/postActions";

function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postList);
  const { token } = useSelector((state) => state.userInfo);

  const [postDetails, setpostDetails] = useState({
    caption: "",
    photo: "",
  });
  const [fileName, setfileName] = useState("");

  const inputFile = useRef(null);
  const onButtonClick = () => {
    inputFile.current.click();
  };

  useEffect(() => {
    dispatch(fetchfeedposts(token));
    return () => {
      dispatch({ type: "POSTS_LIST_CLEANUP" });
    };
  }, [dispatch, token]);

  const onChange = (e) => {
    setpostDetails({ ...postDetails, [e.target.name]: e.target.value });
  };
  return (
    <div className="Home">
      <div className="feed">
        <form
          className="add-post"
          // onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <input
            className="caption-input"
            type="text"
            name="caption"
            id="caption"
            placeholder="Enter caption for post.."
            value={postDetails.caption}
            onChange={onChange}
          />
          <input
            className="photo-input"
            type="file"
            name="photo"
            id="photo"
            placeholder="Photo"
            accept="image/*"
            ref={inputFile}
            style={{ display: "none" }}
            value={postDetails.photo}
            onChange={onChange}
            // onChange={onChangeFile}
          />

          <button onClick={onButtonClick} className="add-photo-button">
            <ImageIcon className="add-photo-button" fontSize="large" />
          </button>

          <button className="add-post-button" type="submit">
            ADD POST
          </button>
        </form>
        {posts.map((post) => (
          <divl>
            <PostScreen
              // dp_image={`/public/uploads/dps/${post.user.displayPicture}`}

              dp_image={post.user.displayPicture}
              username={post.user.username}
              photo={post.photo}
              caption={post.caption}
            />
          </divl>
        ))}
      </div>
      <div className="users">
        <div className="heading-avail-users">Available Users</div>
        <AvailableUsers />
      </div>
    </div>
  );
}

export default Home;
