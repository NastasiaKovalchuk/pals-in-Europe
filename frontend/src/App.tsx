import Header from "./components/Header/Header";
import { ShowMasters } from "./components/ShowMasters/ShowMasters";
import StartPage from "./components/StartPage/StartPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserLogin } from "./components/User/UserLogin/UserLogin";
import { UserSignup } from "./components/User/UserSignup/UserSignup";
import { MasterLogin } from "./components/Master/MasterLogin/MasterLogin";
import { MasterSignup } from "./components/Master/MasterSignup/MasterSignup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserAC } from "./components/redux/actionCreators/userAC";
import { RootStateValue } from './components/redux/reducers/rootReducer';

function App() {
  const dispatch = useDispatch();
  // const
  const user = useSelector((state: RootStateValue) => state.user)

  useEffect(() => {
    const checkUser = async () => {
      const response = await fetch(
        'http://localhost:8080/checkuser',
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      const result = await response.json();      
      dispatch(getUserAC(result.name));
    }

    checkUser();

  }, [dispatch]);

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

            <Route exact path="/user/login">
              {user.name === "" ?
                <UserLogin />
                : <StartPage />
              }
            </Route>
            <Route exact path="/user/signup">
              {user.name === "" ?
                <UserSignup />
                : <StartPage />
              }
            </Route>
            <Route exact path="/master/login">
              <MasterLogin />
            </Route>
            <Route exact path="/master/signup">
              <MasterSignup />
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
