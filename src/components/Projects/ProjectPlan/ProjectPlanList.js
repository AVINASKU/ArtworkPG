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
import complete from "../../../assets/images/complete.svg";
import hyphen from "../../../assets/images/hyphen.svg";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { selectedProject } from "../../../store/actions/ProjectSetupActions";

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
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const myProjectList = useSelector((state) => state.myProject);
  console.log("myProjectList:", myProjectList);
  const { loading } = myProjectList;
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const elementTemplate = (options, rowData) => {
    let roles = [],
      owners = [];
    const field = rowData.field,
      task = options.data["Task"];

    if (field === "Role") {
      roles = options.data[field];
    }
    if (field === "Owner") {
      owners = options.data[field];
    }

    return (
      <>
        {field === "Task" && (
          <span
            style={{ color: "#003DA5", cursor: "pointer" }}
            onClick={() => {
              if (field && field.length) {
                dispatch(selectedProject(options.data, "My Projects"));
                navigate(`/addProject/${task}`);
              }
            }}
          >
            {options.data[field]}
          </span>
        )}

        {options.children ? (
          <>
            {(field === "Role" || field === "Owner") && (
              <img
                src={hyphen}
                alt="Hyphen"
                onClick={(e) => {
                  op.current.toggle(e);
                }}
                // className="iconsStyle"
              />
            )}
          </>
        ) : (
          (field === "Role" || field === "Owner") && (
            <Dropdown
              value={field === "Owner" ? selectedOwner : selectedRole}
              onChange={(e) => {
                field === "Role" && setSelectedRole(e.value);
                field === "Owner" && setSelectedOwner(e.value);
              }}
              options={
                field === "Role" ? roles : field === "Owner" ? owners : []
              }
              optionLabel="name"
              placeholder={`Select ${field}`}
              className="w-full md:w-14rem"
            />
          )
        )}

        {field === "State" && options.data[field] === "Complete" ? (
          <>
            <img
              src={complete}
              alt="Check"
              onClick={(e) => {
                op.current.toggle(e);
              }}
              className="iconsStyle"
            />
            <span className="iconsTextStyle" onClick={() => {}}>
              {options.data[field]}
            </span>
          </>
        ) : (
          <>{field === "State" && options.data[field]}</>
        )}
        {field === "Duration" && (
          <button type="button" className="btn btn-outline-secondary duration">
            {options.data[field]}
          </button>
        )}
        {field === "HelpNeeded" && (
          <button type="button" className="btn btn-success helpNeeded">
            {options.data[field]}
          </button>
        )}

        {field === "StartDate" && changeDateFormat(options.data[field])}
        {field === "EndDate" && changeDateFormat(options.data[field])}
        {field !== "Task" &&
          field !== "Role" &&
          field !== "Owner" &&
          field !== "State" &&
          field !== "StartDate" &&
          field !== "EndDate" &&
          field !== "Duration" &&
          field !== "HelpNeeded" && <>{options.data[field]}</>}
      </>
    );
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
            expander={ele === "Task"}
            columnKey={ele || i}
            frozen={frozenCoulmns.includes(ele)}
            alignFrozen="left"
            className={frozenCoulmns.includes(ele) ? "font-bold" : ""}
            showFilterMenu={false}
            body={elementTemplate}
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
            // resizableColumns
            dataKey="Task"
            reorderableColumns
            // onColReorder={storeReorderedColumns}
            // onResize={(e) => console.log("resize", e)}
            // onResizeCapture={(e) => console.log("e", e)}
            value={filters.length ? filters : pegadata}
            // scrollable
            // responsiveLayout="scroll"
            loading={loading}
            className="mt-3"
            // columnResizeMode="expand"
            // onColumnResizeEnd={onColumnResizeEnd}
            // filters={searchHeader}
            // filterDisplay={isSearch && "row"}
            // ref={dt}
            tableStyle={{ minWidth: "107rem", tableLayout: "auto" }}
          >
            {/* <Column header="" expander={true}></Column> */}
            {rowExpansionColumns()}
          </TreeTable>
        </div>
      </Suspense>
    </div>
  );
};
export default ProjectPlanList;
