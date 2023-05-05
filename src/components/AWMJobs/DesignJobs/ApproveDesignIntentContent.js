import React from "react";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Tag } from "primereact/tag";

const ApproveDesignIntentContent = ({
  Design_Intent_Name,
  upload,
  approve,
  file_name,
}) => {
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
        {approve && (
          <Tag
            style={{
              backgroundColor: "rgb(237, 244, 250)",
              color: "#03A000",
              fontSize: 14,
              marginRight: 10,
            }}
            className="mr-2"
            icon="pi pi-check"
            severity="Approved"
            value="Approved"
          ></Tag>
        )}
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
      <div className="design-intent-header">
        {DesignHeader(Design_Intent_Name)}
      </div>
      <div className="approve-design-intent">
        {upload && (
          <div
            style={{
              marginLeft: 20,
              padding: 5,
            }}
          >
            <div>Upload</div>
            <FileUpload
              name="demo[]"
              url={"/api/upload"}
              accept="image/*"
              maxFileSize={1000000}
              mode="basic"
              onUpload={onTemplateUpload}
              chooseLabel="Browse"
            />{" "}
          </div>
        )}
        {approve && (
          <div
            style={{
              marginLeft: 20,
              padding: 5,
            }}
          >
            <div>Approve</div>
            <Image
              src="https://primefaces.org/cdn/primereact/images/galleria/galleria7.jpg"
              alt="Image"
              width="25"
            />
            <div
              style={{
                color: "#003DA5",
                fontSize: 12,
                width: 150,
                cursor: "pointer",
              }}
            >
              {file_name}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveDesignIntentContent;
