import { Header } from "./components/Header/Header";
import { ShowMasters } from "./components/ShowMasters/ShowMasters";
import { StartPage } from "./components/StartPage/StartPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserLogin } from "./components/User/UserLogin/UserLogin";
import { UserSignup } from "./components/User/UserSignup/UserSignup";
import { MasterLogin } from "./components/Master/MasterLogin/MasterLogin";
import { MasterSignup } from "./components/Master/MasterSignup/MasterSignup";

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
              <StartPage/>
            </Route>
            <Route exact path="/user/login">
              <UserLogin/>
            </Route>
            <Route exact path="/user/signup">
              <UserSignup/>
            </Route>
            <Route exact path="/master/login">
              <MasterLogin />
            </Route>
            <Route exact path="/master/signup">
              <MasterSignup />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
