import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import DragAndDrop from "./DragAndDrop/DragAndDrop";
import "./index.scss";

const CustomizeViewDialog = ({ showTaskDialog, onClose, availableFields, setCustomizeViewFields, customizeViewFields, headerName, CDPTPageData, IQData, RDTData }) => {
  const [visible, setVisible] = useState(showTaskDialog);

  useEffect(() => {
    setVisible(showTaskDialog);
  }, [showTaskDialog]);

  const hideDialog = () => {
    setVisible(false);
    onClose();
  };

  return (
    (
      <Dialog
        visible={visible}
        className="customize-view-dialog"
        onHide={hideDialog}
        header={<div className="p-dialog-header1">Customize View</div>}
      >
        <div className="p-fluid popup-details">
          <DragAndDrop
            availableFields={availableFields}
            hideDialog={hideDialog}
            setCustomizeViewFields={setCustomizeViewFields}
            customizeViewFields={customizeViewFields}
            headerName={headerName}
            CDPTPageData={CDPTPageData}
            IQData={IQData}
            RDTData={RDTData}
          />
        </div>
      </Dialog>
    )
  );
};

export default CustomizeViewDialog;
