import "./App.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Navigation from "./Components/Navigation";
import Home from "./Components/Home";
// import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProfileScreen from "./Components/ProfileScreen";
import MyProfileScreen from "./Components/MyProfileScreen";
// import { Redirect } from "react-router-dom";

function App() {
  // const { isAuth } = useSelector((state) => state.userInfo);
  return (
    <Router>
      <div className="App">
        <Navigation />
        {/* <MyProfileScreen /> */}
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={Home} />
          {/* <Route
            path="/login"
            render={() => {
              !isAuth ? <Login /> : <Redirect path="/home" />;
            }}
          /> */}
          <Route path="/login" exact component={Login} />

          <Route path="/signup" exact component={Signup} />
          <Route path="/:username" exact component={ProfileScreen} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
