import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSSOUser } from "./store/actions/SSOUserAction";
import MyProjects from "./components/Projects/MyProjects";
import { useSelector } from "react-redux";
import { updateUser } from "./apis/userApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home(props) {
  const user = props.username;
  const operatorId = user.split("@")[0];
  const dispatch = useDispatch();
  const User = useSelector((state) => state.ssoReducer?.ssoUser);
  const [combinedData, setCombinedData] = useState([]);
  const navigate = useNavigate(); // Use navigate from react-router-dom

  useEffect(() => {
    dispatch(getSSOUser(operatorId));
  }, [dispatch]);

  useEffect(() => {
    if (User) {
      const info = User?.userDetails;
      // Accessing accessgroup
      const accessGroupNames = info?.AccessGroup[0]?.AccessGroupNames;
      const parts = accessGroupNames ? accessGroupNames.split(":") : [];
      // Accessing UserGroup
      const userGroups = info?.UserGroup[0];
      setCombinedData([
        parts[1],
        userGroups.UserBU[0].BU_Name,
        userGroups.UserRegion[0].Region_Name,
        props.firstName,
      ]);
    }
  }, [User]);

  useEffect(() => {
    const fetchData = async () => {
      if (combinedData.length > 0) {
        await updateUser(props.firstName, combinedData);
        navigate("/myProjects");
      }
    };
    fetchData();
  }, [operatorId, combinedData, navigate]);

  return (
    <div>
      {/* Render the MyProjects component */}
      <MyProjects />
    </div>
  );
}

export default Home;
