import React from "react";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ auth, children, ...rest }) => {
  console.log("Protected Route:---------", ...rest);

  return (
    <Route {...rest}>{!auth ? <Navigate to="/"  replace /> : children}</Route>
  );
};
export default ProtectedRoute;
