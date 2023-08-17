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
  bottomFixed,
  cptFormValid,
  checkTaskISComplete,
  hideSaveButton
}) => {
  const location = useLocation();
  const locationPath = location?.pathname;
  const url = locationPath?.split("/");
  const pathName = url[2];
  //console.log("checkReadWriteAccess in footer", checkReadWriteAccess, formValid);
  return (
    <div
      className={bottomFixed ? "form-buttons bottom-fixed" : "form-buttons"}
      style={{ background: "#FAFAFA" }}
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
          {hideSaveButton || (pathName !== "CNIQ" && pathName !== "CCD" && pathName !== "CPT") && (
            <Button
              className={
                !checkTaskISComplete || checkReadWriteAccess ? "button-layout" : "button-layout btn btn-disabled"
              }
              variant="secondary"
              onClick={() => onSaveAsDraft()}
              disabled={!checkReadWriteAccess || checkTaskISComplete}
            >
              Save as Draft
            </Button>
          )}
          <Button
            className="button-layout"
            type="submit"
            onClick={() => onSubmit()}
            disabled={checkReadWriteAccess !== undefined ? (formValid || !checkReadWriteAccess) : formValid}
          >
            Submit
          </Button>
        </>
      )}
    </div>
  );
};

export default FooterButtons;
