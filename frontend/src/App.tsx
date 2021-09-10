import Header from "./components/Header/Header";
import { ShowMasters } from "./components/ShowMasters/ShowMasters";
import StartPage from "./components/StartPage/StartPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserLogin } from "./components/User/UserLogin/UserLogin";
import { UserSignup } from "./components/User/UserSignup/UserSignup";
import { MasterLogin } from "./components/Master/MasterLogin/MasterLogin";
import { MasterSignup } from "./components/Master/MasterSignup/MasterSignup";
import { UserAccount } from './components/User/UserAccount/UserAccount';
import { MasterAccount } from './components/Master/MasterAccount/MasterAccount'
import { AdminAccount } from './components/Admin/AdminAccount/AdminAccount'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserAC } from "./components/redux/actionCreators/userAC";
import { RootStateValue } from "./components/redux/reducers/rootReducer";
import { getCategoriesAC, getCategoriesSagaAC } from "./components/redux/actionCreators/categoryAC";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootStateValue) => state.user)
  // console.log('App ===>', user.role);

  useEffect(() => {
    const getUSer = async () => {
      const response = await fetch("http://localhost:8080/checkuser", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const result = await response.json();
      // console.log('getUserAC result => ', result);
      dispatch(getUserAC(result));
    };
    getUSer()
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
              {!user.name ?
                <UserLogin />
                : <StartPage />
              }
            </Route>
            <Route exact path="/user/signup">
              {!user.name ? <UserSignup /> : <StartPage />}
            </Route>
            <Route exact path="/user/signup">
              {user.name === "" ? <UserSignup /> : <StartPage />}
            </Route>
            <Route exact path="/master/login">
              {!user.name ? <MasterLogin /> : <StartPage />}
            </Route>
            <Route exact path="/master/signup">
              {!user.name ? <MasterSignup /> : <StartPage />}
            </Route>
            <Route exact path="/search/:value">
              <ShowMasters />
            </Route>
            <Route exact path="/account">
              {user.role === 'user' ? <UserAccount /> : <MasterAccount /> }
            </Route>
            <Route exact path="/admin/account">
              <AdminAccount />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
