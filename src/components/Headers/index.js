import React from "react";
import "./index.scss";
import Notificaitons from "../../assets/images/notification.svg";
import user from "../../assets/images/user.svg";
import moment from "moment";

const sessionData = sessionStorage?.getItem("session");

const sessionObj = JSON.parse(sessionData);

//for userid and username

const username = sessionObj?.username;

const userid = sessionObj?.userid;

// For date

const loginTime = sessionObj?.loginTime;

const formattedDate = moment(loginTime, "M/D/YYYY, h:mm:ss A").format(
  "DD, MMMM,  YYYY"
);

//for time

const formattedTime = moment(loginTime).format(" h:mm  A (GMT Z)");

const Header = () => {
  return (
    <div className="header">
      <div>
        <h1>Welcome Back, {username}!</h1>
        <div className="user-date-time">
          <p>{formattedDate}</p>
          <p>{formattedTime}</p>
        </div>
      </div>
      <div className="user-profile">
        <img
          src={Notificaitons}
          alt="notificaitons"
          className="notificaitons"
        />
        <p>
          {username}
          <span>{userid}</span>
        </p>
        <img src={user} alt="user profile" className="userProfile" />
      </div>
    </div>
  );
};
export default Header;
