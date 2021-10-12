import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";
import "./Login.css";
function Login() {
  const NavStyle = {
    textDecoration: "None",
  };
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { user } = useSelector((state) => state.userInfo);

  let history = useHistory();

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials.email, credentials.password));
  };

  useEffect(() => {
    if (user) {
      history.push("/home");
    }
  }, [history, user]);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="LoginPage">
      <div className="Login-Box">
        <div className="circle-design"></div>
        <div className="welcome">
          <div className="empty"></div>
          Welcome <br />
          Back..
        </div>
        <form className="Login-Form" onSubmit={submitHandler}>
          <input
            className="email"
            type="email"
            name="email"
            id="email"
            value={credentials.email}
            placeholder="email."
            onChange={onChange}
          />
          <input
            type="password"
            className="password"
            name="password"
            id="password"
            value={credentials.password}
            placeholder="password."
            onChange={onChange}
          />
          <div className="forgotpwd">forget password?</div>
          <button className="login-button" type="submit">
            login
          </button>
          <div className="new-user">
            New user ?
            <Link to="./signup" style={NavStyle}>
              <div> Signup</div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
