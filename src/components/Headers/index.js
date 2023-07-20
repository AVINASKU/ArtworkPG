import React from "react";
import "./index.scss";
import Notificaitons from "../../assets/images/notification.svg";
import user from "../../assets/images/user.svg";
import moment from "moment-timezone";
import { useSelector } from "react-redux";
import { useProofScopeURL } from "../ProofScope/ViewFiles";
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
  const Role = User?.userProfile;
  const roles = Role?.role || [];
  const rolesString = roles.join(", ");
  const viewProofScopeFile = useProofScopeURL();
  const handleViewProofScopeClick = async (event, fileUrl) => {
    event.preventDefault();
    viewProofScopeFile(`${fileUrl}`);
  };
  const url = window.location.href;
  const domainRegex = /https?:\/\/([^/]+)\//; // Regular expression to match the domain part of the URL

  const match = url.match(domainRegex);
  let domain = "";

  if (match && match.length > 1) {
    domain = match[1]; // Extract the matched part
  }

  let env;

  switch (domain) {
    case "awflowdev.pg.com":
      env = "DEV/";
      break;
    case "awflowqa.pg.com":
      env = "QA/";
      break;
    case "awflowsit.pg.com":
      env = "SIT/";
      break;
    default:
      env = "";
  }
  return (
    <div className="header">
      <div>
        <h1>
          Welcome Back, {userInformation.username} ({rolesString})!
        </h1>
        <a
          className="flex flex-column text-left ml-3"
          onClick={(event) =>
            handleViewProofScopeClick(
              event,
              // `cloudflow://PP_FILE_STORE/awm/${env}RDT/Baby Care/RDT/activefile (1).svg`
              "cloudflow://PP_FILE_STORE/CIC_20169540_POA-00454657_Bounty_NA_Paper_Towel_Essentials_Select-a-Size_Double_Roll_2CT_White_SHIPPER.pdf"
            )
          }
        >
          activefile(1).svg
        </a>
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
