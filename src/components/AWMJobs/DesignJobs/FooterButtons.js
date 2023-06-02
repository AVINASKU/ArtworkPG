import React from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const FooterButtons = ({
  onSaveAsDraft,
  onSubmit,
  handleCancel,
  approve,
  formValid,
}) => {
  const location = useLocation();
  const locationPath = location?.pathname;
  const url = locationPath?.split("/");
  const pathName = url[2];
  return (
    <div
      className="form-buttons"
      style={{ padding: 15, background: "#FAFAFA" }}
    >
      <Button
        className="button-layout"
        variant="secondary"
        onClick={() => handleCancel()}
      >
        Cancel
      </Button>
      {!approve && (
        <>
          {pathName !== "CNIQ" && (
            <Button
              className="button-layout"
              variant="secondary"
              onClick={() => onSaveAsDraft()}
            >
              Save as Draft
            </Button>
          )}
          <Button
            className="button-layout"
            type="submit"
            onClick={() => onSubmit()}
            disabled={formValid}
          >
            Submit
          </Button>
        </>
      )}
    </div>
  );
};

export default FooterButtons;
