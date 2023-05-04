import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Row, Col } from "react-bootstrap";
import { Checkbox } from "primereact/checkbox";
import deleteIcon from "../../../assets/images/deleteIcon.svg";
import { MultiSelect } from "primereact/multiselect";
import {
  SubstrateList,
  PrinterList,
  PrinterProcessList,
} from "../../../categories";
import { AutoComplete } from "primereact/autocomplete";
const CloneJobs = ({
  index,
  brand,
  category,
  Project_Name,
  handleDelete,
  item,
  addData,
  roleName,
}) => {
  const {
    Printer_Process,
    Additional_Info,
    event,
    Select,
    Printer,
    Substrate,
    PrintTrail,
  } = item;

  const [checked, setChecked] = useState(false);
  const [printTrailNeeded, setPrintTrailNeeded] = useState(false);
  const [printerProcess, setPrinterProcess] = useState(Printer_Process);
  const [substrateData, setSubstarteData] = useState(Substrate);
  const [printers, setPrinters] = useState([]);
  const [additionalInformation, setAdditionalInfo] = useState(Additional_Info);
  const [filteredItems, setFilteredItems] = useState(null);
  useEffect(() => {
    setChecked(Select);
  }, [Select]);
  useEffect(() => {
    setPrintTrailNeeded(PrintTrail);
  }, [PrintTrail]);

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
          {/* {di_name} */}
          {!di_name ? `Design Intent ${index + 1}` : di_name}
        </div>
        <img
          src={deleteIcon}
          alt="filter logo"
          onClick={() => handleDelete(index)}
          className="header-icons"
          disabled={event === "submit" && true}
        />
      </>
    );
  };

  let di_name;

  if (printerProcess || printers || additionalInformation) {
    di_name =
      roleName +
      (printerProcess && printerProcess + "_") +
      brand +
      "_" +
      category +
      "_" +
      Project_Name +
      "_" +
      (printers && printers + "_") +
      (additionalInformation && additionalInformation);
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
  return (
    <div>
      <div className="design-intent-header">{DesignHeader(di_name)}</div>
      <Row
        style={{
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 15,
          marginTop: 5,
        }}
      >
        <Col sm={2}>
          <div>
            <label htmlFor="cluster">Printer * </label>
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
              disabled={event === "submit" && true}
            />
          </div>
        </Col>
        <Col sm={2}>
          <div>
            <label htmlFor="agency">Printer Process * </label>
            <MultiSelect
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
              disabled={event === "submit" && true}
              placeholder="Select Printer Process"
            />
          </div>
          {(Printer_Process === "" || Printer_Process === undefined) && (
            <div className="error-text-di">Field Remaining</div>
          )}
        </Col>
        <Col sm={2}>
          <div>
            <label htmlFor="cluster">Substrate * </label>
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
              disabled={event === "submit" && true}
            />
          </div>
          {(Substrate === "" || Substrate === undefined) && (
            <span className="error-text-di">Field Remaining</span>
          )}{" "}
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
              disabled={event === "submit" && true}
            />
          </div>
        </Col>
        <Col sm={3}>
          <label htmlFor="select"> Print Trail Needed</label>
          <div>
            <Checkbox
              onChange={(e) => {
                addData("Select", index, e.checked, di_name);
                setChecked(e.checked);
              }}
              checked={event === "submit" ? true : printTrailNeeded}
              className="margin-right"
              disabled={event === "submit" && true}
            ></Checkbox>
          </div>
        </Col>
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
              disabled={event === "submit" && true}
            ></Checkbox>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CloneJobs;
