import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Form } from "react-bootstrap";
import { Column } from "primereact/column";
import filter from "../../assets/images/filter.svg";
import DSBPFilter from "./DSBPFilter";
import "../Projects/MyProjects/index.scss";
import DsbpCommonPopup from "./DsbpCommonPopup";
import DsbpRejectDialog from "./RejectDialog";
import DsbpActionDialog from "./DsbpActionDialog";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ArtWorkTabValuesAction } from "../../../src/store/actions/ArtWorkTabValuesActions";
import { getDropDownValues } from "../../../src/store/actions/dropDownValuesAction";
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
  handleTabPanel,
  tabPanel,
  setFieldUpdated,
  fieldUpdated,
  setSavedData,
  addSavedData,
  handleYesAddToPRoject,
  setHandleYesAddToPRoject,
  rejectDialog,
  setRejectDialog,
  tableRender,
  setTableRender,
  customizeViewFields,
  setCustomizeViewFields,
  userHasAccess,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { artWorkTabValuesData } = useSelector(
    (state) => state.ArtWorkTabValuesReducer
  );
  const [selectedColumnName, setSelectedColumnName] = useState(null);
  const op = useRef(null);

  const [onChangeData, setOnChangeData] = useState(false);
  const [rejectFormData, setRejectFormData] = useState({});
  const [frozenUpdated, setFrozenUpdated] = useState(false);
  const [addedDataForSave, setAddedDataForSave] = useState([]);
  const [tabsList, setTabsList] = useState([
    { tabHeader: "Header 1", decription: "Header 1 data" },
  ]);

  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const allBUAttributesData = useSelector(
    (state) => state.DropDownValuesReducer
  );
  const allBUAttributes = allBUAttributesData.DropDownValuesData;
  const ProjectID = selectedProjectDetails?.Project_ID;
  let aiseList =
    allBUAttributes?.ArtworkAgilityTasksPage?.Artwork_Alignment?.AISE;
  let assemblyMechanismList =
    allBUAttributes?.ArtworkAgilityTasksPage?.Artwork_Alignment
      ?.Assembly_Mechanism;

  const addToProjectList = [
    { name: "Yes", code: "Yes" },
    { name: "No", code: "No" },
    { name: "Reject", code: "Reject" },
  ];

  const addToProjectListYes = [{ name: "Yes", code: "Yes" }];

  const addToProjectListNo = [
    { name: "Yes", code: "Yes" },
    { name: "No", code: "No" },
  ];

  const addToProjectListReject = [
    { name: "Yes", code: "Yes" },
    { name: "Reject", code: "Reject" },
  ];

  const BU = selectedProjectDetails?.BU;
  // check whether project is from home care or baby care
  let isBUHomeCare = false;
  if (BU === "Home Care") {
    isBUHomeCare = true;
  }

  useEffect(() => {
    setCustomizeViewFields(customizeViewFields);
  }, [customizeViewFields]);

  useEffect(() => {
    if(allBUAttributes === null)
      dispatch(getDropDownValues());
  }, [allBUAttributes]);

  const onchangeAddToProject = (rowData, e, ele) => {    
    setOnChangeData(rowData);
    if (e.target.value === "Reject") setRejectDialog(true);
    setRejectFormData({});
    if (e.target.value === "Yes")
      setHandleYesAddToPRoject(true);
    if(e.target.value === "No"){
      rowData[ele] = e.target.value;
      setDsbpPmpData([...dsbpPmpData]);
      onChangeSelectField(rowData, e, ele);
    }
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

    const newArray = Array.isArray(artWorkTabValuesData)
      ? [...artWorkTabValuesData, ...updatedTabsList]
      : updatedTabsList;

    const uniqueArray = Array.from(
      new Set(newArray.map((obj) => JSON.stringify(obj)))
    ).map(JSON.parse);

    dispatch(ArtWorkTabValuesAction(uniqueArray));
    navigate("/DSBP/tab/artworkAlignment", { replace: true });
  };

  const onChangeSelectField = (option, e, field) => {
    option[field] = e.target.value;
    setAddedDataForSave({ ...addedDataForSave, option });

    if (addSavedData && addSavedData.length) {
      addSavedData.map((ele) => {
        if (
          ele.DSBP_InitiativeID === option.DSBP_InitiativeID &&
          ele.DSBP_PMP_PIMaterialID === option.DSBP_PMP_PIMaterialID
        ) {
          ele[field] = e.target.value;
          return ele;
        }
      });
    }
    let checkDataIsPresentOrNot = addSavedData.filter(
      (ele) =>
        ele.DSBP_InitiativeID === option.DSBP_InitiativeID &&
        ele.DSBP_PMP_PIMaterialID === option.DSBP_PMP_PIMaterialID
    );
    if (!checkDataIsPresentOrNot.length) {
      let updatedData = {};
      updatedData.DSBP_InitiativeID = option.DSBP_InitiativeID;
      updatedData.DSBP_PMP_PIMaterialID = option.DSBP_PMP_PIMaterialID;
      updatedData.DSBP_PMP_PIMaterialNumber = option.DSBP_PMP_PIMaterialNumber;
      updatedData.FK_AWMProjectID = ProjectID;
      updatedData[field] = e.target.value;
      addSavedData.push(updatedData);
    }
    setSavedData(addSavedData);
    setFieldUpdated(!fieldUpdated);
  };

  const addBody = (options, rowData) => {
    let field = rowData.field;
    const fieldEditable = options["AWM_AddedToProject"] === "Yes";
    let FPCStagingFormula =
      options?.FPCStagingPage?.[0]?.FormulaCardStagingPage;
    let concatenatedFPCStagingFormulaData = {};
    if (FPCStagingFormula && FPCStagingFormula.length) {
      concatenatedFPCStagingFormulaData =
        concatenatedFPCStagingFormula(FPCStagingFormula);
    }

    return (
      <>
        {field === "field_0" && ( // Add this condition to render a checkbox
        <div className="flex align-items-center gap-2">
          <input
            type="checkbox"
            className="p-checkbox-box p-highlight"
            checked={selected?.includes(options)}
            // onChange={() => !userHasAccess && handleSelect(options)}
            onChange={() => handleSelect(options)}
            // disabled={userHasAccess}
          />
        </div>
      )}
        {options?.FPCStagingPage?.[0][field]}
        {concatenatedFPCStagingFormulaData?.[field]}
        {field === "DSBP_PMP_PIMaterialNumber" && (
          <a
            className="tabView"
            // disabled={userHasAccess}
            // onClick={() => !userHasAccess && onHandlePmpTabView(options, field)}
            onClick={() => onHandlePmpTabView(options, field)}
          >
            {options[field]}
          </a>
        )}
        {field === "AWM_AddedToProject" && (
          <Form.Group
            controlId="groupName.ControlInput1"
            style={{ textAlign: "-webkit-center" }}
          >
            <Form.Select
              placeholder="Select"
              value={options[field]}
              // onChange={(e) => !userHasAccess && onchangeAddToProject(options, e, field)}
              onChange={(e) => onchangeAddToProject(options, e, field)}
              style={{ width: "80%", fontSize: 12 }}
            >
              <option value="">Select</option>
              {options[field] === "Yes" &&
                addToProjectListYes?.map((data) => (
                  <option key={data.code} value={data.name}>
                    {data.name}
                  </option>
                ))}
              {options[field] === "No" &&
                addToProjectListNo?.map((data) => (
                  <option key={data.code} value={data.name}>
                    {data.name}
                  </option>
                ))}
              {options[field] === "Reject" &&
                addToProjectListReject?.map((data) => (
                  <option key={data.code} value={data.name}>
                    {data.name}
                  </option>
                ))}
              {options[field] === "" &&
                addToProjectList?.map((data) => (
                  <option key={data.code} value={data.name}>
                    {data.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        )}
        {field === "AWM_AISE" && (
          <Form.Group
            controlId="groupName.ControlInput1"
            style={{ textAlign: "-webkit-center" }}
          >
            <Form.Select
              placeholder="Select"
              value={options[field]}
              disabled={!fieldEditable}
              // onChange={(e) => !userHasAccess && onChangeSelectField(options, e, field)}
              onChange={(e) => onChangeSelectField(options, e, field)}
              style={{ width: "80%", fontSize: 12 }}
            >
              <option value="">Select</option>
              {aiseList?.map((data) => (
                <option key={data.AWM_AISE} value={data.AWM_AISE}>
                  {data.AWM_AISE}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
        {field === "AWM_AssemblyMechanism" && (
          <Form.Group
            controlId="groupName.ControlInput1"
            style={{ textAlign: "-webkit-center" }}
          >
            <Form.Select
              placeholder="Select"
              value={options[field]}
              disabled={!fieldEditable}
              // onChange={(e) => !userHasAccess && onChangeSelectField(options, e, field)}
              onChange={(e) => onChangeSelectField(options, e, field)}
              style={{ width: "80%", fontSize: 12 }}
            >
              <option value="">Select</option>
              {assemblyMechanismList?.map((data) => (
                <option key={data.code} value={data.AWM_AssemblyMechanism}>
                  {data.AWM_AssemblyMechanism || options[field]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}

        {field === "AWM_GroupPMP" && (
          <Form.Group
            controlId="groupName.ControlInput1"
            style={{ textAlign: "-webkit-center" }}
          >
            <Form.Control
              type="text"
              value={options[field]}
              disabled={!fieldEditable}
              // onChange={(e) => !userHasAccess && onChangeSelectField(options, e, field)}
              onChange={(e) => onChangeSelectField(options, e, field)}
              placeholder="Enter Group Name"
            />
          </Form.Group>
        )}

        {field === "AWM_Sellable" && (
          <Form.Group
            controlId="groupName.ControlInput1"
            style={{ textAlign: "-webkit-center" }}
          >
            <Form.Control
              type="text"
              value={options[field]}
              disabled={!fieldEditable}
              // onChange={(e) => !userHasAccess && onChangeSelectField(options, e, field)}
              onChange={(e) => onChangeSelectField(options, e, field)}
              placeholder="Enter Sellable"
            />
          </Form.Group>
        )}

        {field === "AWM_Biocide" && (
          <Form.Group
            controlId="groupName.ControlInput1"
            style={{ textAlign: "-webkit-center" }}
          >
            <Form.Control
              type="text"
              value={options[field]}
              disabled={!fieldEditable}
              // onChange={(e) => !userHasAccess && onChangeSelectField(options, e, field)}
              onChange={(e) => onChangeSelectField(options, e, field)}
              placeholder="Enter Biocide"
            />
          </Form.Group>
        )}

        {field !== "AWM_AddedToProject" &&
          field !== "DSBP_PMP_PIMaterialNumber" &&
          field !== "AWM_AISE" &&
          field !== "AWM_AssemblyMechanism" &&
          field !== "AWM_Biocide" &&
          field !== "AWM_GroupPMP" &&
          field !== "AWM_Sellable" &&
          field !== "field_0" &&
          options[field]}
      </>
    );
  };

  const renderHeader = (field, isFilterActivated = false) => {
    if (field === "checkbox") {
      // Render checkbox in header
      return (
        <div className="flex align-items-center gap-2">
          <input
            type="checkbox"
            className="p-checkbox-box p-highlight"
            checked={selectAllChecked}
            disabled = {dsbpPmpData === null}
            onChange={handleSelectAll}
          />
        </div>
      );
    }
    let splittedCol = field.split("_").join(" ");
    return (
      <span key={field}>
        <img
          src={filter}
          key={field}
          alt="Column Filter"
          // disabled={userHasAccess}
          // onClick={(e) => !userHasAccess && projectNameOnClick(e, field)}
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
    let jsonColumnWidth = isBUHomeCare
      ? localStorage.getItem("columnWidthDSBPArtworkHomeCare")
      : localStorage.getItem("columnWidthDSBPArtworkBabyCare");
    let allColumns = JSON.parse(jsonColumnWidth);

    // customize fields
    let jsonValue = customizeViewFields
      ? JSON.parse(customizeViewFields)
      : null;
    if (jsonValue && Object.keys(jsonValue).length !== 0) {
      let selectedData = jsonValue?.selectedFields?.fieldsData || [];
      let freezedData = jsonValue?.freezedColumns?.fieldsData || [];
      const filteredColumns = [];
      // Add freezedData columns in the specified order
      freezedData?.forEach((fieldName) => {
        const column = allColumns?.find((col) => col.Field_Name === fieldName);
        if (column) {
          column.freeze = true;
          filteredColumns.push(column);
        }
      });
      // Add selectedData columns in the specified order
      selectedData?.forEach((fieldName) => {
        const column = allColumns?.find((col) => col.Field_Name === fieldName);
        if (column) {
          filteredColumns.push(column);
        }
      });
      if (filteredColumns && filteredColumns.length) {
        return [
          // Checkbox column
          <Column
            key="checkbox"
            body={addBody}
            frozen={true}
            columnKey="checkbox"
            header={() => renderHeader("checkbox")}
            style={{ width: "40px" }}
          />,
          // Rest of the columns
          ...filteredColumns.map((field, index) => {
            return (
              <Column
                field={field.Field_Name}
                header={() => renderHeader(field.Field_Name)}
                frozen={field.freeze}
                className={field.freeze ? "font-bold" : ""}
                body={addBody}
                key={field.Field_Name}
                columnKey={field.Field_Name}
                showFilterMenu={false}
                alignFrozen="left"
                filterField={field.Field_Name}
                style={{
                  width: field.width,
                }}
              />
            );
          }),
        ];
      }
    } else {
      if (allColumns && allColumns.length) {
        return [
          // Checkbox column
          <Column
            key="checkbox"
            body={addBody}
            frozen={true}
            columnKey="checkbox"
            header={() => renderHeader("checkbox")}
            style={{ width: "40px" }}
          />,
          // Rest of the columns
          ...allColumns.map((field, index) => {
            return (
              <Column
                field={field.Field_Name}
                header={() => renderHeader(field.Field_Name)}
                frozen={field.freeze}
                className={field.freeze ? "font-bold" : ""}
                body={addBody}
                key={field.Field_Name}
                columnKey={field.Field_Name}
                showFilterMenu={false}
                alignFrozen="left"
                filterField={field.Field_Name}
                style={{
                  width: field.width,
                }}
              />
            );
          }),
        ];
      }
    }
  };

  const onColumnResizeEnd = (event) => {
    let columnWidth = [];
    let jsonColumnWidth = isBUHomeCare
      ? localStorage.getItem("columnWidthDSBPArtworkHomeCare")
      : localStorage.getItem("columnWidthDSBPArtworkBabyCare");
    if (jsonColumnWidth) {
      columnWidth = JSON.parse(jsonColumnWidth);
    }
    if (columnWidth) {
      columnWidth.map((list) => {
        if (event.column.props.field === list.Field_Name) {
          list.width = event.element.offsetWidth;
        }
      });
    }
    // localStorage.setItem("columnWidthDSBPArtwork", JSON.stringify(columnWidth));
    isBUHomeCare
      ? localStorage.setItem(
          "columnWidthDSBPArtworkHomeCare",
          JSON.stringify(columnWidth)
        )
      : localStorage.setItem(
          "columnWidthDSBPArtworkBabyCare",
          JSON.stringify(columnWidth)
        );
    setFieldUpdated(!fieldUpdated);
    setTableRender(false);
  };

  const storeReorderedColumns = (e) => {
    let columnNames = [];
    // let jsonColumnNames = localStorage.getItem("columnWidthDSBPArtwork");
    let jsonColumnNames = isBUHomeCare
      ? localStorage.getItem("columnWidthDSBPArtworkHomeCare")
      : localStorage.getItem("columnWidthDSBPArtworkBabyCare");
    if (jsonColumnNames) {
      columnNames = JSON.parse(jsonColumnNames);
    }
    const shiftedArray = [...columnNames]; // Create a copy of the array
    // Find the index of the element to be shifted
    if (e?.dragIndex !== -1) {
      const [removed] = shiftedArray.splice(e?.dragIndex, 1); // Remove the element from the array
      // shiftedArray.unshift(removed); // Place the removed element at the beginning of the array
      shiftedArray.splice(e?.dropIndex, 0, removed);
    }
    shiftedArray.map((ele, index) => {
      ele["Sequence"] = index;
      ele["reorder"] = true;
    });

    isBUHomeCare
      ? localStorage.setItem(
          "columnWidthDSBPArtworkHomeCare",
          JSON.stringify(shiftedArray)
        )
      : localStorage.setItem(
          "columnWidthDSBPArtworkBabyCare",
          JSON.stringify(shiftedArray)
        );
    // localStorage.setItem(
    //   "columnWidthDSBPArtwork",
    //   JSON.stringify(shiftedArray)
    // );
    setFieldUpdated(!fieldUpdated);
    setTableRender(false);
  };

  const timestamp = new Date().getTime();

  return (
    //console.log("dsbpPmpData", dsbpPmpData),
    <>
      <DataTable
        dataKey="DSBP_PMP_PIMaterialID"
        key={tableRender ? `"DSBP_PMP_PIMaterialID" + timestamp` : ""}
        scrollable
        resizableColumns
        // key={generateUniqueKey("artwork")}
        reorderableColumns
        onColumnResizeEnd={onColumnResizeEnd}
        onColReorder={storeReorderedColumns}
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
      <DSBPFilter
        op={op}
        onSort={onSort}
        selectedColumnName={selectedColumnName}
        dsbpPmpData={dsbpPmpData}
        selectedFields={selectedFields}
        onGlobalFilterChange={onGlobalFilterChange}
        setFrozenUpdated={setFrozenUpdated}
        frozenUpdated={frozenUpdated}
        setFieldUpdated={setFieldUpdated}
        fieldUpdated={fieldUpdated}
      />
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
