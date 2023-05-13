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
} from "../../../categories";
import { AutoComplete } from "primereact/autocomplete";
import { useLocation } from "react-router-dom";
const CloneJobs = ({
  index,
  Artwork_Brand,
  Artwork_Category,
  Project_Name,
  handleDelete,
  item,
  addData,
  jobName,
  disabled,
  setFormValid,
}) => {
  const {
    Printing_Process,
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
  const location = useLocation();
  const [checked, setChecked] = useState(false);
  const [printTrailNeeded, setPrintTrailNeeded] = useState(false);
  const [CDConfirmation, setCDConfirmation] = useState(false);
  const [printTrailDone, setPrintTrailDone] = useState(false);
  const [printerProcess, setPrinterProcess] = useState(Printing_Process);
  const [substrateData, setSubstarteData] = useState(Substrate);
  const [printers, setPrinters] = useState(Printer);
  const [additionalInformation, setAdditionalInfo] = useState(Additional_Info);
  const [filteredItems, setFilteredItems] = useState(null);
  const locationPath = location?.pathname;
  const url = locationPath?.split("/");
  const pathName = url[2];
  const disabledCPT = pathName === "CPT" ? true : false;
  useEffect(() => {
    setChecked(Select);
  }, [Select]);

  useEffect(() => {
    setPrintTrailNeeded(PrintTrail);
    setCDConfirmation(CDConfirmed);
    setPrintTrailDone(PTConfirmed);
  }, [PrintTrail, CDConfirmed, PTConfirmed]);

  useEffect(() => {
    if (!disabledCPT) {
      if (printerProcess && substrateData && printTrailNeeded && checked) {
        setFormValid(false);
      } else {
        setFormValid(true);
      }
    } else {
      if (CDConfirmation) {
        setFormValid(false);
      } else {
        setFormValid(true);
      }
    }
  }, [
    printerProcess,
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
            ? `CD_Printer_Printing Process_Substrate_Brand_Category_Project name_Additional info`
            : di_name}
        </div>
        <img
          src={deleteIcon}
          alt="filter logo"
          onClick={() => handleDelete(index)}
          className={`delete-icons ${disabledCPT && "disabled-add"}`}
          disabled={event === "submit" && disabled}
        />
      </>
    );
  };

  let di_name;

  if (
    printerProcess ||
    printers ||
    substrateData ||
    printers ||
    Artwork_Category ||
    Artwork_Brand
  ) {
    di_name =
      jobName +
      (printers ? printers + "_" : "Printer" + "_") +
      (printerProcess ? printerProcess + "_" : "Printing Process" + "_") +
      (substrateData ? substrateData + "_" : "Substrate" + "_") +
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
                addData("Printer_Process", index, e.value, di_name);
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
              disabled={disabledCPT}
              placeholder="Select Printer Process"
            />
          </div>
        </Col>
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
              placeholder="Search Printer"
              onChange={(e) => {
                addData("Printer", index, e.target.value, di_name);
                setPrinterProcess(e.target.value);
              }}
              aria-describedby="cluster-help"
              disabled={disabledCPT}
            />
          </div>
          {/* {(printers === "" || printers === undefined) && (
            <div className="error-text-di">Field Remaining</div>
          )} */}
        </Col>
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
              disabled={disabledCPT}
            />
          </div>
          {/* {(substrateData === "" || substrateData === undefined) && (
            <span className="error-text-di">Field Remaining</span>
          )} */}
        </Col>
        <Col sm={2}>
          <div>
            <label htmlFor="additional">Additional Info </label>
            <InputText
              id="additional"
              value={additionalInformation}
              onChange={(e) => {
                addData("Additional_Info", index, e.target.value, di_name);
                setAdditionalInfo(e.target.value);
              }}
              aria-describedby="info-help"
              disabled={disabledCPT}
            />
          </div>
        </Col>
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
                  disabled={disabledCPT}
                  className={disabledCPT && "disabled-text"}
                ></Checkbox>
              </div>
              <label
                htmlFor="printTrailNeeded"
                className={disabledCPT && "disabled-text"}
              >
                Print Trail Needed
              </label>
            </div>
            {disabledCPT && (
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
                        disabledCPT && e.checked && setFormValid(false);
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
        {!disabledCPT && (
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

        {disabledCPT && (
          <Col sm={1}>
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
        )}
      </Row>
    </div>
  );
};

export default CloneJobs;
