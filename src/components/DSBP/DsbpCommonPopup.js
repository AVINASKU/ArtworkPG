import React from "react";
import { Button } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import { useEffect } from "react";

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
  submitButtonShow,
  disconnectButtonShow,
  cancelButtonShow,
  showCancel,
  selectedReason,
  setSelectedReason
}) => {
  const footerContent = (
    <div>
      <Button
        variant="secondary"
        onClick={() => setDasbpDialog(false)}
        hidden={cancelButtonShow || cancelButtonShow === undefined}
      >
        Cancel
      </Button>
      {okButtonShow ? (
        <Button onClick={() => setDasbpDialog(false)}>OK</Button>
      ) : (
        <>
          <Button
            variant="secondary"
            onClick={() => {setDasbpDialog(false); setSelectedReason(false)}}
            hidden={cancelButtonShow === false}
          >
            {showCancel ? "Cancel" : "No"}
          </Button>
          {deleteButtonShow ? (
            <Button
              disabled={
                rejectFormData && Object.keys(rejectFormData)?.length === 0
              }
              onClick={() => {
                onSubmit();
                setDasbpDialog(false);
              }}
            >
              Delete
            </Button>
          ) : (
            <Button
              hidden={submitButtonShow}
              disabled={!selectedReason}
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
          <Button
            disabled={
              rejectFormData && Object.keys(rejectFormData)?.length === 0
            }
            onClick={onSubmit}
            hidden={disconnectButtonShow || disconnectButtonShow === undefined}
          >
            Disconnect
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
        onHide={() => {setDasbpDialog(false); setSelectedReason(false)}}
        footer={footerContent}
        className={`actionDialog dsbpCommonPopup ${
          okButtonShow !== false ? "headerIcon" : ""
        }`}
      >
        {children}
      </Dialog>
    </div>
  );
};
export default DsbpCommonPopup;
