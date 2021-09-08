import Header from "./components/Header/Header";
import { ShowMasters } from "./components/ShowMasters/ShowMasters";
import StartPage from "./components/StartPage/StartPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Signup } from "./components/Signup/Signup";

function App() {

  return (
    <div>
      <Router>
        <Header />
        <div>
          <Switch>
            <Route exact path="/showmasters">
              <ShowMasters />
            </Route>
            <Route exact path="/">
              <StartPage />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/master/signup">
              <div>signupmaster</div>
            </Route>
            <Route exact path="/signupuser">
              <div>signupmuser</div>
            </Route>
            <Route exact path="/signupadmin">
              <div>signupuser</div>
            </Route>
            <Route exact path="/search/:value">
              <ShowMasters />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
