import React from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const IQCDFooterButtons = ({
  onSaveAsDraft,
  onSubmit,
  handleCancel,
  approve,
  formValid,
  checkReadWriteAccess,
  bottomFixed,
  cptFormValid,
  data,
}) => {
  const location = useLocation();
  const locationPath = location?.pathname;
  const url = locationPath?.split("/");
  const pathName = url[2];
  console.log("checkReadWriteAccess in footer", checkReadWriteAccess);
  console.log("data", data);
  return (
    <div
      className={bottomFixed ? "form-buttons bottom-fixed" : "form-buttons"}
      style={{ padding: 15, background: "#FAFAFA" }}
    >
      <Button
        className={checkReadWriteAccess ? "button-layout" : "btn btn-disabled"}
        variant="secondary"
        disabled={!checkReadWriteAccess}
        onClick={() => handleCancel()}
      >
        Cancel
      </Button>
      {!approve && (
        <>
          {pathName !== "CNIQ" && pathName !== "CCD" && pathName !== "CPT" && (
            <Button
              className={
                checkReadWriteAccess ? "button-layout" : "btn btn-disabled"
              }
              variant="secondary"
              onClick={() => onSaveAsDraft()}
              disabled={
                !checkReadWriteAccess || data?.Task_Status === "Complete"
              }
            >
              Save as Draft
            </Button>
          )}
          <Button
            className="button-layout"
            type="submit"
            onClick={() => onSubmit()}
            disabled={
              formValid ||
              !checkReadWriteAccess ||
              data?.Task_Status === "Complete"
            }
          >
            Submit
          </Button>
        </>
      )}
    </div>
  );
};

export default IQCDFooterButtons;
