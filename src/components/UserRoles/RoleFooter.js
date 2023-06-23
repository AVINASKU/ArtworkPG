import React from "react";
import { Button } from "react-bootstrap";

function RoleFooter({ bottomFixed, onReset, onSubmit }) {
  const handleSubmit = (r) => {
    onSubmit();
  };
  const handleReset = () => {
    onReset();
  };
  return (
    <div>
      {/* <h1>This is footer</h1> */}
      <div
        className={bottomFixed ? "form-buttons bottom-fixed" : "form-buttons"}
        style={{ padding: 15, background: "#FAFAFA" }}
      >
        <Button className="button-layout" type="Reset" onClick={handleReset}>
          Reset
        </Button>
        <Button className="button-layout" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default RoleFooter;
