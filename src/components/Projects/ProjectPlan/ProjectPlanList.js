import React, { useState, useEffect, useRef, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { ProjectService } from "../../../service/PegaService";
import ConfirmationPopUp from "../ConfirmationPopUp";
import { Toast } from "primereact/toast";
import { FilterMatchMode } from "primereact/api";
import { Tag } from "primereact/tag";
import filter from "../../../assets/images/filter.svg";
import { projectPlan } from "../../../store/actions/ProjectActions";
import { changeDateFormat } from "../utils";
import BlueFilter from "../../../assets/images/BlueFilterIcon.svg";

const ProjectPlanList = (props) => {
  const [pegadata, setPegaData] = useState(null);
  const [ProjectFrozen, setProjectFrozen] = useState(false);
  const [frozenCoulmns, setFrozenColumn] = useState([]);
  const [selectedColumnName, setSelectedColumnName] = useState(null);
  const [projectColumnName, setProjectColumnNames] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [filters, setFilters] = useState([]);
  const [sortData, setSortData] = useState([]);
  const [isSearch] = useState(false);

  const myProjectList = useSelector((state) => state.myProject);
  console.log("myProjectList:", myProjectList);
  const { loading } = myProjectList;
  const dispatch = useDispatch();

  const searchHeader = projectColumnName.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: { value: null, matchMode: FilterMatchMode.CONTAINS },
    }),
    {}
  );

  const op = useRef(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Saved Successfully",
      life: 3000,
    });
  };

  const onSort = (column, direction) => (event) => {
    const sortedData = [...pegadata].sort((a, b) => {
      return a[column] > b[column] ? 1 : -1;
    });

    if (direction === "desc") {
      sortedData.reverse();
    }
    setPegaData(sortedData);
    setSortData([column, direction]);
  };

  useEffect(() => {
    const updatedUsers = dispatch(projectPlan());
    console.log("projectPlan::", updatedUsers);
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        const ProjectData = myProjectList.projectPlan;

        let filteredPegaDataJson = localStorage.getItem("columnWiseFilterData");
        const filteredPegaData = JSON.parse(filteredPegaDataJson);

        if (filteredPegaData && filteredPegaData.length) {
          setFilters(filteredPegaData);
          setSelectedCities(filteredPegaData);
          setPegaData(ProjectData);
        } else setPegaData(ProjectData);

        // according to pathname we need to call api and store column name in local storage
        let columnNamesJson = localStorage.getItem("projectPlanAllColumnNames");
        const columnNames = JSON.parse(columnNamesJson);
        if (columnNames != null && columnNames.length) {
          setProjectColumnNames(columnNames);
        } else {
          const columnNames = ProjectService.getProjectPlanAllColumnNames();
          localStorage.setItem(
            "projectPlanAllColumnNames",
            JSON.stringify(columnNames)
          );
          setProjectColumnNames(columnNames);
        }

        // get sort data from local storage and add in state
        let jsonSortingData1 = localStorage.getItem("sortingData");
        const sortingData = JSON.parse(jsonSortingData1);

        if (sortingData && sortingData.length) {
          const sortedData = [...ProjectData].sort((a, b) => {
            return a[sortingData[0]] > b[sortingData[0]] ? 1 : -1;
          });

          if (sortingData[1] === "desc") {
            sortedData.reverse();
          }
          setPegaData(sortedData);
          setSortData([sortingData[0], sortingData[1]]);
        }

        //get frozen data from local storage and add in state
        let jsonFrozenrData1 = localStorage.getItem("frozenData");
        const frozenData = JSON.parse(jsonFrozenrData1);
        if (frozenData && frozenData.length) {
          setFrozenColumn(frozenData);
        }
      } catch (err) {
        console.log("error", err);
      }
    })();
    // setLoading(false);
  }, [myProjectList.projectPlan]);

  const addFrozenColumns = (name) => {
    if (!frozenCoulmns.includes(name)) {
      frozenCoulmns.push(name);
      setFrozenColumn(frozenCoulmns);
    } else {
      let columnIndex = frozenCoulmns.indexOf(name);
      frozenCoulmns.splice(columnIndex, 1);
      setFrozenColumn(frozenCoulmns);
    }
  };

  const projectNameHeader = (options) => {
    const isFilterActivated =
      (frozenCoulmns &&
        frozenCoulmns.length &&
        frozenCoulmns.includes(options)) ||
      (sortData && sortData.length && sortData[0] === options);

    return (
      <div>
        {isFilterActivated ? (
          <>
            <img
              src={BlueFilter}
              alt="Column Filter"
              onClick={(e) => {
                op.current.toggle(e);
                setSelectedColumnName(options);
              }}
              className="columnFilterIcon"
            />
            <span style={{ color: "#003DA5" }}>{options}</span>
          </>
        ) : (
          <>
            <img
              src={filter}
              alt="Column Filter"
              onClick={(e) => {
                op.current.toggle(e);

                setSelectedColumnName(options);
              }}
              className="columnFilterIcon"
            />
            {options}
          </>
        )}
      </div>
    );
  };

  const fullKitReadinessBody = (options, rowData) => {
    let field = rowData.field;
    let categoryNames = [];
    let SMOName = [];
    let brandName = [];
    let projectId = options["Task"];
    // if (field === "Artwork_Category") {
    //   categoryNames = options[field]
    //     .map((item) => item.Category_Name)
    //     .join(",");
    // }

    // if (field === "Artwork_SMO" && options[field]) {
    //   console.log('field:', options[field]);
    //   SMOName = options[field].map((item) => item.SMO_Name).join(",");
    // }
    // if (field === "Artwork_Brand" && options[field]) {
    //   brandName = options[field].map((item) => item.Brand_Name).join(",");
    // }

    return (
      <>
        {field === "Project State" && (
          <Tag
            value=""
            style={{
              backgroundColor: "#DFEBFF",
              color: "#003DA5",
              border: "1px solid",
            }}
          >
            Active
          </Tag>
        )}
        {field === "Full Kit Readiness Tracking" && (
          <Tag
            value="view"
            style={{
              backgroundColor: "white",
              color: "gray",
              border: "1px solid",
            }}
          ></Tag>
        )}

        {field === "Project_Name" && (
          <a href={`/addProject/${projectId}`}> {options[field]} </a>
        )}

        {field === "Estimated_SOP" && changeDateFormat(options[field])}
        {field === "Estimated_AW_Printer" && changeDateFormat(options[field])}
        {field === "Artwork_Category" && categoryNames}
        {field === "Artwork_SMO" && SMOName}
        {field === "Artwork_Brand" && brandName}

        {field !== "Full Kit Readiness Tracking" &&
          field !== "Estimated_SOP" &&
          field !== "Estimated_AW_Printer" &&
          field !== "Artwork_Category" &&
          field !== "Project_Name" &&
          field !== "Artwork_SMO" &&
          field !== "Artwork_Brand" && <> {options[field]}</>}
      </>
    );
  };

  const onGlobalFilterChange = (e) => {
    const value = e.value;
    setSelectedCities(value);
    setFilters(value);
  };

  const onColumnResizeEnd = (event) => {
    console.log("updated column name", event, event?.element?.clientWidth);
  };

  const saveSettings = () => {
    localStorage.setItem("columnWiseFilterData", JSON.stringify(filters));
    localStorage.setItem("frozenData", JSON.stringify(frozenCoulmns));
    localStorage.setItem("sortingData", JSON.stringify(sortData));
    localStorage.setItem(
      "projectPlanAllColumnNames",
      JSON.stringify(projectColumnName)
    );
    showSuccess();
  };

  const storeReorderedColumns = (e) => {
    const dragColumnName = projectColumnName[e?.dragIndex];
    const index = projectColumnName.indexOf(dragColumnName);
    if (index > -1) {
      // only splice array when item is found
      projectColumnName.splice(index, 1); // 2nd parameter means remove one item only
      projectColumnName.splice(e?.dropIndex, 0, dragColumnName);
    }
    localStorage.setItem(
      "projectPlanAllColumnNames",
      JSON.stringify(projectColumnName)
    );
    setProjectColumnNames(projectColumnName);
  };

  const clearColumnWiseFilter = () => {
    let jsonFrozenItem = localStorage.getItem("frozenData");
    const frozenItem = JSON.parse(jsonFrozenItem);
    if (
      frozenItem &&
      frozenItem.length &&
      frozenItem.includes(selectedColumnName)
    ) {
      const index = frozenItem.indexOf(selectedColumnName);
      frozenItem.splice(index, 1);
      localStorage.setItem("frozenData", JSON.stringify(frozenItem));
      setFrozenColumn(frozenItem);
    }
    if (frozenCoulmns.includes(selectedColumnName)) {
      const index = frozenCoulmns.indexOf(selectedColumnName);
      frozenCoulmns.splice(index, 1);
      setFrozenColumn(frozenCoulmns);
      setProjectFrozen(!ProjectFrozen);
    }
    let jsonSortItem = localStorage.getItem("sortingData");
    const sortItem = JSON.parse(jsonSortItem);
    if (sortItem && sortItem.length && sortItem[0] === selectedColumnName) {
      localStorage.setItem("sortingData", JSON.stringify([]));
    }
    if (sortData && sortData.length && sortData[0] === selectedColumnName) {
      setSortData([]);
    }
    if (filters && filters.length) {
      localStorage.setItem("columnWiseFilterData", JSON.stringify({}));
      setSelectedCities([]);
      setFilters([]);
    }
  };

  const [expandedRows, setExpandedRows] = useState(null);
  const rowExpansionColumnNames = [
    "Task",
    "Dependancy",
    "Role",
    "Owner",
    "State",
    "Duration",
    "StartDate",
    "EndDate",
    "ConsumedBuffer",
    "HelpNeeded",
  ];

  const rowExpansionHeader = (options) => {
    return <div>{options}</div>;
  };
  const rowExpansionColumns = () => {
    if (rowExpansionColumnNames.length) {
      return rowExpansionColumnNames.map((ele, i) => {
        return (
          <Column
            key={ele}
            field={ele}
            filterField={ele}
            header={projectNameHeader(ele)}
            columnKey={ele || i}
            frozen={frozenCoulmns.includes(ele)}
            alignFrozen="left"
            className={frozenCoulmns.includes(ele) ? "font-bold" : ""}
            showFilterMenu={false}
            // body={fullKitReadinessBody}
          />
        );
      });
    }
  };

  return (
    <div className="myProjectAnddAllProjectList">
      <Suspense fallback={<div>Loading...</div>}>
        <Toast ref={toast} />
        <div className="card">
          <ConfirmationPopUp
            onSort={onSort}
            setProjectFrozen={setProjectFrozen}
            saveSettings={saveSettings}
            projectData={pegadata}
            addFrozenColumns={addFrozenColumns}
            onGlobalFilterChange={onGlobalFilterChange}
            selectedColumnName={selectedColumnName}
            ProjectFrozen={ProjectFrozen}
            selectedCities={selectedCities}
            setFrozenColumn={setFrozenColumn}
            frozenCoulmns={frozenCoulmns}
            sortData={sortData}
            setSortData={setSortData}
            setFilters={setFilters}
            filters={filters}
            op={op}
            clearColumnWiseFilter={clearColumnWiseFilter}
          />
          <TreeTable
            resizableColumns
            dataKey="Task"
            reorderableColumns
            onColReorder={storeReorderedColumns}
            onResize={(e) => console.log("resize", e)}
            onResizeCapture={(e) => console.log("e", e)}
            value={filters.length ? filters : pegadata}
            scrollable
            responsiveLayout="scroll"
            loading={loading}
            className="mt-3"
            columnResizeMode="expand"
            onColumnResizeEnd={onColumnResizeEnd}
            filters={searchHeader}
            filterDisplay={isSearch && "row"}
            ref={dt}
            tableStyle={{ minWidth: "50rem", tableLayout: "auto" }}
          >
            <Column header="" expander></Column>
            {rowExpansionColumns()}
          </TreeTable>
        </div>
      </Suspense>
    </div>
  );
};
export default ProjectPlanList;
