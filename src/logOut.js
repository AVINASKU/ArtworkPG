import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
const LogOut = (props) => {
  return (
    <div className="content-layout" id="tableDiv">
      <div className="tabular-view">
        <div className="logout-text">
          <h4>
            You have successfully logged out from the{" "}
            <b>Artwork Agiliy Suite!</b>
          </h4>
          <Button>Login Here!</Button>
        </div>
      </div>
    </div>
  );
};
export default LogOut;
