import React, { useEffect, useState, useMemo } from "react";
import { InputText } from "primereact/inputtext";
import { Row, Col } from "react-bootstrap";
import { Checkbox } from "primereact/checkbox";
import deleteIcon from "../../../assets/images/deleteIcon.svg";
import { MultiSelect } from "primereact/multiselect";
import { FileUpload } from "primereact/fileupload";
import {
  // SubstrateList,
  // PrinterList,
  // PrinterProcessList,
  PantoneList,
} from "../../../categories";
import { AutoComplete } from "primereact/autocomplete";
import { useLocation, useParams } from "react-router-dom";
import { isArray, isString } from "lodash";
import UploadFile from "./UploadFile";
import { useSelector } from "react-redux";
const CloneJobs = ({
  index,
  Artwork_Brand,
  Artwork_Category,
  Project_Name,
  handleDelete,
  item,
  data,
  addData,
  addIddData,
  jobName,
  disabled,
  formValid,
  setFormValid,
  setformattedValue,
  setAzureFile,
  setFileName,
  fileName,
  IQ,
  date,
  version,
  CD,
  checkReadWriteAccess,
}) => {
  const {
    Printing_Process,
    Pantone,
    Additional_Info,
    event,
    Select,
    Printer,
    Substrate,
    Design_Job_ID,
    Design_Job_Name,
    Print_Trial_Needed,
    CD_Approved,
    Print_Trial_Done,
  } = item;
  const { DropDownValuesData, loading } = useSelector(
    (state) => state.DropDownValuesReducer
  );

  const IDDSampleApproved = data?.IDDSampleApproved || false;
  const IDDSampleLabTestApproved = data?.IDDSampleLabTestApproved || false;
  const location = useLocation();
  const [PrinterList, setPrinterList] = useState([]);
  const [SubstrateList, setSubstrateList] = useState([]);
  const [PrinterProcessList, setPrinterProcessList] = useState([]);
  // const [PantoneList, setPantoneList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [iddsaChecked, setIddsaChecked] = useState(IDDSampleApproved);
  const [iddsltaChecked, setIddsltaChecked] = useState(
    IDDSampleLabTestApproved
  );

  const [printTrailNeeded, setPrintTrailNeeded] = useState(false);
  const [CDConfirmation, setCDConfirmation] = useState(false);
  const [printTrailDone, setPrintTrailDone] = useState(false);
  const [printerProcess, setPrinterProcess] = useState(Printing_Process);
  const [pantone, setPantone] = useState(Pantone || "");
  const [substrateData, setSubstarteData] = useState(Substrate);
  const [printers, setPrinters] = useState([]);
  // const [printers, setPrinters] = useState(Printer);
  const [additionalInformation, setAdditionalInfo] = useState(Additional_Info);
  const [filteredItems, setFilteredItems] = useState(null);
  const [filteredPantoneItems, setFilteredPantoneItems] = useState(null);
  const [taskPageDropDownValues, setTaskPageDropDownValues] = useState([]);

  // const locationPath = location?.pathname;
  // const url = locationPath?.split("/");
  // const pathName = url[2];
  // alert(pathName)
  let { TaskID } = useParams();
  const pathName = TaskID.split("_")[0];

  let Art_Brand = [];
  Artwork_Brand?.forEach((obj) => {
    Art_Brand.push(obj.Brand_Name);
  });
  let Art_Category = [];
  Artwork_Category?.forEach((obj) => {
    Art_Category.push(obj.Category_Name);
  });

  useEffect(() => {
    let temp = [];
    isArray(Printer) &&
      Printer?.forEach((ptr) => {
        temp.push(ptr.Code);
      });
    setPrinters(temp);
  }, [Printer]);

  useEffect(() => {
    setPantone(Pantone);
  }, [Pantone]);

  useEffect(() => {
    setPrinterProcess(Printing_Process);
  }, [Printing_Process]);

  useEffect(() => {
    setSubstarteData(Substrate);
  }, [Substrate]);

  useEffect(() => {
    setAdditionalInfo(Additional_Info);
  }, [Additional_Info]);

  useEffect(() => {
    if (DropDownValuesData) {
      setTaskPageDropDownValues(
        DropDownValuesData?.ArtworkAgilityTasksPage || []
      );
    }
  }, [DropDownValuesData]);

  useEffect(() => {
    if (
      taskPageDropDownValues !== undefined &&
      taskPageDropDownValues.length !== 0
    ) {
      setPrinterList(taskPageDropDownValues.Artwork_Printer);
      const Artwork_Substrate = taskPageDropDownValues.Artwork_Substrate.reduce(
        (acc, curr) => (acc.push(curr.Substrate_Name), acc),
        []
      );
      setSubstrateList(Artwork_Substrate);
      const Artwork_PrinterProcess =
        taskPageDropDownValues.Artwork_PrinterProcess.reduce(
          (acc, curr) => (acc.push(curr.PrinterProcess_Name), acc),
          []
        );
      setPrinterProcessList(Artwork_PrinterProcess);
      // setPantoneList(taskPageDropDownValues.Artwork_Pantone);
    }
  }, [taskPageDropDownValues]);

  let showPage;
  switch (pathName) {
    case "DNPF":
      showPage = "DNPF";
      // Code to execute when pathName is 'DNPF'
      break;
    case "CCD":
      showPage = "CCD";
      // Code to execute when pathName is 'CCD'
      break;
    case "CPT":
      showPage = "CPT";
      // Code to execute when pathName is 'CPT'
      break;
    case "DNIQ":
      showPage = "DNIQ";
      // Code to execute when pathName is 'DNIQ'
      break;
    case "CNIQ":
      showPage = "CNIQ";
      // Code to execute when pathName is 'CNIQ'
      break;
    default:
      // Code to execute when pathName is none of the specified values
      break;
  }

  useEffect(() => {
    setChecked(Select);
    addData("Select", index, Select, di_name);
  }, [Select]);

  useEffect(() => {
    setIddsaChecked(IDDSampleApproved);
  }, [IDDSampleApproved]);

  useEffect(() => {
    setIddsltaChecked(IDDSampleLabTestApproved);
  }, [IDDSampleLabTestApproved]);

  useEffect(() => {
    setPrintTrailNeeded(Print_Trial_Needed);
    setCDConfirmation(CD_Approved);
    setPrintTrailDone(Print_Trial_Done);
  }, [Print_Trial_Needed, CD_Approved, Print_Trial_Done]);

  // useEffect(() => {
  //   // if (showPage === "CCD" || showPage === "CPT") {
  //   //   if (printerProcess && substrateData && printTrailNeeded && checked) {
  //   //     setFormValid(false);
  //   //   } else {
  //   //     setFormValid(true);
  //   //   }
  //   // } else
  //   if (
  //     showPage !== "DNIQ" &&
  //     showPage !== "CNIQ" &&
  //     showPage !== "DNPF" &&
  //     showPage !== "CCD" &&
  //     showPage !== "CPT"
  //   ) {
  //     if (CDConfirmation) {
  //       setFormValid(false);
  //     } else {
  //       setFormValid(true);
  //     }
  //   }
  // }, [
  //   printerProcess,
  //   pantone,
  //   substrateData,
  //   printTrailNeeded,
  //   checked,
  //   CDConfirmation,
  //   setFormValid,
  // ]);

  const DesignHeader = (di_name) => {
    return (
      <>
        <div
          style={{
            marginLeft: 25,
          }}
          className="font-color"
        >
          {!di_name
            ? jobName === "IQ_"
              ? `${jobName}Pantone_Printer_Brand_Category_Project name_Additional info`
              : `${jobName}_Printer_Printing Process_Substrate_Brand_Category_Project name_Additional info`
            : di_name}
        </div>
        <img
          src={deleteIcon}
          alt="filter logo"
          onClick={() =>
            checkReadWriteAccess &&
            showPage !== "CNIQ" &&
            showPage !== "CCD" &&
            showPage !== "CPT" &&
            data?.Task_Status !== "Complete" &&
            handleDelete(index)
          }
          className={`delete-icons ${
            ((data?.Task_Status === "Complete" && showPage === "CCD") ||
              showPage === "CPT") &&
            "disabled-add"
          }`}
          disabled={
            !checkReadWriteAccess ||
            showPage === "CNIQ" ||
            showPage === "CCD" ||
            showPage === "CPT" ||
            data?.Task_Status === "Complete"
          }
        />
      </>
    );
  };

  let di_name;

  if (
    printerProcess ||
    pantone ||
    printers ||
    substrateData ||
    printers ||
    Artwork_Category ||
    Artwork_Brand
  ) {
    let selectedPrinter = [];
    printers.forEach((val) => {
      PrinterList.forEach((pl) => {
        if (pl.Code === val) {
          selectedPrinter.push(pl.Printer);
        }
      });
    });
    di_name =
      jobName +
      (jobName === "IQ_" ? (pantone ? pantone + "_" : "Pantone" + "_") : "") +
      (selectedPrinter.length
        ? selectedPrinter.join(", ") + "_"
        : "Printer" + "_") +
      (jobName !== "IQ_"
        ? printerProcess
          ? printerProcess + "_"
          : "Printing Process" + "_"
        : "") +
      (jobName !== "IQ_"
        ? substrateData
          ? substrateData + "_"
          : "Substrate" + "_"
        : "") +
      (Artwork_Brand ? Art_Brand.join(", ") : "Brand") +
      "_" +
      (Artwork_Category ? Art_Category.join(", ") : "Category") +
      "_" +
      Project_Name +
      "_" +
      (additionalInformation ? additionalInformation : "Additional info");
  }
  const searchFilters = (query, printerProcessList, setFilteredItems) => {
    let _filteredItems = [];

    for (let i = 0; i < printerProcessList.length; i++) {
      let item = printerProcessList[i];
      if (item.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }
    setFilteredItems(_filteredItems);
  };

  const searchPantoneFilters = (
    query,
    pantoneList,
    setFilteredPantoneItems
  ) => {
    let _filteredItems = [];

    for (let i = 0; i < pantoneList.length; i++) {
      let item = pantoneList[i];
      if (item.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }
    setFilteredPantoneItems(_filteredItems);
  };

  const customBase64Uploader = async (event) => {
    // convert file to base64 encoded
    const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    reader.readAsDataURL(blob);

    reader.onloadend = function () {
      const base64data = reader.result;
    };
  };

  return (
    <div>
      <div className="design-intent-header ">{DesignHeader(di_name)}</div>
      <Row
        style={{
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 25,
          marginTop: 25,
        }}
        className="label-header"
      >
        {(showPage === "DNPF" || showPage === "DNIQ") && (
          <Col sm={1}>
            <label htmlFor="select"> Select</label>
            <div>
              <Checkbox
                onChange={(e) => {
                  addData("Select", index, e.checked, di_name);
                  setChecked(e.checked);
                }}
                checked={checked}
                className="margin-right"
                disabled={
                  !checkReadWriteAccess ||
                  disabled ||
                  data.Task_Status === "Complete"
                }
              ></Checkbox>
            </div>
          </Col>
        )}
        <Col sm={2}>
          <div>
            <label htmlFor="cluster">
              Printer{" "}
              {showPage === "DNIQ" || showPage === "CNIQ" ? <sup> *</sup> : ""}
            </label>
            <MultiSelect
              id="printers"
              value={printers}
              onChange={(e) => {
                console.log(e.value);
                let selectedPrinter = [];
                e.value.forEach((val) => {
                  PrinterList.forEach((pl) => {
                    if (pl.Code === val) {
                      selectedPrinter.push(pl);
                    }
                  });
                });
                console.log("selectedPrinter: ", selectedPrinter);
                addData("Printer", index, selectedPrinter, di_name);
                setPrinters(e.value);
              }}
              options={
                PrinterList
                  ? PrinterList.map((obj) => ({
                      label: obj.Printer,
                      value: obj.Code,
                    }))
                  : []
              }
              optionLabel="label"
              filter
              aria-describedby="agency-help"
              disabled={
                (!checkReadWriteAccess ||
                  showPage === "CCD" ||
                  showPage === "CPT" ||
                  showPage === "CNIQ" ||
                  data.Task_Status === "Complete") &&
                true
              }
              placeholder="Select Printer"
            />
          </div>
        </Col>
        {showPage !== "DNIQ" && showPage !== "CNIQ" && (
          <Col sm={2}>
            <div>
              <label htmlFor="agency">
                Printing Process <sup> *</sup>
              </label>
              <AutoComplete
                id="printer"
                value={printerProcess}
                suggestions={filteredItems}
                completeMethod={(e) =>
                  searchFilters(e.query, PrinterProcessList, setFilteredItems)
                }
                dropdown
                placeholder="Search Printing Process"
                onChange={(e) => {
                  addData("Printing_Process", index, e.target.value, di_name);
                  setPrinterProcess(e.target.value);
                }}
                aria-describedby="cluster-help"
                disabled={
                  (!checkReadWriteAccess ||
                    showPage === "CCD" ||
                    showPage === "CPT" ||
                    data.Task_Status === "Complete") &&
                  true
                }
              />
            </div>
            {/* {(printers === "" || printers === undefined) && (
            <div className="error-text-di">Field Remaining</div>
          )} */}
          </Col>
        )}
        {showPage !== "DNIQ" && showPage !== "CNIQ" && (
          <Col sm={2}>
            <div>
              <label htmlFor="cluster">
                Substrate <sup> *</sup>{" "}
              </label>
              <AutoComplete
                id="substrate"
                value={substrateData}
                suggestions={filteredItems}
                completeMethod={(e) =>
                  searchFilters(e.query, SubstrateList, setFilteredItems)
                }
                dropdown
                placeholder="Search user"
                onChange={(e) => {
                  addData("Substrate", index, e.target.value, di_name);
                  setSubstarteData(e.target.value);
                }}
                aria-describedby="cluster-help"
                disabled={
                  (!checkReadWriteAccess ||
                    showPage === "CCD" ||
                    showPage === "CPT" ||
                    data.Task_Status === "Complete") &&
                  true
                }
              />
            </div>
            {/* {(substrateData === "" || substrateData === undefined) && (
            <span className="error-text-di">Field Remaining</span>
          )} */}
          </Col>
        )}
        {(showPage === "DNIQ" || showPage === "CNIQ") && (
          <Col sm={2}>
            <div>
              <label htmlFor="agency">Pantone</label>
              <div>
                <InputText
                  id="pantone"
                  value={pantone}
                  placeholder="Enter Pantone"
                  onChange={(e) => {
                    addData("Pantone", index, e.target.value, di_name);
                    setPantone(e.target.value);
                  }}
                  aria-describedby="pantone-help"
                  disabled={
                    !checkReadWriteAccess ||
                    (showPage === "CNIQ" && true) ||
                    data.Task_Status === "Complete"
                  }
                />
              </div>
            </div>
          </Col>
        )}
        <Col sm={2}>
          <Row>
            <label htmlFor="additional">Additional Info </label>
            <Col>
              <div>
                <InputText
                  id="additional"
                  value={additionalInformation}
                  onChange={(e) => {
                    addData("Additional_Info", index, e.target.value, di_name);
                    setAdditionalInfo(e.target.value);
                  }}
                  aria-describedby="info-help"
                  disabled={
                    (!checkReadWriteAccess ||
                      showPage === "CCD" ||
                      showPage === "CPT" ||
                      showPage === "CNIQ" ||
                      data.Task_Status === "Complete") &&
                    true
                  }
                />
              </div>
            </Col>
          </Row>
        </Col>
        {((showPage !== "DNIQ" && showPage !== "CNIQ") ||
          (showPage === "DNPF" && printTrailNeeded)) && (
          <Col sm={2}>
            <div>
              {(showPage === "DNPF" || printTrailNeeded) && (
                <div className="print-trial">
                  <div>
                    <Checkbox
                      onChange={(e) => {
                        addData(
                          "Print_Trial_Needed",
                          index,
                          e.checked,
                          di_name
                        );
                        setPrintTrailNeeded(e.checked);
                        // e.checked && setFormValid(false);
                      }}
                      checked={event === "submit" ? true : printTrailNeeded}
                      disabled={
                        (!checkReadWriteAccess ||
                          showPage === "CCD" ||
                          showPage === "CPT" ||
                          data.Task_Status === "Complete") &&
                        true
                      }
                      className={
                        (!checkReadWriteAccess ||
                          showPage === "CCD" ||
                          showPage === "CPT" ||
                          data.Task_Status === "Complete") &&
                        "disabled-text"
                      }
                    ></Checkbox>
                  </div>
                  <label
                    htmlFor="printTrailNeeded"
                    className={
                      (!checkReadWriteAccess ||
                        showPage === "CCD" ||
                        showPage === "CPT" ||
                        data.Task_Status === "Complete") &&
                      "disabled-text"
                    }
                  >
                    Print Trial Needed
                  </label>
                </div>
              )}
              {(showPage === "CCD" || showPage === "CPT") && (
                <>
                  <div className="print-trial">
                    <div>
                      <Checkbox
                        onChange={(e) => {
                          addData("CD_Approved", index, e.checked, di_name);
                          setCDConfirmation(e.checked);
                          setPrintTrailDone(false);
                        }}
                        checked={event === "submit" ? true : CDConfirmation}
                        className="margin-right"
                        disabled={
                          (!checkReadWriteAccess ||
                            showPage === "CPT" ||
                            data.Task_Status === "Complete") &&
                          true
                        }
                      ></Checkbox>
                    </div>

                    <label
                      htmlFor="printTrailNeeded"
                      className={
                        (!checkReadWriteAccess ||
                          showPage === "CPT" ||
                          data.Task_Status === "Complete") &&
                        "disabled-text"
                      }
                    >
                      CD Approved
                    </label>
                  </div>
                  {printTrailNeeded && (
                    <div className="print-trial">
                      <div>
                        <Checkbox
                          onChange={(e) => {
                            addData(
                              "Print_Trial_Done",
                              index,
                              e.checked,
                              di_name
                            );
                            setPrintTrailDone(e.checked);
                            // showPage === "CPT" &&
                            //   e.checked &&
                            //   setFormValid(false);
                          }}
                          checked={event === "submit" ? true : printTrailDone}
                          className="margin-right"
                          disabled={
                            !checkReadWriteAccess ||
                            showPage === "CCD" ||
                            (showPage === "CPT" && !CDConfirmation) ||
                            data.Task_Status === "Complete"
                          }
                        ></Checkbox>
                      </div>

                      <label
                        htmlFor="printTrailDone"
                        className={
                          !checkReadWriteAccess ||
                          showPage === "CCD" ||
                          (showPage === "CPT" && !CDConfirmation) ||
                          data.Task_Status === "Complete"
                            ? "disabled-text"
                            : "enabled-text"
                        }
                      >
                        Print Trial Done
                      </label>
                    </div>
                  )}
                </>
              )}
            </div>
          </Col>
        )}
        {/* {(showPage === "DNPF" || showPage === "DNIQ") && (
          <Col sm={1}>
            <label htmlFor="select"> Select</label>
            <div>
              <Checkbox
                onChange={(e) => {
                  addData("Select", index, e.checked, di_name);
                  setChecked(e.checked);
                }}
                checked={event === "submit" ? true : checked}
                className="margin-right"
                disabled={!checkReadWriteAccess || disabled}
              ></Checkbox>
            </div>
          </Col>
        )} */}

        {showPage === "CNIQ" && (
          <Col sm={3}>
            <div>
              <Checkbox
                onChange={(e) => {
                  addIddData("IDDSampleApproved", e.checked, di_name);
                  setIddsaChecked(e.checked);
                  if (!e.checked) {
                    addIddData(
                      "IDDSampleLabTestApproved",
                      index,
                      false,
                      di_name
                    );
                    setIddsltaChecked(false);
                  }
                }}
                checked={event === "submit" ? true : iddsaChecked}
                className="margin-right"
                disabled={
                  !checkReadWriteAccess || data.Task_Status === "Complete"
                }
              ></Checkbox>
              <label
                htmlFor="iddsa"
                className={
                  (!checkReadWriteAccess || data.Task_Status === "Complete") &&
                  "disabled-text"
                }
              >
                {" "}
                IDD Sample Approved
              </label>
            </div>
            <div>
              <Checkbox
                onChange={(e) => {
                  addIddData("IDDSampleLabTestApproved", e.checked, di_name);
                  setIddsltaChecked(e.checked);
                }}
                checked={event === "submit" ? true : iddsltaChecked}
                className="margin-right"
                disabled={
                  !checkReadWriteAccess ||
                  !iddsaChecked ||
                  data.Task_Status === "Complete"
                }
              ></Checkbox>
              <label
                htmlFor="iddslta"
                className={
                  (!checkReadWriteAccess || data.Task_Status === "Complete") &&
                  "disabled-text"
                }
              >
                {" "}
                IDD Sample Lab Test Approved
              </label>
            </div>
          </Col>
        )}

        {/* {(showPage === "CCD" || showPage === "CPT" || showPage === "CNIQ") && (
          <Col sm={2}>
            <div>
              <label htmlFor="select"> Upload File</label>

              <div>
                <FileUpload
                  name="demo[]"
                  accept="image/*"
                  maxFileSize={1000000}
                  emptyTemplate={<p className="m-0"></p>}
                />
              </div>
            </div>
          </Col>
        )} */}

        {(showPage === "CNIQ" || showPage === "CCD" || showPage === "CPT") && (
          <UploadFile
            {...data}
            upload={true}
            setformattedValue={setformattedValue}
            setAzureFile={setAzureFile}
            setFileName={setFileName}
            item={item}
            data={data}
            jobName={jobName}
            fileName={fileName}
            designData={showPage === "CNIQ" ? IQ : CD}
            date={date}
            version={version}
            disabled={!checkReadWriteAccess || data.Task_Status === "Complete"}
            // ArtworkAgilityPage={TaskDetailsData?.ArtworkAgilityPage}
            // version={version}
          />
        )}
      </Row>
    </div>
  );
};

export default CloneJobs;
