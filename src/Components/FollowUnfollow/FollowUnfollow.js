import React, { useState } from "react";
import "./FollowUnfollow.css";

const FollowUnfollow = ({ followed, handleClick, type, targetId, token }) => {
  const [isFollowed, setIsFollowed] = useState(followed);
  const handleFollow = (type, token, targetId) => {
    handleClick(type, token, targetId);
    setIsFollowed(!isFollowed);
  };
  return (
    <div
      className={`FollowUnFollowBtn ${!isFollowed ? "follow" : "unfollow"}`}
      onClick={() => handleFollow(type, token, targetId)}
    >
      {isFollowed ? "Unfollow" : "Follow"}
    </div>
  );
};

export default FollowUnfollow;
