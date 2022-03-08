import React from "react";
import "./GridViewPostScreen.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MmsRoundedIcon from "@mui/icons-material/MmsRounded";

function GridViewPostScreen({ photo, comments, likes }) {
  return (
    <div className="GridViewPostScreen">
      <img src={photo} alt="post" />
      <div className="hover-black">
        5<FavoriteIcon className="like-icon Profile-icon" fontSize="medium" />
        2
        <MmsRoundedIcon
          className="comment-icon Profile-icon"
          fontSize="medium"
        />
      </div>
    </div>
  );
}

export default GridViewPostScreen;
