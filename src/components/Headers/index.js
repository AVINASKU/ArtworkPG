import React from "react";
import "./index.scss";
import Notificaitons from "../../assets/images/notification.svg";
import user from "../../assets/images/user.svg";


const sessionData = sessionStorage.getItem("session");

const sessionObj = JSON.parse(sessionData);

const time = sessionObj.loginTime;


//for userid and username
const username = sessionObj.username;

const userid = sessionObj.userid;



const Header = () => {
  return (
      
    <div className="header">
      
      <div>
        <h1>Welcome back, {username}!</h1>
        <div className="user-date-time">
          <p>{time}</p>
          {/* <p>03:10 pm (GMT+5:30)</p> */}
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


