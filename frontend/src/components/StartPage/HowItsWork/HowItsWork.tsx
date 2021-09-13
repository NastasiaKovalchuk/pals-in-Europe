import React from "react";
import "./HowItsWork.scss";

const HowItsWork = () => {

  return (
    <div className="d-flex flex-column align-items-center how">
      <div className="title">How it's works</div>
      <div className="steps">
        <div className="step">
          <img src="hw/1.png" />
          <div className="text">Specify Required Service</div>
        </div>
        <div className="step">
          <img src="hw/2.png" />
          <div className="text">Look at the Questionnaires</div>
        </div>
        <div className="step">
          <img src="hw/3.png" />
          <div className="text">Contact a Specialist</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HowItsWork);
