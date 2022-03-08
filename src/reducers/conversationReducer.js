const initialChats = {
  chats: [],
  loading: false,
  // isAuth: false
};

const conversationReducer = (state = initialChats, action) => {
  switch (action.type) {
    case "CHATS_LIST_SUCCESS":
      return { ...state, chats: action.payload.data };

    case "CHATS_LIST_CLEANUP":
      return initialChats;
    default:
      return state;
  }
};

export { conversationReducer };
