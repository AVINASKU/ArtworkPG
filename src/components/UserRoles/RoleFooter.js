import React from "react";
import { Button } from "react-bootstrap";

function RoleFooter({
  bottomFixed,
  onReset,
  onSubmit,
  displayUserRole,
  selectedRole,
  selectedCategory,
  selectedRegion,
}) {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onSubmit(); // Call the onSubmit function passed as a prop
  };

  const handleReset = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onReset();
  };
  const validation =
    selectedRole === "" || selectedCategory === "" || selectedRegion === "";

  return (
    <div>
      {/* <h1>This is footer</h1> */}
      <div
        className={bottomFixed ? "form-buttons bottom-fixed" : "form-buttons"}
        style={{ padding: 15, background: "#FAFAFA" }}
      >
        <Button
          className="button-layout"
          type="Reset"
          onClick={handleReset}
          disabled={displayUserRole}
        >
          Reset
        </Button>
        <Button
          className="button-layout"
          type="submit"
          onClick={handleSubmit}
          disabled={displayUserRole || validation}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default RoleFooter;
