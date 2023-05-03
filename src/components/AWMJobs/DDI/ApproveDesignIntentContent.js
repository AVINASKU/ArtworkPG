import React from "react";
import { FileUpload } from "primereact/fileupload";

const ApproveDesignIntentContent = ({Design_Intent_Name}) => {
  const DesignHeader = (di_name) => {
    return (
      <>
        <div
          style={{
            marginLeft: 20,
            padding: 5,
          }}
          className="font-color"
        >
          {di_name}
        </div>
      </>
    );
  };

  const customBase64Uploader = async (event) => {
  console.log("hello pranali");
    // convert file to base64 encoded
    const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    reader.readAsDataURL(blob);
    console.log("file", reader);

    reader.onloadend = function () {
      const base64data = reader.result;
      console.log("base 64", base64data);
    };

  };

  const chooseOptions = {
    icon: "pi pi-fw pi-upload",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };

    const onTemplateUpload = (e) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        // setTotalSize(_totalSize);
        // toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

  return (
    <div>
      <div className="design-intent-header">{DesignHeader(Design_Intent_Name)}</div>
      <div className="approve-design-intent">
        <FileUpload
          name="demo[]"
          url={"/api/upload"}
          accept="image/*"
          maxFileSize={1000000}
          mode="basic"
          onUpload={onTemplateUpload}
          chooseLabel="Browse"
        />
      </div>
    </div>
  );
};

export default ApproveDesignIntentContent;
