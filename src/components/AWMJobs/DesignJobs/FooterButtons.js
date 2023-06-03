import React from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const FooterButtons = ({
  onSaveAsDraft,
  onSubmit,
  handleCancel,
  approve,
  formValid,
  checkReadWriteAccess,
}) => {

console.log("checkReadWriteAccess in footer", checkReadWriteAccess);
  return (
    <div
      className="form-buttons"
      style={{ padding: 15, background: "#FAFAFA" }}
    >
      <Button
        className="button-layout"
        variant="secondary"
        disabled={!checkReadWriteAccess}
        onClick={() => handleCancel()}
      >
        Cancel
      </Button>
      {!approve && (
        <>
          <Button
            className="button-layout"
            variant="secondary"
            onClick={() => onSaveAsDraft()}
            disabled={!checkReadWriteAccess}
          >
            Save as Draft
          </Button>
          <Button
            className="button-layout"
            type="submit"
            onClick={() => onSubmit()}
            disabled={formValid || !checkReadWriteAccess}
          >
            Submit
          </Button>
        </>
      )}
    </div>
  );
};

export default FooterButtons;
