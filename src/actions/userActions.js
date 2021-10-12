import axios from "axios";

const createUser = (userData) => async (dispatch) => {
  const { data } = await axios.post("/api/auth/createuser", { ...userData });
  const token = data.authToken;
  localStorage.setItem("token", JSON.stringify(token));
  const { data: user } = await axios.get("/api/auth/getuser", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  dispatch({ type: "USER_LOGIN", payload: { user, token } });
};

const loginUser = (email, password) => async (dispatch) => {
  const { data } = await axios.post("/api/auth/login", { email, password });
  const token = data.authToken;
  localStorage.setItem("token", JSON.stringify(token));
  const { data: user } = await axios.get("/api/auth/getuser", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  dispatch({ type: "USER_LOGIN", payload: { user, token } });
};

const getUser = (token) => async (dispatch) => {
  const { data: user } = await axios.get("/api/auth/getuser", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  dispatch({ type: "USER_LOGIN", payload: { user, token } });
};

const getUserDetails = (user) => async (dispatch) => {
  const { data } = await axios.get(`/api/auth/getuserdetails/${user}`);
  // dispatch({ type: "USER_DETAILS_REQUEST" });
  dispatch({ type: "USER_GET_INFO", payload: data });
  // dispatch({ type: "USER_DETAILS_SUCCESS" });
};

const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "USER_LOGOUT" });
};

const getAllUsers = () => async (dispatch) => {
  const { data } = await axios.get("/api/auth/getallusers");
  dispatch({ type: "USER_LIST_SUCCESS", payload: data });
};

const followUser = (type, token, targetId) => async (dispatch) => {
  await axios.put(
    `/api/auth/${type}/${targetId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const { data: user } = await axios.get("/api/auth/getuser", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  dispatch({ type: "USER_LOGIN", payload: { user, token } });
};

const changeDp = (dpimage, token) => async (dispatch) => {
  await axios.put(
    "/api/auth/adddisplaypicture",
    { displayPicture: dpimage },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const { data: user } = await axios.get("/api/auth/getuser", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  dispatch({ type: "USER_LOGIN", payload: { user, token } });
};
export {
  createUser,
  loginUser,
  getUser,
  logoutUser,
  getAllUsers,
  getUserDetails,
  followUser,
  changeDp,
  // unfollowUser,
};
