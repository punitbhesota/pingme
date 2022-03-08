import "./App.css";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Navigation from "./Components/Navigation/Navigation";
import Home from "./Pages/Home/Home";
// import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProfileScreen from "./Pages/Profile/ProfileScreen";
import ChatPage from "./Pages/Chatpage/ChatPage";
import InnerNavMobile from "./Components/InnerNavMobile/InnerNavMobile";
import AvailableUsersMobile from "./Pages/AvailableUsersMobile/AvailableUsersMobile";
// import { Redirect } from "react-router-dom";

function App() {
  // const { isAuth } = useSelector((state) => state.userInfo);
  return (
    <Router>
      <div className="App">
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
          <Route path="/chatnow" exact component={ChatPage} />

          <Route path="/signup" exact component={Signup} />
          <Route path="/:username" exact component={ProfileScreen} />
          <Route
            path="/availableusersmobile"
            exact
            component={AvailableUsersMobile}
          />
        </Switch>
        <InnerNavMobile />
        {/* <AvailableUsersMobile /> */}
      </div>
    </Router>
  );
}

export default App;
