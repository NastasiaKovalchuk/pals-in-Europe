import React, { MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootStateValue } from "../../redux/reducers/rootReducer";
import "./specialists.scss";

const Specialist = () => {
  const mastersFromSelector = useSelector(
    (state: RootStateValue) => state.masters
  );
  const dispatch = useDispatch();

  return (
    <div className="main">
      <div className="first">
        <img src="img/sp1.jpeg" alt="" />
        <div>
          <p>Do you know a specialist?</p>
          <p>Let us know!</p>
          <button>
            <a href="mailto:palsInEurope@gmail.com?subject=I%can%20recomment%20someone">
              Send a message
            </a>
          </button>
        </div>
      </div>
      <div className="second">
        <img src="img/sp2.jpeg" alt="" />
        <div>
          <p>Are you a specialist?</p>
          <p>Sign up!</p>
          <button>
            <Link to="/master/signup">
              Fill in the form
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default React.memo(Specialist);
