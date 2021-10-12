import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createUser } from "../actions/userActions";
import "./Signup.css";

function Signup() {
  const NavStyle = {
    textDecoration: "None",
  };
  const [credentials, setCredentials] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const { user } = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/home");
    }
  }, [history, user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(createUser(credentials));
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="Signup">
      <div className="sign-Box">
        <div className="cir-design"></div>
        <div className="hello">
          <div className="emp"></div>
          Hello...!
        </div>
        <form className="sign-Form" onSubmit={submitHandler}>
          <input
            className="name"
            type="text"
            name="name"
            id="name"
            value={credentials.name}
            placeholder="name."
            onChange={onChange}
          />
          <input
            className="username"
            type="text"
            name="username"
            id="username"
            value={credentials.username}
            placeholder="username."
            onChange={onChange}
          />
          <input
            className="sign-email"
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            placeholder="email."
            onChange={onChange}
          />
          <input
            type="password"
            className="sign-password"
            name="password"
            id="password"
            value={credentials.password}
            placeholder="password."
            onChange={onChange}
          />
          <input
            type="password"
            className="sign-password"
            name="cpassword"
            id="cpassword"
            value={credentials.password}
            placeholder="confirm password.."
            onChange={onChange}
          />

          <button className="signup-button" type="submit">
            signup.
          </button>
          <div className="already-user">
            Already a user ?
            <Link to="./login" style={NavStyle}>
              <div> Login</div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
