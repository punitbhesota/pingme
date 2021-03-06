import axios from "axios";

// const addPost = (postData, token) => async (dispatch) => {
//   const { data } = await axios.post(
//     "/api/post/addpost",
//     { ...postData, postDetails: postData },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   dispatch({ type: "USER_LOGIN", payload: data });
// };

const fetchallposts = () => async (dispatch) => {
  const { data } = await axios.get("/api/post/fetchallposts");
  dispatch({ type: "POSTS_LIST_SUCCESS", payload: data });
};

const fetchfeedposts = (token) => async (dispatch) => {
  const { data } = await axios.get("./api/post/fetchfeedposts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  dispatch({ type: "POSTS_LIST_SUCCESS", payload: data, token });
};

const fetchmyposts = (id) => async (dispatch) => {
  const { data } = await axios.get(`/api/post/fetchmyposts/${id}`);
  dispatch({ type: "MY_POSTS_LIST_SUCCESS", payload: data });
};

export {
  // addPost,
  fetchallposts,
  fetchfeedposts,
  fetchmyposts,
};
