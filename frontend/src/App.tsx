import Header from "./components/Header/Header";
import { ShowMasters } from "./components/ShowMasters/Map";
import StartPage from "./components/StartPage/StartPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserLogin } from "./components/User/UserLogin/UserLogin";
import { UserSignup } from "./components/User/UserSignup/UserSignup";
import { MasterLogin } from "./components/Master/MasterLogin/MasterLogin";
import { MasterSignup } from "./components/Master/MasterSignup/MasterSignup";
import { EditUserProfile } from './components/User/EditUserProfile/EditUserProfile';
import { EditMasterProfile } from './components/Master/EditMasterProfile/EditMasterProfile';
import { UserAccount } from "./components/User/UserAccount/UserAccount";
import { MasterAccount } from "./components/Master/MasterAccount/MasterAccount";
import { AdminAccount } from "./components/Admin/AdminAccount/AdminAccount";
import { OrdersMaster } from './components/Master/OrdersMaster/OrdersMaster';
import { OrdersUser } from './components/User/OrdersUser/OrdersUser';
import { ReviewsUser } from './components/User/ReviewsUser/ReviewsUser';
import { ReviewsMaster } from './components/Master/ReviewsMaster/ReviewsMaster';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserAC } from "./components/redux/actionCreators/userAC";
import { RootStateValue } from "./components/redux/reducers/rootReducer";
import {
  getCategoriesAC,
  getCategoriesSagaAC,
} from "./components/redux/actionCreators/categoryAC";
import { getMastersAC } from "./components/redux/actionCreators/mastersAC";
import OneMasterPage from "./components/OneMasterPage/OneMasterPage";
import { getMasterAC } from "./components/redux/actionCreators/masterAC";
import { Footer } from "./components/Footer/Footer";


function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootStateValue) => state.user);
  // console.log('APP ===>', user);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("http://localhost:8080/checkuser", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      // console.log('APP RESULT ===>', result);
      if (result.role === 'user') {
        dispatch(getUserAC(result));
      } else {
        dispatch(getMasterAC(result));
      }
    };
    // проверка на  роль + ошибка на регистрацию
    getUser();
  }, [dispatch]);

  useEffect(() => {
    fetch("http://localhost:8080/categories/")
      .then((res) => res.json())
      .then((res) => {
        const categoriesArr: string[] = [];
        for (let i = 0; i < res.categoriesFind.length; i++) {
          if (!categoriesArr.includes(res.categoriesFind[i])) {
            categoriesArr.push(res.categoriesFind[i]);
          }
        }
        dispatch(getCategoriesAC(categoriesArr));
      });
    fetch("http://localhost:8080/master/")
      .then((res) => res.json())
      .then((result) => {
        dispatch(getMastersAC(result.masters));
      });
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
              {!user.name ? <UserLogin /> : <StartPage />}
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
            <Route exact path="/search">
              <ShowMasters />
            </Route>
            <Route exact path="/account">
              {user.role === "user" ? <UserAccount /> : <MasterAccount />}
            </Route>
            <Route exact path="/account/profile">
              {user.role === "user" ? <EditUserProfile /> : <EditMasterProfile />}
            </Route>
            <Route exact path="/account/orders">
              {user.role === "user" ? <OrdersUser /> : <OrdersMaster />}
            </Route>
            <Route exact path="/account/reviews">
              {user.role === "user" ? <ReviewsUser /> : <ReviewsMaster />}
            </Route>
            <Route exact path="/admin/account">
              <AdminAccount />
            </Route>
            <Route exact path="/master/:id">
              <OneMasterPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
