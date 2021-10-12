const initialPosts = {
  posts: [],
  loading: false,
  // isAuth: false
};

const postReducer = (state = initialPosts, action) => {
  switch (action.type) {
    case "POSTS_LIST_SUCCESS":
      return { ...state, posts: action.payload };

    // case "SUCCESS":
    //   return { ...state, loading: false };
    // case "PICTURE_POST":
    //   return { ...state, user: action.payload };
    //   case "PICTURE_DELETE":
    //     return { ...state, user: null };
    case "POSTS_LIST_CLEANUP":
      return initialPosts;
    default:
      return state;
  }
};
// const initialMyPosts = {
//   myposts: [],
//   loading: false,
//   // isAuth: false
// };
// const mypostReducer = (state = initialMyPosts, action) => {
//   switch (action.type) {
//     case "MY_POSTS_LIST_SUCCESS":
//       return { ...state, posts: action.payload };
//     case "MY_POSTS_LIST_CLEANUP":
//       return initialMyPosts;
//     default:
//       return state;
//   }
// };
export { postReducer };
