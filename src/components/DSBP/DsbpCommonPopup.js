import React from "react";
import { Button } from "react-bootstrap";
import { Dialog } from "primereact/dialog";

const DsbpCommonPopup = ({
  children,
  actionHeader,
  dasbpDialog,
  setDasbpDialog,
  rejectFormData,
  onSubmit,
  okButtonShow,
  deleteButtonShow,
  yesButtonShow,
}) => {
  const footerContent = (
    <div>
      {okButtonShow ? (
        <Button onClick={() => setDasbpDialog(false)}>OK</Button>
      ) : (
        <>
          <Button variant="secondary" onClick={() => setDasbpDialog(false)}>
            No
          </Button>
          {deleteButtonShow ? (
            <Button
              disabled={
                rejectFormData && Object.keys(rejectFormData)?.length === 0
              }
              onClick={onSubmit}
            >
              Delete
            </Button>
          ) : (
            <Button
              disabled={
                rejectFormData && Object.keys(rejectFormData)?.length === 0
              }
              onClick={onSubmit}
            >
              Submit
            </Button>
          )}
          <Button
            disabled={
              rejectFormData && Object.keys(rejectFormData)?.length === 0
            }
            onClick={onSubmit}
            hidden={yesButtonShow}
          >
            Yes
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="card flex justify-content-center dsbp-action-dialog">
      <Dialog
        header={actionHeader}
        visible={dasbpDialog}
        style={{ width: "500px" }}
        onHide={() => setDasbpDialog(false)}
        footer={footerContent}
        className="actionDialog dsbpCommonPopup"
      >
        {children}
      </Dialog>
    </div>
  );
};
export default DsbpCommonPopup;
