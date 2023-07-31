import React from "react";
import { Button } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const DsbpCommonPopup = ({
  children,
  actionHeader,
  dasbpDialog,
  setDasbpDialog,
  rejectFormData,
  onSubmit,
  okButtonShow,
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
          <Button
            disabled={
              rejectFormData && Object.keys(rejectFormData)?.length === 0
            }
            onClick={onSubmit}
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
