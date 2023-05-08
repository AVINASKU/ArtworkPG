import React from "react";
import { ConfirmDialog } from "primereact/confirmdialog";

const ConfirmationDialog = ({
  visible,
  onHide,
  message,
  header,
  icon,
  accept,
  reject,
}) => {
  return (
    <div>
      <ConfirmDialog
        visible={visible}
        onHide={() => onHide(false)}
        message={message}
        header={header}
        icon={icon}
        accept={accept}
        reject={reject}
      />
    </div>
  );
};

export default ConfirmationDialog;
