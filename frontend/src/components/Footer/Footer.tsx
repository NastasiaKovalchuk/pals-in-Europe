import React from "react";
import "./Footer.scss";

export const Footer = () => {

  return (
    <footer className="footerMain">
      <div >
        <div className="footerTitle">
          <h4>About this portal</h4>
          <h4>Contacts</h4>
        </div>
        <div className="elements">
          <div className="discription">
            Pals in Europe - a project helping to find craftsmen in Europe
            from different categories. It speeds up the process of finding
            the required specialist due to the geolocation system and filters.
            Having tried it once, you will want to come back here again and again.
          </div>
          <div className="allIcons">
            <img className="icons" src="icons/inst.png" alt="" />
            <img className="icons" src="icons/fb.png" alt="" />
            <img className="icons" src="icons/slack.png" alt="" />
            <img className="icons" src="icons/tel.png" alt="" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default React.memo(Footer);
