import React from "react";
import "./PostScreen.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";

function PostScreen({ dp_image, photo, username, comment, caption }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const NavStyle = {
    textDecoration: "None",
  };
  return (
    <div className="Postscreen">
      <div className="userDetails">
        <Avatar alt="DP" src={dp_image} />
        <Link className="linktoprofile" style={NavStyle} to={`/${username}`}>
          <div className="userName">{username}</div>
        </Link>
        <Button
          id="demo-positioned-button"
          aria-controls="demo-positioned-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVert className="more-vert" />
        </Button>
      </div>
      <div className="userPhoto">
        <img src={photo} alt="kimatsu" />
      </div>
      <div className="userCaption">{caption}</div>
      <form className="userComments">
        <input className="comment-here" placeholder="Comment here.." />
        <button type="submit" className="postComment">
          POST
        </button>
      </form>

      <Menu
        className="Menu-kebab"
        theme="dark"
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Save</MenuItem>
        <MenuItem onClick={handleClose}>Share</MenuItem>
      </Menu>
    </div>
  );
}

export default PostScreen;
