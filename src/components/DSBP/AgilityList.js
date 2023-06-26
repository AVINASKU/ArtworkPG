import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
// import filter from "../../../assets/images/filter.svg";
import filter from "../../assets/images/filter.svg";
import DSBPFilter from "./DSBPFilter";
import "../Projects/MyProjects/index.scss";
import DsbpCommonPopup from "./DsbpCommonPopup";
import DsbpRejectDialog from "./RejectDialog";
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
  onActionSubmit
}) => {
  const [selectedColumnName, setSelectedColumnName] = useState(null);
  const columnName = [
    "DSBP_InitiativeID",
    "DSBP_IL",
    "DSBP_PMP_PIMaterialID",
    "DSBP_PO_PMP_poPoa",
    "DSBP_PO_PMP_poMaterialNumber",
    "AWM_AddedToProject",
    "DSBP_PO_PMP_poLanguages",
    "DSBP_PMP_regulatoryStickeringCos",
    "DSBP_PMP_PIMaterialDescription",
    "DSBP_InitiativeState",
    "DSBP_PO_PMP_poPoaApprovedCountries",
    "POA #",
    "POAA Creation Status",
    "Rejection reason",
    "RTA Rejection Reason",
    "Assign a Tagging",
    "Assembly Mech",
    "Artwork Reference Material",
    "AISE",
    "Biocide",
    "Brand",
    "Product Form/Sub Brand",
    "PO Flavor/Scent",
    "Ref COS",
    "PO Languages",
    "PO POA #",
    "PO FPC",
    "PO FPC DESC",
  ];
  const op = useRef(null);
  
  const [rejectDialog, setRejectDialog] = useState(false);
  const [rejectionData, setRejectionData] = useState(false);
  const [rejectFormData, setRejectFormData] = useState({});

  const addToProjectList = [
      { name: 'Yes', code: 'Yes' },
      { name: 'No', code: 'No' },
      { name: 'Reject', code: 'Reject' }
  ];


  const onchangeAddToProject = (rowData, e, ele) => {
    console.log("hi",rowData, "data", e.target.value, "rowdata", rowData[ele]);
    rowData[ele] = e.target.value;
    console.log("dsbpPmpData", dsbpPmpData);
    setDsbpPmpData([...dsbpPmpData]);
    setRejectionData(rowData);
    if(e.target.value === "Reject")
      setRejectDialog(true);
      setRejectFormData({})
  }

  const addBody = (options, rowData) => {
    let field = rowData.field;
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
        
        {field === "AWM_AddedToProject" && (
          <div className="d-flex">
            <Form.Group
              className={`mb-2`}
              controlId="groupName.ControlInput1"
            >
              <div>
                <Form.Select
                  placeholder="Select"
                  onChange={(e) => onchangeAddToProject(options, e, field)}
                >
                  <option value="">Select</option>
                  {addToProjectList.map((data) => (
                    <option
                      key={data.code}
                      value={data.name}
                    >
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

  const projectNameOnClick = (e, options) => {
    op.current.toggle(e);
    setSelectedColumnName(options);
  };

  const renderHeader = (field, isFilterActivated = false) => {
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
        {field}
      </span>
    );
  };

  const renderColumns = () => {
    if (columnName && columnName.length) {
      return columnName.map((field, index) => {
        return (
          <Column
            field={field}
            header={() => renderHeader(field)}
            body={addBody}
            key={field}
            columnKey={field}
            showFilterMenu={false}
            alignFrozen="left"
            filterField={field}
            style={{
              width: "100px",
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
          onSubmit={() => onActionSubmit(rejectFormData, rejectionData)}
          >
             <DsbpRejectDialog
              rejectionData= {rejectionData}
              rejectFormData={rejectFormData}
              setRejectFormData={setRejectFormData}
            />
          </DsbpCommonPopup>
      )}
    </>
  );
};

export default AgilityList;
