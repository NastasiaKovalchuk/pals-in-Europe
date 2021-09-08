import React from "react";
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/showmasters" className="navbar-brand">Show masters</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" />
          <div className="btn-group">
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Signup
            </button>
            <ul className="dropdown-menu">
              <li><Link to="/master/signup" className="dropdown-item">Signup as Master</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link to="/signupuser" className="dropdown-item">Signup as User</Link></li>
            </ul>
          </div>
          <div className="btn-group">
            <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Login
            </button>
            <ul className="dropdown-menu">
              <li><Link to="/loginmaster" className="dropdown-item">Login as Master</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link to="/loginuser" className="dropdown-item">Login as User</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default React.memo(Header);
