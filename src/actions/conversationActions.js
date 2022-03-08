import axios from "axios";

const getMyChats = (userId, token) => async (dispatch) => {
  const data = await axios.get(`/api/conversation/:${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  dispatch({ type: "CHATS_LIST_SUCCESS", payload: data });
};
export { getMyChats };
