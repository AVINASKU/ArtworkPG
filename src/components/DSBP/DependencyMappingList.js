import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import filter from "../../assets/images/filter.svg";
import { Form } from "react-bootstrap";
import { MultiSelect } from "primereact/multiselect";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { DMTabValuesAction } from "../../store/actions/DMTabValuesActions";

const DependencyMappingList = ({
  dependencyMappingData,
  dependencyColumnNames,
  CDPTPageData,
  IQData,
  RDTData,
  GABriefData,
  updateDropDownData,
  userHasAccess,
}) => {
  // console.log("CDPTPageData", CDPTPageData);

  // CDPTPageData, IQData, RDTData
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dmTabValuesData } = useSelector((state) => state.DMTabValuesReducer);
  const [tabsList, setTabsList] = useState([
    { tabHeader: "Header 1", decription: "Header 1 data" },
  ]);

  const cicNeededOptionList = [
    { name: "Yes", code: "Yes" },
    { name: "No", code: "No" },
    { name: "N/A", code: "N/A" },
  ];

  const onHandlePmpTabView = (options, field) => {
    const selectedTab = {
      tabHeader: options[field],
      description: options,
    };

    let updatedTabsList = [];
    if (
      tabsList.some(
        (tab) => JSON.stringify(tab) === JSON.stringify(selectedTab)
      )
    ) {
      // selectedTab is already present
    } else {
      updatedTabsList = [...tabsList, selectedTab];
    }

    const newArray = Array.isArray(dmTabValuesData)
      ? [...dmTabValuesData, ...updatedTabsList]
      : updatedTabsList;

    const uniqueArray = Array.from(
      new Set(newArray.map((obj) => JSON.stringify(obj)))
    ).map(JSON.parse);

    // console.log("uniqueArray DM: ", uniqueArray);
    dispatch(DMTabValuesAction(uniqueArray));
    navigate("/DSBP/DMTab", { replace: true });
  };

  const renderHeader = (field) => {
    // console.log("field", field);
    if (field === "checkbox") {
      // Render checkbox in header
      return (
        <div className="flex align-items-center gap-2">
          <input
            type="checkbox"
            className="p-checkbox-box p-highlight"
            // checked={selectAllChecked}
            // onChange={handleSelectAll}
          />
        </div>
      );
    }
    return (
      <span key={field}>
        <img
          src={filter}
          key={field}
          alt="Column Filter"
          style={{ height: 14, paddingLeft: 5, paddingRight: 5 }}
          // onClick={(e) => projectNameOnClick(e, field)}
          // className={
          //   isFilterActivated
          //     ? "columnFilterIcon filter-color-change"
          //     : "columnFilterIcon"
          // }
        />
        {field}
      </span>
    );
  };

  const renderMappingBody = (options, rowData) => {
    let field = rowData.field;

    if(field === "AWM_RDT_Page"){
    console.log("options[field]", options[field]);
    }

    return (
      <span>
        {field === "field_0" && ( // Add this condition to render a checkbox
          <div className="flex align-items-center gap-2">
            <input
              type="checkbox"
              className="p-checkbox-box p-highlight"
              // checked={selected?.includes(options)}
              // onChange={() => handleSelect(options)}
            />
          </div>
        )}
        {field === "AWM_GA_Brief" && (
          <div>
            <MultiSelect
              value={options[field]}
               onChange={(e) =>  updateDropDownData(
                  e.value,
                  "AWM_GA_Brief",
                  options.DSBP_PMP_PIMaterialID
                )}
              options={
                GABriefData
                  ? GABriefData.map((obj) => ({
                      label: obj.File_Name,
                      value: obj.File_Name,
                    }))
                  : []
              }
              filter
              placeholder={`Select filename`}
              maxSelectedLabels={3}
              className="p-column-filter"
            />
          </div>
        )}

        {field === "AWM_CDPT_Page" && (
          <div>
            <MultiSelect
              value={options[field]}
              onChange={(e) =>  updateDropDownData(
                  e.value,
                  "AWM_RDT_Page",
                  options.DSBP_PMP_PIMaterialID
                )}
              options={
                CDPTPageData
                  ? CDPTPageData.map((obj) => ({
                      label: obj.AWM_Design_Job_Name,
                      value: obj.AWM_Design_Job_ID,
                    }))
                  : []
              }
              filter
              placeholder={`Select AWM CDPT Page`}
              maxSelectedLabels={3}
              className="p-column-filter"
            />
          </div>
        )}

        {field === "AWM_RDT_Page" && (
          <div>
            <MultiSelect
              value={options[field]}
              onChange={(e) =>  updateDropDownData(
                  e.value,
                  "AWM_RDT_Page",
                  options.DSBP_PMP_PIMaterialID
                )}
              options={
                RDTData
                  ? RDTData.map((obj) => ({
                      label: obj.AWM_Design_Job_Name,
                      value: obj.AWM_Design_Job_ID,
                    }))
                  : []
              }
              filter
              placeholder={`Select AWM RDT Page`}
              maxSelectedLabels={3}
              className="p-column-filter"
            />
          </div>
        )}
        {field === "AWM_IQ_Page" && (
          <div>
            <MultiSelect
              value={options[field]}
               onChange={(e) =>  updateDropDownData(
                  e.value,
                  "AWM_IQ_Page",
                  options.DSBP_PMP_PIMaterialID
                )}
              options={
                IQData
                  ? IQData.map((obj) => ({
                      label: obj.AWM_Design_Job_Name,
                      value: obj.AWM_Design_Job_ID,
                    }))
                  : []
              }
              filter
              placeholder={`Select AWM IQ Page`}
              maxSelectedLabels={3}
              className="p-column-filter"
            />
          </div>
        )}
        {field === "AWM_CIC_Needed" && (
          <Form.Group
            controlId="groupName.ControlInput1"
            style={{ textAlign: "-webkit-center" }}
          >
            <Form.Select
              placeholder="Select"
              value={options[field]}
              onChange={(e) =>
                updateDropDownData(
                  e.target.value,
                  "AWM_CIC_Needed",
                  options.DSBP_PMP_PIMaterialID
                )
              }
              style={{ width: "80%", fontSize: 12 }}
            >
              <option value="">Select</option>
              {cicNeededOptionList?.map((data) => (
                <option key={data.code} value={data.name}>
                  {data.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
        {field === "AWM_Other_Reference" && (
        options.AWM_CIC_Needed === "" || !options.AWM_CIC_Needed ? " ":
          <Form.Group
            controlId="groupName.ControlInput1"
            style={{ textAlign: "-webkit-center" }}
          >
            <Form.Control
              type="number"
              maxLength={8}
              value={options[field]}
              onChange={(e) =>
                updateDropDownData(
                  e.target.value,
                  "AWM_Other_Reference",
                  options.DSBP_PMP_PIMaterialID
                )
              }
              disabled={
                options.AWM_CIC_Needed === "Yes" ||
                options.AWM_CIC_Needed === "No"
              }
              style={{ width: "80%", fontSize: 12 }}
            ></Form.Control>
          </Form.Group>
        )}

        {field === "AWM_Supporting_PMP_Design" && (
        options.AWM_CIC_Needed === "" || !options.AWM_CIC_Needed ? " ":
          <Form.Group
            controlId="groupName.ControlInput1"
            style={{ textAlign: "-webkit-center" }}
          >
            <Form.Select
              placeholder="Select"
              value={options[field]}
              onChange={(e) =>
                updateDropDownData(
                  e.target.value,
                  "AWM_Supporting_PMP_Design",
                  options.DSBP_PMP_PIMaterialID
                )
              }
              disabled={options.AWM_CIC_Needed === "Yes" || options.AWM_CIC_Needed === "N/A"}
              style={{ width: "80%", fontSize: 12 }}
            >
              <option value="">Select</option>
              <option value="">Select</option>
              <option value="123">123</option>
              <option value="456">456</option>
              <option value="789">789</option>
            </Form.Select>
          </Form.Group>
        )}

        {field === "AWM_Supporting_PMP_Layout" && (
        options.AWM_CIC_Needed === "" || !options.AWM_CIC_Needed ? " ":
          <Form.Group
            controlId="groupName.ControlInput1"
            style={{ textAlign: "-webkit-center" }}
          >
            <Form.Select
              placeholder="Select"
              value={options[field]}
              onChange={(e) =>
                updateDropDownData(
                  e.target.value,
                  "AWM_Supporting_PMP_Layout",
                  options.DSBP_PMP_PIMaterialID
                )
              }
              disabled={options.AWM_CIC_Needed === "Yes"|| options.AWM_CIC_Needed === "N/A"}
              style={{ width: "80%", fontSize: 12 }}
            >
              <option value="">Select</option>
              <option value="8888">8888</option>
              <option value="999">9999</option>
              <option value="55555">55555</option>
            </Form.Select>
          </Form.Group>
        )}

        {field === "DSBP_PMP_PIMaterialNumber" && (
          <a
            className="tabView"
            disabled={userHasAccess}
            onClick={() => !userHasAccess && onHandlePmpTabView(options, field)}
          >
            {options[field]}
          </a>
        )}
        {field !== "AWM_CDPT_Page" &&
          field !== "AWM_CIC_Needed" &&
          field !== "AWM_RDT_Page" &&
          field !== "AWM_IQ_Page" &&
          field !== "AWM_Other_Reference" &&
          field !== "AWM_Supporting_PMP_Layout" &&
          field !== "AWM_Supporting_PMP_Design" &&
          field !== "DSBP_PMP_PIMaterialNumber" &&
          options[field]}
      </span>
    );
  };

  const dynamicColumns = () => {
    if (dependencyColumnNames && dependencyColumnNames.length) {
      return [
        <Column
          key="checkbox"
          body={renderMappingBody}
          frozen={true}
          columnKey="checkbox"
          header={() => renderHeader("checkbox")}
          style={{ width: "40px" }}
        />,
        ...dependencyColumnNames.map((col, index) => {
          // console.log("field col-----", col);
          return (
            <Column
              field={col.field}
              header={renderHeader(col.field)}
              // frozen={field.freeze}
              // className={field.freeze ? "font-bold" : ""}
              // bodyClassName={"change-bg-color"}
              headerClassName={
                col.group === 2 ? "header-pink-bg-color" : "blue-bg-color"
              }
              body={renderMappingBody}
              key={col.field}
              columnKey={col.field}
              showFilterMenu={false}
              alignFrozen="left"
              filterField={col.field}
              style={{
                // width: col.width,
                width:200,
                height: 30,
              }}
            />
          );
        }),
      ];
    }
  };

  const rowClassName = (rowData) => {
    let field = rowData.field;
    if (rowData.AWM_CIC_Needed === "Yes") {
      return "white-bg-color"; // class name for highlighted rows
    }
    return "pink-bg-color"; // default class name for other rows
  };

  return (
    <DataTable
      // dataKey="DSBP_PMP_PIMaterialID"
      value={dependencyMappingData}
      rowClassName={rowClassName}
      className="mt-3"
      responsiveLayout="scroll"
      columnResizeMode="expand"
      scrollable
      resizableColumns
      reorderableColumns
      tableStyle={{
        width: "max-content",
        minWidth: "100%",
      }}
    >
      {dynamicColumns()}
    </DataTable>
  );
};

export default DependencyMappingList;
