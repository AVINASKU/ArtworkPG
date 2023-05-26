import React, { useEffect, useState, useMemo } from "react";
import { InputText } from "primereact/inputtext";
import { Row, Col } from "react-bootstrap";
import { Checkbox } from "primereact/checkbox";
import deleteIcon from "../../../assets/images/deleteIcon.svg";
import { MultiSelect } from "primereact/multiselect";
import { FileUpload } from "primereact/fileupload";
import {
  SubstrateList,
  PrinterList,
  PrinterProcessList,
  PantoneList,
} from "../../../categories";
import { AutoComplete } from "primereact/autocomplete";
import { useLocation } from "react-router-dom";
import { isArray, isString } from "lodash";
import UploadFile from "./UploadFile";
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
    PrintTrail,
    CDConfirmed,
    PTConfirmed,
  } = item;
  const IDDSampleApproved = data?.IDDSampleApproved || false;
  const IDDSampleLabTestApproved = data?.IDDSampleLabTestApproved || false;
  const location = useLocation();
  const [checked, setChecked] = useState(false);
  const [iddsaChecked, setIddsaChecked] = useState(IDDSampleApproved);
  const [iddsltaChecked, setIddsltaChecked] = useState(
    IDDSampleLabTestApproved
  );

  const [printTrailNeeded, setPrintTrailNeeded] = useState(false);
  const [CDConfirmation, setCDConfirmation] = useState(false);
  const [printTrailDone, setPrintTrailDone] = useState(false);
  const [printerProcess, setPrinterProcess] = useState(Printing_Process);
  const [pantone, setPantone] = useState(Pantone);
  const [substrateData, setSubstarteData] = useState(Substrate);
  const [printers, setPrinters] = useState(
    isArray(Printer)
      ? Printer
      : isString(Printer) && (Printer === "" ? [] : [Printer])
  );
  // const [printers, setPrinters] = useState(Printer);
  const [additionalInformation, setAdditionalInfo] = useState(Additional_Info);
  const [filteredItems, setFilteredItems] = useState(null);
  const [filteredPantoneItems, setFilteredPantoneItems] = useState(null);

  const locationPath = location?.pathname;
  const url = locationPath?.split("/");
  const pathName = url[2];
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
  }, [Select]);

  useEffect(() => {
    setIddsaChecked(IDDSampleApproved);
  }, [IDDSampleApproved]);

  useEffect(() => {
    setIddsltaChecked(IDDSampleLabTestApproved);
  }, [IDDSampleLabTestApproved]);

  useEffect(() => {
    setPrintTrailNeeded(PrintTrail);
    setCDConfirmation(CDConfirmed);
    setPrintTrailDone(PTConfirmed);
  }, [PrintTrail, CDConfirmed, PTConfirmed]);

  useEffect(() => {
    if (showPage === "CCD" || showPage === "CPT") {
      if (printerProcess && substrateData && printTrailNeeded && checked) {
        setFormValid(false);
      } else {
        setFormValid(true);
      }
    } else if (showPage !== "DNIQ" && showPage !== "CNIQ") {
      if (CDConfirmation) {
        setFormValid(false);
      } else {
        setFormValid(true);
      }
    }
  }, [
    printerProcess,
    pantone,
    substrateData,
    printTrailNeeded,
    checked,
    CDConfirmation,
    setFormValid,
  ]);

  const DesignHeader = (di_name) => {
    return (
      <>
        <div
          style={{
            marginLeft: 20,
          }}
          className="font-color"
        >
          {!di_name
            ? jobName === "IQ_"
              ? `${jobName}Printer_Pantone_Brand_Category_Project name_Additional info`
              : `${jobName}_Printer_Printing Process_Substrate_Brand_Category_Project name_Additional info`
            : di_name}
        </div>
        <img
          src={deleteIcon}
          alt="filter logo"
          onClick={() => showPage !== "CNIQ" && handleDelete(index)}
          className={`delete-icons ${
            showPage === "CCD" || (showPage === "CPT" && "disabled-add")
          }`}
          disabled={showPage === "CNIQ"}
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
    di_name =
      jobName +
      (printers ? printers + "_" : "Printer" + "_") +
      (jobName === "IQ_" ? (pantone ? pantone + "_" : "Pantone" + "_") : "") +
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
      (Artwork_Brand ? Artwork_Brand?.map((obj) => obj) : "Brand" + "_") +
      (Artwork_Category
        ? Artwork_Category?.map((obj) => obj)
        : "Category" + "_") +
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
          marginBottom: 15,
          marginTop: 5,
        }}
        className="label-header"
      >
        <Col sm={2}>
          <div>
            <label htmlFor="cluster">Printer </label>
            <MultiSelect
              id="printers"
              value={printers}
              onChange={(e) => {
                addData("Printer", index, e.value, di_name);
                setPrinters(e.value);
              }}
              options={
                PrinterList
                  ? PrinterList.map((obj) => ({ label: obj, value: obj }))
                  : []
              }
              optionLabel="label"
              filter
              aria-describedby="agency-help"
              disabled={
                (showPage === "CCD" ||
                  showPage === "CPT" ||
                  showPage === "CNIQ") &&
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
                Printer Process <sup> *</sup>
              </label>
              <AutoComplete
                id="printer"
                value={printerProcess}
                suggestions={filteredItems}
                completeMethod={(e) =>
                  searchFilters(e.query, PrinterProcessList, setFilteredItems)
                }
                dropdown
                placeholder="Search Printer Process"
                onChange={(e) => {
                  addData("Printer_Process", index, e.target.value, di_name);
                  setPrinterProcess(e.target.value);
                }}
                aria-describedby="cluster-help"
                disabled={(showPage === "CCD" || showPage === "CPT") && true}
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
                disabled={(showPage === "CCD" || showPage === "CPT") && true}
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
              <AutoComplete
                id="pantone"
                value={pantone}
                suggestions={filteredPantoneItems}
                completeMethod={(e) =>
                  searchPantoneFilters(
                    e.query,
                    PantoneList,
                    setFilteredPantoneItems
                  )
                }
                dropdown
                placeholder="Search Pantone"
                onChange={(e) => {
                  addData("Pantone", index, e.target.value, di_name);
                  setPantone(e.target.value);
                }}
                aria-describedby="cluster-help"
                disabled={showPage === "CNIQ" && true}
              />
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
                    (showPage === "CCD" ||
                      showPage === "CPT" ||
                      showPage === "CNIQ") &&
                    true
                  }
                />
              </div>
            </Col>
          </Row>
        </Col>
        {showPage !== "DNIQ" && showPage !== "CNIQ" && (
          <Col sm={2}>
            <div>
              <div className="print-trial">
                <div>
                  <Checkbox
                    onChange={(e) => {
                      addData("printTrailNeeded", index, e.checked, di_name);
                      setPrintTrailNeeded(e.checked);
                      e.checked && setFormValid(false);
                    }}
                    checked={event === "submit" ? true : printTrailNeeded}
                    disabled={
                      (showPage === "CCD" || showPage === "CPT") && true
                    }
                    className={
                      (showPage === "CCD" || showPage === "CPT") &&
                      "disabled-text"
                    }
                  ></Checkbox>
                </div>
                <label
                  htmlFor="printTrailNeeded"
                  className={
                    (showPage === "CCD" || showPage === "CPT") &&
                    "disabled-text"
                  }
                >
                  Print Trail Needed
                </label>
              </div>
              {(showPage === "CCD" || showPage === "CPT") && (
                <>
                  <div className="print-trial">
                    <div>
                      <Checkbox
                        onChange={(e) => {
                          setCDConfirmation(e.checked);
                          setPrintTrailDone(false);
                        }}
                        checked={event === "submit" ? true : CDConfirmation}
                        className="margin-right"
                      ></Checkbox>
                    </div>

                    <label htmlFor="printTrailNeeded">CD Approved</label>
                  </div>
                  <div className="print-trial">
                    <div>
                      <Checkbox
                        onChange={(e) => {
                          setPrintTrailDone(e.checked);
                          (showPage === "CCD" || showPage === "CPT") &&
                            e.checked &&
                            setFormValid(false);
                        }}
                        checked={event === "submit" ? true : printTrailDone}
                        className="margin-right"
                        disabled={!CDConfirmation}
                      ></Checkbox>
                    </div>

                    <label
                      htmlFor="printTrailNeeded"
                      className={
                        !CDConfirmation ? "disabled-text" : "enabled-text"
                      }
                    >
                      Print Trial Done
                    </label>
                  </div>
                </>
              )}
            </div>
          </Col>
        )}
        {(showPage === "DNPF" || showPage === "DNIQ") && (
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
                disabled={disabled}
              ></Checkbox>
            </div>
          </Col>
        )}

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
                // disabled={disabled}
              ></Checkbox>
              <label htmlFor="iddsa"> IDD Sample Approved</label>
            </div>
            <div>
              <Checkbox
                onChange={(e) => {
                  addIddData("IDDSampleLabTestApproved", e.checked, di_name);
                  setIddsltaChecked(e.checked);
                }}
                checked={event === "submit" ? true : iddsltaChecked}
                className="margin-right"
                disabled={!formValid}
              ></Checkbox>
              <label htmlFor="iddslta"> IDD Sample Lab Test Approved</label>
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

        {showPage === "CNIQ" && (
          <UploadFile
            {...data}
            upload={true}
            setformattedValue={setformattedValue}
            setAzureFile={setAzureFile}
            setFileName={setFileName}
            item={item}
            data={data}
            jobName={jobName}
            // ArtworkAgilityPage={TaskDetailsData?.ArtworkAgilityPage}
            // version={version}
          />
        )}
      </Row>
    </div>
  );
};

export default CloneJobs;
