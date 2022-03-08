import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  userReducer,
  userListReducer,
  userDetailsReducer,
} from "./reducers/userReducer";
import { getUser } from "./actions/userActions";
import { postReducer } from "./reducers/postReducer";
import { conversationReducer } from "./reducers/conversationReducer";

const reducers = combineReducers({
  userInfo: userReducer,
  userList: userListReducer,
  userDetailInfo: userDetailsReducer,
  postList: postReducer,
  chatList: conversationReducer,
});

let initialState = {
  userInfo: {
    user: null,
    loading: false,
    token: null,
  },
  userList: {
    users: [],
    loading: false,
  },
  userDetailInfo: {
    user: {},
    loading: false,
  },
  postList: {
    posts: [],
    loading: false,
  },
  chatList: {
    chats: [],
    loading: false,
  },
};

if (localStorage.getItem("token")) {
  initialState = {
    ...initialState,
    userInfo: {
      ...initialState.userInfo,
      token: JSON.parse(localStorage.getItem("token")),
    },
  };
}

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.getItem("token")) {
  store.dispatch(getUser(JSON.parse(localStorage.getItem("token"))));
}

export default store;
