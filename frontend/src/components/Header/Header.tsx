import React from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootStateValue } from '../../redux/reducers/rootReducer';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAC } from '../../redux/actionCreators/userAC';
import "./Header.scss";

export const Header = () => {
  const session = useSelector((state: RootStateValue) => state);
  const history = useHistory();
  const dispatch = useDispatch();
  // console.log('Header', session.user.name );
  const onLogout = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(logoutAC())
    history.push("/");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light header">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand navLink">
          <div className="pals">Pals in Europe</div>
          <img src="img/flag2.gif" alt="" className="flag" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {!session.user.name ?
          <>
            <div className="collapse navbar-collapse" id="navbarSupportedContent" />
            <div className="btn-group">
              <button type="button" className="btn dropdown-toggle signupBtn" data-bs-toggle="dropdown" aria-expanded="false">
                Signup
              </button>
              <ul className="dropdown-menu">
                <li><Link to="/master/signup" className="dropdown-item signDrop">Signup as Master</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link to="/user/signup" className="dropdown-item signDrop">Signup as User</Link></li>
              </ul>
            </div>
            <div className="btn-group">
              <button type="button" className="btn dropdown-toggle loginBtn" data-bs-toggle="dropdown" aria-expanded="false">
                Login
              </button>
              <ul className="dropdown-menu">
                <li><Link to="/master/login" className="dropdown-item loginDrop">Login as Master</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link to="/user/login" className="dropdown-item loginDrop">Login as User</Link></li>
              </ul>
            </div>
          </>
          :
          <>
            <div className="collapse navbar-collapse" id="navbarSupportedContent" />
            <div className="btn-group">
              <Link to='/account'>
                <button type="button" className="btn loginBtn " aria-expanded="false">
                  Account
                </button>
              </Link>
              <Link to="/" >
                <button type="button" onClick={onLogout} className="btn logouBtn" aria-expanded="false">
                  Logout
                </button>
              </Link>
            </div>
          </>
        }
      </div>
    </nav>
  )
}

export default React.memo(Header);
