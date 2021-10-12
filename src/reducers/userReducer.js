const initialState = {
  user: {},
  loading: false,
  token: null,
  // isAuth: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST":
      return { ...state, loading: true };
    case "SUCCESS":
      return { ...state, loading: false };
    case "USER_LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "USER_LOGOUT":
      return { ...state, user: null, token: null };

    default:
      return state;
  }
};
const initialUserDetail = {
  User: {},
  loading: false,
};

const userDetailsReducer = (state = initialUserDetail, action) => {
  switch (action.type) {
    case "USER_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "USER_DETAILS_SUCCESS":
      return { ...state, loading: false };
    case "USER_GET_INFO":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
const initialUsers = {
  users: [],
};
const userListReducer = (state = initialUsers, action) => {
  switch (action.type) {
    case "USER_LIST_SUCCESS":
      return { ...state, users: action.payload };
    case "USER_LIST_CLEANUP":
      return initialUsers;
    default:
      return state;
  }
};
// const initialDP = {
//   dpimage: "",
// };
// const dpChangeReducer = (state = initialDP, action) => {
//   switch (action.type) {
//     case "DP_UPDATED":
//       return { ...state, token: action.payload.token };
//     default:
//       return state;
//   }
// };

// const FollowUnfollowReducer = (state, action) => {
//   switch (action.type) {
//     case "USER_FOLLOW_SUCCESS":
//       return state;

//     default:
//       return state;
//   }
// };
export {
  userReducer,
  userListReducer,
  userDetailsReducer,
  // dpChangeReducer,
  // FollowUnfollowReducer,
};
