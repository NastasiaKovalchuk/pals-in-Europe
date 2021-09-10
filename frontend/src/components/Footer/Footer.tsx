import React from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootStateValue } from '../redux/reducers/rootReducer';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAC } from '../redux/actionCreators/userAC';
import "./Footer.scss";

export const Footer = () => {
  const session = useSelector((state: RootStateValue) => state);
  const history = useHistory();
  const dispatch = useDispatch();
  // console.log('Header ===>', session.user.name);
  // console.log('Header', session.user.name );
  const onLogout = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(logoutAC())
    history.push("/");
  }
  return (
    <footer className="pt-4 my-md-5 pt-md-5 border-top">
      <div className="col-12 col-md">
      <h5>2113</h5>
      <h4>sdad</h4>
      </div>
    </footer>
  )
}

export default React.memo(Footer);
