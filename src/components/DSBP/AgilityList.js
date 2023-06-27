import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Form } from "react-bootstrap";
import { Column } from "primereact/column";
import filter from "../../assets/images/filter.svg";
import DSBPFilter from "./DSBPFilter";
import "../Projects/MyProjects/index.scss";
import DsbpCommonPopup from "./DsbpCommonPopup";
import DsbpRejectDialog from "./RejectDialog";
import DsbpActionDialog from "./DsbpActionDialog";
import { generateUniqueKey } from "../../utils";
import { onSortData } from "../../utils";

const AgilityList = ({
  selected,
  dsbpPmpData,
  setSelected,
  selectAllChecked,
  handleSelect,
  handleSelectAll,
  onSort,
  selectedFields,
  onGlobalFilterChange,
  filteredDsbpData,
  setDsbpPmpData,
  onActionSubmit,
  buWiseSortedColumnNames,
}) => {
  const [selectedColumnName, setSelectedColumnName] = useState(null);
  const op = useRef(null);

  const [rejectDialog, setRejectDialog] = useState(false);
  const [onChangeData, setOnChangeData] = useState(false);
  const [rejectFormData, setRejectFormData] = useState({});
  const [handleYesAddToPRoject, setHandleYesAddToPRoject] = useState(false);

  const addToProjectList = [
    { name: "Yes", code: "Yes" },
    { name: "No", code: "No" },
    { name: "Reject", code: "Reject" },
  ];

  const onchangeAddToProject = (rowData, e, ele) => {
    console.log("hi", rowData, "data", e.target.value, "rowdata", rowData[ele]);
    rowData[ele] = e.target.value;
    console.log("dsbpPmpData", dsbpPmpData);
    setDsbpPmpData([...dsbpPmpData]);
    setOnChangeData(rowData);
    if (e.target.value === "Reject") setRejectDialog(true);
    setRejectFormData({});
    if (e.target.value === "Yes") setHandleYesAddToPRoject(true)
  };

  const projectNameOnClick = (e, options) => {
    op.current.toggle(e);
    setSelectedColumnName(options);
  };

  const concatenatedFPCStagingFormula = (data) => {
    const concatenatedData = data.reduce((result, item) => {
      for (const key in item) {
        if (result.hasOwnProperty(key)) {
          result[key] += `,${item[key]}`;
        } else {
          result[key] = item[key];
        }
      }
      return result;
    }, {});
    return concatenatedData;
  };

  const addBody = (options, rowData) => {
    let field = rowData.field;
    let FPCStagingFormula =
      options?.FPCStagingPage?.[0]?.FormulaCardStagingPage;

    let concatenatedFPCStagingFormulaData = {};
    if (FPCStagingFormula && FPCStagingFormula.length) {
      concatenatedFPCStagingFormulaData =
        concatenatedFPCStagingFormula(FPCStagingFormula);
    }

    return (
      <>
        {field === "DSBP_InitiativeID" && (
          <div className="flex align-items-center gap-2">
            <input
              type="checkbox"
              className="p-checkbox-box p-highlight"
              checked={selected?.includes(options)}
              onChange={() => handleSelect(options)}
            />
            {options[field]}
          </div>
        )}
        {options?.FPCStagingPage?.[0][field]}
        {concatenatedFPCStagingFormulaData?.[field]}
        {field === "AWM_AddedToProject" && (
          <div className="d-flex">
            <Form.Group className={`mb-2`} controlId="groupName.ControlInput1">
              <div>
                <Form.Select
                  placeholder="Select"
                  onChange={(e) => onchangeAddToProject(options, e, field)}
                >
                  <option value="">Select</option>
                  {addToProjectList.map((data) => (
                    <option key={data.code} value={data.name}>
                      {data.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Form.Group>
          </div>
        )}
        {field !== "DSBP_InitiativeID" &&
          field !== "AWM_AddedToProject" &&
          options[field]}
      </>
    );
  };

  const renderHeader = (field, isFilterActivated = false) => {
  let splittedCol = field.split("_").join(" ");
    return (
      <span key={field}>
        {field === "DSBP_InitiativeID" && (
          <input
            type="checkbox"
            checked={selectAllChecked}
            onChange={handleSelectAll}
          />
        )}
        <img
          src={filter}
          key={field}
          alt="Column Filter"
          onClick={(e) => projectNameOnClick(e, field)}
          className={
            isFilterActivated
              ? "columnFilterIcon filter-color-change"
              : "columnFilterIcon"
          }
        />
        {splittedCol}
      </span>
    );
  };

  const renderColumns = () => {
    if (buWiseSortedColumnNames && buWiseSortedColumnNames.length) {
      return buWiseSortedColumnNames.map((field, index) => {
        return (
          <Column
            field={field.Field_Name}
            header={() => renderHeader(field.Field_Name)}
            body={addBody}
            key={field.Field_Name}
            columnKey={field.Field_Name}
            showFilterMenu={false}
            alignFrozen="left"
            filterField={field.Field_Name}
            style={{
              width: "250px",
            }}
          />
        );
      });
    }
  };
  return (
    <>
      <DSBPFilter
        op={op}
        onSort={onSort}
        selectedColumnName={selectedColumnName}
        dsbpPmpData={dsbpPmpData}
        selectedFields={selectedFields}
        onGlobalFilterChange={onGlobalFilterChange}
      />

      <DataTable
        dataKey="DSBP_PMP_PIMaterialID"
        scrollable
        resizableColumns
        // key={generateUniqueKey("artwork")}
        reorderableColumns
        responsiveLayout="scroll"
        columnResizeMode="expand"
        value={
          filteredDsbpData && filteredDsbpData.length
            ? filteredDsbpData
            : dsbpPmpData
        }
        className="mt-3"
        tableStyle={{ width: "max-content", minWidth: "100%" }}
        selection={selected}
        onSelectionChange={(e) => setSelected(e.value)}
      >
        {renderColumns()}
      </DataTable>
      {rejectDialog && (
        <DsbpCommonPopup
          actionHeader="Are you sure you want to reject this PMP?"
          dasbpDialog={rejectDialog}
          setDasbpDialog={setRejectDialog}
          rejectFormData={rejectFormData}
          onSubmit={() => onActionSubmit(rejectFormData, [onChangeData])}
        >
          <DsbpRejectDialog
            onChangeData={onChangeData}
            rejectFormData={rejectFormData}
            setRejectFormData={setRejectFormData}
          />
        </DsbpCommonPopup>
      )}
      {handleYesAddToPRoject && (
        <DsbpActionDialog
          actionHeader="Are you sure you want to add these PMP to Project ?"
          actionDialog={handleYesAddToPRoject}
          setActionDialog={setHandleYesAddToPRoject}
          onChangeData={onChangeData}
          rowData={onChangeData}
          onActionSubmit={onActionSubmit}
        />
      )}
    </>
  );
};

export default AgilityList;
