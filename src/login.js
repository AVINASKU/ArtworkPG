import React, { useEffect } from "react";
import UserLogin from "./components/UserLogin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;

  useEffect(() => {
    if (userInformation?.username) {
      navigate("/myProjects");
    }
  }, [userInformation]);

  return <UserLogin />;
}
export default Login;
