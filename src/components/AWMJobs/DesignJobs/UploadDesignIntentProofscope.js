import React, { useEffect, useState, useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Tag } from "primereact/tag";
import { useProofScopeURL } from "../../ProofScope/ViewFiles";

const UploadDesignIntentProofscope = ({
    Design_Intent_Name,
    upload,
    approve,
    file_name,
    setformattedValue,
    setFileName,
    setMappedFiles,
    setAzureFile,
    item,
    roleName,
    ArtworkAgilityPage,
    version,
}) => {
    console.log("item here here", item);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);
    const [updatedImg, setUpdatedImg] = useState("");
    const viewProofScopeFile = useProofScopeURL();

    useEffect(() => {
        console.log("item ----", item)
        if (item?.DesignJobDetails[0]?.FileMetaDataList[0]) {
            console.log("here here", item?.DesignJobDetails[0]?.FileMetaDataList[0]);
            let uploadedFileName = item?.DesignJobDetails[0]?.FileMetaDataList[0]?.File_Name;
            setUpdatedImg(uploadedFileName)
        }
    })

    const handleViewProofScopeClick = async (event, fileUrl) => {
        event.preventDefault();
        viewProofScopeFile(`cloudflow://PP_FILE_STORE/aacdata/${fileUrl}`);

    };

    let di_name;
    di_name = item?.Task_Name;

    const onTemplateUpload = (e) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
    };

    const itemTemplate = (file, props) => {
        console.log("file here 1", file);
        setformattedValue(props.formatSize);
        setFileName(file.name);
        setAzureFile(file);
        //   seFileData(file);
        return (
            <div className="upload-row">
                <img
                    alt={file.name}
                    role="presentation"
                    src={file.objectURL}
                    width={50}
                />
                <a
                    className="flex flex-column text-left ml-3"
                    onClick={(event) => handleViewProofScopeClick(event, "pranali-test-proofscope.png")}
                >
                    {file.name}
                </a>

            </div>
        );
    };
    const onTemplateSelect = (e) => {
        const uploadedFile = e.files[0];
        const renamedFile = {
            ...uploadedFile,
            name: di_name,
            size: uploadedFile.size,
            type: uploadedFile.type,
            lastModified: uploadedFile.lastModified,
            lastModifiedDate: uploadedFile.lastModifiedDate,
            webkitRelativePath: uploadedFile.webkitRelativePath
        };
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
        // setAzureFile(renamedFile);
        // setFileName(di_name);
    };

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

    return (
        <div>
            <div className="design-intent-header">{DesignHeader(di_name)}</div>
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
                            ref={fileUploadRef}
                            name="demo[]"
                            url="/api/upload"
                            accept="/*"
                            customUpload
                            onUpload={onTemplateUpload}
                            onSelect={onTemplateSelect}
                            itemTemplate={itemTemplate}
                        />
                    </div>
                )}

                {updatedImg &&

                    <a
                        className="flex flex-column text-left ml-3"
                        onClick={(event) => handleViewProofScopeClick(event, updatedImg)}
                    >
                        {updatedImg}
                    </a>
                }

                {approve && (
                    <div
                        style={{
                            marginLeft: 20,
                            padding: 5,
                        }}
                    >
                        <div>Approve</div>
                        <a
                            className="flex flex-column text-left ml-3"
                            onClick={(event) => handleViewProofScopeClick(event, "pranali-test-proofscope.png")}
                        >
                            {updatedImg}
                        </a>
                        {/* <Image
                            src="https://primefaces.org/cdn/primereact/images/galleria/galleria7.jpg"
                            alt="Image"
                            width="25"
                        /> */}
                        {/* <div
                            style={{
                                color: "#003DA5",
                                fontSize: 12,
                                width: 150,
                                cursor: "pointer",
                            }}
                        >
                            {file_name}
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadDesignIntentProofscope;
