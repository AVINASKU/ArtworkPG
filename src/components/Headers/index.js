import React from "react";
import "./index.scss";
import Notificaitons from "../../assets/images/notification.svg";
import user from "../../assets/images/user.svg";
import moment from "moment-timezone";
import { useSelector } from "react-redux";

const sessionData = sessionStorage?.getItem("session");

const sessionObj = JSON.parse(sessionData);

//for userid and username

// const time = sessionObj?.loginTime;

//for userid and username
const username = sessionObj?.username;

const userid = sessionObj?.userid;

// For date

// const loginTime = sessionObj?.loginTime;

// const formattedDate = (loginTime) => {
//   const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//   const time = moment.tz(loginTime, timezone);
//   const zone = moment.tz(loginTime, timezone).zoneAbbr();
//   return time.clone().tz(zone).format("DD, MMMM,  YYYY");
// };

//for time

// const formattedTime = (loginTime) => {
//   // console.log("loginTime: ", loginTime);
//   const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//   const time = moment.tz(loginTime, timezone);
//   const zone = moment.tz(loginTime, timezone).zoneAbbr();
//   // console.log("zone: ", zone);
//   return time.clone().tz(zone).format("h:mm a ([GMT]Z)");
// };

const Header = () => {
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;

  return (
    <div className="header">
      <div>
        <h1>
          Welcome Back, {userInformation.username} ({userInformation.role})!
        </h1>
        {/* <div className="user-date-time">
          <p>{formattedDate(userInformation.loginTime)}</p>
          <p>{formattedTime(userInformation.loginTime)}</p>
        </div> */}
      </div>
      <div className="user-profile">
        {/* <img
          src={Notificaitons}
          alt="notificaitons"
          className="notificaitons"
        /> */}
        <p>
          {userInformation.username}
          <span>{userInformation.userid}</span>
        </p>
        {/* <img src={user} alt="user profile" className="userProfile" /> */}
      </div>
    </div>
  );
};
export default Header;
