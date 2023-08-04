import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import filter from "../../assets/images/filter.svg";
import { Form } from "react-bootstrap";
import { MultiSelect } from "primereact/multiselect";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  DMTabValuesAction,
  DMTabAttributesAction,
} from "../../store/actions/DMTabValuesActions";
import toggleOff from "../../assets/images/toggleOff.svg";
import toggleOn from "../../assets/images/toggleOn.svg";
import DependencyFilter from "./DependencyFilter";
import { FilterMatchMode } from "primereact/api";

const DependencyMappingList = ({
  dependencyMappingData,
  CDPTPageData,
  IQData,
  RDTData,
  GABriefData,
  updateDropDownData,
  dropdownDataForLayoutAndDesign,
  userHasAccess,
  customizeViewFields,
  setCustomizeViewFields,
  onSort,
  onGlobalFilterChange,
  filteredDependencyMappingData,
  setFiltersDependencyMappingData,
  setDataUpdated,
  dataUpdated,
  selectedFields,
  setSelectedFields,
  setTableRender,
  tableRender,
  isSearch,
  columnNames,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const op = useRef(null);
  const { dmTabValuesData } = useSelector((state) => state.DMTabValuesReducer);
  const [selectedColumnName, setSelectedColumnName] = useState(null);
  const [frozenUpdated, setFrozenUpdated] = useState(false);
  const [tabsList, setTabsList] = useState([
    { tabHeader: "Header 1", decription: "Header 1 data" },
  ]);

  const cicNeededOptionList = [
    { name: "Yes", code: "Yes" },
    { name: "No", code: "No" },
    { name: "N/A", code: "N/A" },
  ];

  useEffect(() => {
    setCustomizeViewFields(customizeViewFields);
  }, [customizeViewFields]);
  
  const projectNameOnClick = (e, options) => {
    op.current.toggle(e);
    setSelectedColumnName(options);
  };

  const onHandlePmpTabView = (options, field) => {
    let dependencyColumnNames = JSON.parse(
      localStorage.getItem("setDependencyMappingColumnNames")
    );
    const attributesData = {
      DMColumnNames: dependencyColumnNames,
      DMMappingData: dependencyMappingData,
      RDTData: RDTData,
      CDPTPageData: CDPTPageData,
      IQData: IQData,
      cicNeededOptionList: cicNeededOptionList,
      SPMPDesignData: dropdownDataForLayoutAndDesign,
      SPMPLayoutData: dropdownDataForLayoutAndDesign,
      GABriefData: GABriefData,
    };
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

    console.log("###insideDependencyMappingList: ", uniqueArray);
    dispatch(DMTabValuesAction(uniqueArray));
    dispatch(DMTabAttributesAction(attributesData));
    navigate("/DSBP/tab/dependencyMapping", { replace: true });
  };

  const onColumnResizeEnd = (event) => {
    let columnWidth = [];
    let jsonColumnWidth = localStorage.getItem(
      "setDependencyMappingColumnNames"
    );
    if (jsonColumnWidth) {
      columnWidth = JSON.parse(jsonColumnWidth);
    }
    if (columnWidth) {
      columnWidth.map((list) => {
        if (event.column.props.field === list.field) {
          list.width = event.element.offsetWidth;
        }
      });
    }
    console.log("column width", columnWidth);
    localStorage.setItem(
      "setDependencyMappingColumnNames",
      JSON.stringify(columnWidth)
    );
    setDataUpdated(!dataUpdated);
    setTableRender(false);
  };

  const storeReorderedColumns = (e) => {
    let columnNames = [];
    // let jsonColumnNames = localStorage.getItem("columnWidthDSBPArtwork");
    let jsonColumnNames = localStorage.getItem(
      "setDependencyMappingColumnNames"
    );
    if (jsonColumnNames) {
      columnNames = JSON.parse(jsonColumnNames);
    }
    const shiftedArray = [...columnNames]; // Create a copy of the array
    // Find the index of the element to be shifted
    if (e?.dragIndex !== -1) {
      const [removed] = shiftedArray.splice(e?.dragIndex - 1, 1); // Remove the element from the array
      // shiftedArray.unshift(removed); // Place the removed element at the beginning of the array
      console.log("removed", removed, e?.dropIndex);
      shiftedArray.splice(e?.dropIndex - 1, 0, removed);
    }
    shiftedArray.map((ele, index) => {
      ele["Sequence"] = index;
      ele["reorder"] = true;
    });

    console.log("shifttedArray", shiftedArray);

    localStorage.setItem(
      "setDependencyMappingColumnNames",
      JSON.stringify(shiftedArray)
    );
    setDataUpdated(!dataUpdated);
    setTableRender(false);
  };

  const searchHeader = columnNames?.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: { value: null, matchMode: FilterMatchMode.CONTAINS },
    }),
    {}
  );

  const renderHeader = (field, col) => {
    let splittedCol = field.split("_").join(" ");
    let isFilterActivated =
      col?.width !== 250 ||
      col?.freeze === true ||
      col?.sortAtoZ === true ||
      col?.sortZtoA === true;

    if (field === "checkbox") {
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

  const renderMappingBody = (options, rowData) => {
    let field = rowData.field;
    if (field === "AWM_RDT_Page") {
     
    }
    return (
      <span>
        {field === "field_0" && ( // Add this condition to render a checkbox
          <div className="flex align-items-center gap-2">
            <input type="checkbox" className="p-checkbox-box p-highlight" />
          </div>
        )}
        {field === "AWM_GA_Brief" && (
          <div>
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
                    "AWM_GA_Brief",
                    options.DSBP_PMP_PIMaterialID
                  )
                }
                style={{ width: "80%", fontSize: 12 }}
              >
                <option value="">Select</option>

                {GABriefData?.map((data) => (
                  <option key={data.File_Name} value={data.File_Name}>
                    {data.File_Name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        )}

        {field === "AWM_CDPT_Page" && (
          <div>
            <MultiSelect
              value={options[field]}
              onChange={(e) =>
                updateDropDownData(
                  e.value,
                  "AWM_CDPT_Page",
                  options.DSBP_PMP_PIMaterialID
                )
              }
              options={
                CDPTPageData
                  ? CDPTPageData.map((obj) => ({
                      label: obj.AWM_Design_Job_Name,
                      value: obj.AWM_Design_Job_ID,
                      disabled: obj.AWM_Design_Job_Name === "N/A", // Add this line to disable the option
                    })).filter((option) => !option.disabled) // Filter out disabled options
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
              onChange={(e) =>
                updateDropDownData(
                  e.value,
                  "AWM_RDT_Page",
                  options.DSBP_PMP_PIMaterialID
                )
              }
              options={
                RDTData
                  ? RDTData.map((obj) => ({
                      label: obj.AWM_Design_Job_Name,
                      value: obj.AWM_Design_Job_ID
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
        {field === "AWM_CIC_Matrix" &&
          (options.AWM_CIC_Needed === "" ||
          !options.AWM_CIC_Needed ||
          options.AWM_CIC_Needed === "No" ||
          options.AWM_CIC_Needed === "N/A" ? (
            " "
          ) : (
            <div>
              <span
                className={
                  options[field] === true
                    ? "cic-matrix-text-on"
                    : "cic-matrix-text-off"
                }
              >
                CIC Matrix Only
              </span>
              <img
                src={options[field] === true ? toggleOn : toggleOff}
                className="add-new-design-intent-icon"
                alt="Add role button"
                onClick={(e) =>
                  updateDropDownData(
                    options[field] ? !options[field] : true,
                    "AWM_CIC_Matrix",
                    options.DSBP_PMP_PIMaterialID
                  )
                }
              />
              <span
                className={
                  options[field] === false
                    ? "cic-matrix-text-on"
                    : "cic-matrix-text-off"
                }
              >
                CIC Matrix & CIC's
              </span>
            </div>
          ))}

        {field === "AWM_IQ_Page" && (
          <div>
            <MultiSelect
              value={options[field]}
              onChange={(e) =>
                updateDropDownData(
                  e.value,
                  "AWM_IQ_Page",
                  options.DSBP_PMP_PIMaterialID
                )
              }
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
        {field === "AWM_Other_Reference" &&
          (options.AWM_CIC_Needed === "" ||
          !options.AWM_CIC_Needed ||
          options.AWM_CIC_Needed === "Yes" ||
          options.AWM_CIC_Needed === "No" ? (
            " "
          ) : (
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
                // disabled={
                //   options.AWM_CIC_Needed === "Yes" ||
                //   options.AWM_CIC_Needed === "No"
                // }
                style={{ width: "80%", fontSize: 12 }}
              ></Form.Control>
            </Form.Group>
          ))}

        {field === "AWM_Supporting_PMP_Design" &&
          (options.AWM_CIC_Needed === "" ||
          !options.AWM_CIC_Needed ||
          options.AWM_CIC_Needed === "Yes" ||
          options.AWM_CIC_Needed === "N/A" ? (
            " "
          ) : (
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
                // disabled={options.AWM_CIC_Needed === "Yes" || options.AWM_CIC_Needed === "N/A"}
                style={{ width: "80%", fontSize: 12 }}
              >
                <option value="">Select</option>
                {dropdownDataForLayoutAndDesign?.map((ele) => {
                  return (
                    <option key={ele} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          ))}

        {field === "AWM_Supporting_PMP_Layout" &&
          (options.AWM_CIC_Needed === "" ||
          !options.AWM_CIC_Needed ||
          options.AWM_CIC_Needed === "Yes" ||
          options.AWM_CIC_Needed === "N/A" ? (
            " "
          ) : (
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
                style={{ width: "80%", fontSize: 12 }}
              >
                <option value="">Select</option>
                {dropdownDataForLayoutAndDesign?.map((ele) => {
                  return (
                    <option key={ele} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          ))}

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
          field !== "AWM_GA_Brief" &&
          options[field]}
      </span>
    );
  };

  const dynamicColumns = () => {
    let dependencyColumnNames = JSON.parse(
      localStorage.getItem("setDependencyMappingColumnNames")
    );
    console.log("dependencyColumnNames", dependencyColumnNames);
    console.log("customizeViewFields", customizeViewFields);
    let jsonValue = customizeViewFields
      ? JSON.parse(customizeViewFields)
      : null;
      if (jsonValue && Object.keys(jsonValue).length !== 0){
        let selectedData = jsonValue?.selectedFields?.fieldsData || [];
        let freezedData = jsonValue?.freezedColumns?.fieldsData || [];
        const filteredColumns = [];
        // Add freezedData columns in the specified order
        freezedData?.forEach((fieldName) => {
          const column = dependencyColumnNames?.find((col) => col.field === fieldName);
          if (column) {
            column.freeze = true;
            filteredColumns.push(column);
          }
        });
        // Add selectedData columns in the specified order
        selectedData?.forEach((fieldName) => {
          const column = dependencyColumnNames?.find((col) => col.field === fieldName);
          if (column) {
            filteredColumns.push(column);
          }
        });
        console.log("filteredColumns", filteredColumns);
        if (filteredColumns && filteredColumns.length) {
          return [
            <Column
              key="checkbox"
              body={renderMappingBody}
              frozen={true}
              columnKey="checkbox"
              header={() => renderHeader("checkbox")}
              style={{ width: "40px" }}
            />,
            ...filteredColumns.map((col, index) => {
              // console.log("field col-----", col);
              return (
                <Column
                  field={col.field}
                  header={renderHeader(col.field, col)}
                  frozen={col.freeze}
                  className={col.freeze ? "font-bold" : ""}
                  // bodyClassName={"change-bg-color"}
                  headerClassName={
                    col.group === 2 ? "pink-bg-color" : "blue-bg-color"
                  }
                  body={renderMappingBody}
                  key={col.field}
                  columnKey={col.field}
                  showFilterMenu={false}
                  alignFrozen="left"
                  filterField={col.field}
                  style={{
                    // width: col.width,
                    width: 200,
                    height: 30,
                  }}
                />
              );
            }),
          ];
        }
      } else {
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
              header={renderHeader(col.field, col)}
              frozen={col.freeze}
              className={col.freeze ? "font-bold" : ""}
              // bodyClassName={"change-bg-color"}
              headerClassName={
                col.group === 2 ? "pink-bg-color" : "blue-bg-color"
              }
              body={renderMappingBody}
              key={col.field}
              columnKey={col.field}
              showFilterMenu={false}
              alignFrozen="left"
              filter
              filterPlaceholder={col?.field.split("_").join(" ")}
              filterField={col.field}
              style={{
                width: col.width,
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
    if (rowData.AWM_CIC_Needed === "No" || rowData.AWM_CIC_Needed === "N/A") {
      return "white-bg-color"; // class name for highlighted rows
    }
    return "pink-bg-color"; // default class name for other rows
  };

  return (
    <>
      <DependencyFilter
        op={op}
        onSort={onSort}
        selectedColumnName={selectedColumnName}
        selectedFields={selectedFields}
        dsbpPmpData={dependencyMappingData}
        onGlobalFilterChange={onGlobalFilterChange}
        setFrozenUpdated={setFrozenUpdated}
        frozenUpdated={frozenUpdated}
        setFieldUpdated={setDataUpdated}
        fieldUpdated={dataUpdated}
        filteredDependencyMappingData={filteredDependencyMappingData.length}
        setFiltersDependencyMappingData={setFiltersDependencyMappingData}
        setSelectedFields={setSelectedFields}
      />
      <DataTable
        value={
          filteredDependencyMappingData.length
            ? filteredDependencyMappingData
            : dependencyMappingData
        }
        resizableColumns
        reorderableColumns
        onColumnResizeEnd={onColumnResizeEnd}
        onColReorder={storeReorderedColumns}
        key={tableRender ? `"DSBP_PMP_PIMaterialID" + timestamp` : ""}
        rowClassName={rowClassName}
        filters={searchHeader}
        filterDisplay={isSearch && "row"}
        className="mt-3"
        responsiveLayout="scroll"
        columnResizeMode="expand"
        scrollable
        tableStyle={{
          width: "max-content",
          minWidth: "100%",
        }}
      >
        {dynamicColumns()}
      </DataTable>
    </>
  );
};

export default DependencyMappingList;
