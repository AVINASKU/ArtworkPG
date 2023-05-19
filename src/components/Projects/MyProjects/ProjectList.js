import React, { useState, useEffect, useRef, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProjectService } from "../../../service/PegaService";
import ConfirmationPopUp from "../ConfirmationPopUp";
import { FilterMatchMode } from "primereact/api";
import ProjectListHeader from "./ProjectListHeader";
import { Tag } from "primereact/tag";
import filter from "../../../assets/images/filter.svg";
import {
  getMyProject,
  // updateProject,
} from "../../../store/actions/ProjectActions";
import { changeDateFormat, onSortData } from "../../../utils";
import _ from "lodash";

import { selectedProject } from "../../../store/actions/ProjectSetupActions";
import ProjectNameHeader from "./ProjectNameHeader";

const CustomisedView = React.lazy(() => import("./CustomisedView"));

const ProjectList = (props) => {
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;

  const [pegadata, setPegaData] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [ProjectFrozen, setProjectFrozen] = useState(false);
  const [frozenCoulmns, setFrozenColumn] = useState([]);
  const [selectedColumnName, setSelectedColumnName] = useState(null);
  const [projectColumnName, setProjectColumnNames] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [filters, setFilters] = useState([]);
  const [visible, setVisible] = useState(false);
  const [sortData, setSortData] = useState([]);
  const [allColumnNames, setAllColumnNames] = useState([]);
  const [updatedAllColumnNames, setUpdatedAllColumnNames] = useState([]);
  const [isSearch, isSearchSet] = useState(false);
  const [isReorderedColumn, setReorderedColumn] = useState(false);
  const myProjectList = useSelector((state) => state.myProject);
  const { loading } = myProjectList;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const history = useHistory();

  const searchHeader = projectColumnName.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: { value: null, matchMode: FilterMatchMode.CONTAINS },
    }),
    {}
  );

  const onSearchClick = () => {
    isSearchSet(!isSearch);
  };

  const op = useRef(null);
  const dt = useRef(null);

  const onSort = (column, direction) => (event) => {
    const sortedData = onSortData(column, direction, pegadata);
    setPegaData(sortedData);
    setSortData([column, direction]);
  };

  useEffect(() => {
    // if (!myProjectList.myProject.length) {
    const updatedUsers = dispatch(getMyProject(userInformation));
    console.log("my projects", updatedUsers);
    // }
  }, [dispatch, userInformation]);

  const reorderColumns = (columns) => {
    const requiredColumnOrderArray = [
      "Project_ID",
      "Project_Name",
      "Initiative_Group_Name",
      "Project_Description",
      "BU",
      "Artwork_Category",
      "Artwork_Brand",
      "Project_region",
      "Artwork_SMO",
      "Cluster",
      "Project_Scale",
      "Project_State",
      "Buffer_To_Work",
      "Estimated_No_Of_DI",
      "Estimated_No_Of_DT",
      "Estimated_No_Of_NPF",
      "Estimated_No_Of_IQ",
      "Estimated_No_Of_PRA",
      "Estimated_No_Of_CICs",
      "Estimated_No_Of_POAs",
      "Estimated_SOS",
      "Estimated_SOP",
      "Estimated AW @ Printer",
      "Estimated_AW_Readiness",
      "IL",
      "Comments",
      "Project_Type",
      "Production_Strategy",
      "Tier",
      "Full Kit Readiness Tracking",
    ];

    let reorderedColumns = [];
    requiredColumnOrderArray.forEach((rcl) => {
      columns.forEach((cl) => {
        if (rcl === cl) {
          reorderedColumns.push(cl);
        }
      });
    });
    return reorderedColumns;
  };
  useEffect(() => {
    // setLoading(true);
    (async () => {
      try {
        // below is json call
        // const ProjectData = await ProjectService.getProjectData();

        //below is api call
        const ProjectData = _.cloneDeep(myProjectList.myProject);
        if (ProjectData && ProjectData.length) {
          ProjectData.filter((field) => {
            if (field.Artwork_Category) {
              let categoryNames = field?.Artwork_Category?.map(
                (item) => item.Category_Name
              ).join(",");
              field.Artwork_Category = categoryNames;
            }

            if (field.Artwork_SMO) {
              let SMOName = field?.Artwork_SMO?.map(
                (item) => item.SMO_Name
              ).join(",");
              field.Artwork_SMO = SMOName;
            }

            if (field.Artwork_Brand) {
              let brandName = field?.Artwork_Brand?.map(
                (item) => item.Brand_Name
              ).join(",");
              field.Artwork_Brand = brandName;
            }

            return field;
          });
        }

        if (ProjectData.length) {
          let allCol = Object.keys(ProjectData[0]);
          allCol.push("Full Kit Readiness Tracking");
          setAllColumnNames(reorderColumns(allCol));
        }
        // const columnNames = await ProjectService.getAllColumnNames();
        // localStorage.setItem("allColumnNames", JSON.stringify(columnNames));

        // const columnNamesAllProjects =
        //   await ProjectService.getAllColumnNamesAllProjects();
        // localStorage.setItem(
        //   "allColumnNamesAllProjects",
        //   JSON.stringify(columnNamesAllProjects)
        // );

        let filteredPegaDataJson = localStorage.getItem("columnWiseFilterData");
        const filteredPegaData = JSON.parse(filteredPegaDataJson);

        if (filteredPegaData && filteredPegaData.length) {
          setFilters(filteredPegaData);
          setSelectedFields(filteredPegaData);
          setPegaData(ProjectData);
        } else setPegaData(ProjectData);

        // according to pathname we need to call api and store column name in local storage
        let columnNamesJson = localStorage.getItem("allColumnNames");
        const columnNames = JSON.parse(columnNamesJson);
        if (columnNames != null && columnNames.length) {
          setProjectColumnNames(columnNames);
          setUpdatedAllColumnNames(columnNames);
        } else {
          const columnNames = ProjectService.getAllColumnNames();
          localStorage.setItem("allColumnNames", JSON.stringify(columnNames));
          setProjectColumnNames(columnNames);
          setUpdatedAllColumnNames(columnNames);
        }

        // const jsonSortingData = await ProjectService.getSortingData();
        //   localStorage.setItem('sortingData', JSON.stringify(jsonSortingData));
        // const jsonFilterData = await ProjectService.getFrozenData();
        // localStorage.setItem('frozenData', JSON.stringify(jsonFilterData))

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
  }, [myProjectList.myProject]);

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

  const projectNameOnClick = (e, options) => {
    op.current.toggle(e);
    setSelectedColumnName(options);
  };

  const fullKitReadinessBody = (options, rowData) => {
    let field = rowData.field;
    let projectId = options["Project_ID"];
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
          <span
            style={{ color: "#003DA5", cursor: "pointer" }}
            onClick={() => {
              if (field && field.length) {
                let option = myProjectList.myProject.find(
                  (project) => project.Project_ID === projectId
                );
                dispatch(selectedProject(option, "My Projects"));
                navigate(`/projectPlan/${projectId}`);
              }
            }}
          >
            {options[field]}
          </span>
        )}

        {field === "Project_ID" && (
          <span
            style={{ color: "#003DA5", cursor: "pointer" }}
            onClick={() => {
              if (field && field.length) {
                let option = myProjectList.myProject.find(
                  (project) => project.Project_ID === projectId
                );
                dispatch(selectedProject(option, "My Projects"));
                navigate(`/projectPlan/${projectId}`);
              }
            }}
          >
            {" "}
            {options[field]}{" "}
          </span>
        )}

        {field === "Estimated_SOP" && changeDateFormat(options[field])}
        {field === "Estimated_AW_Printer" && changeDateFormat(options[field])}

        {field !== "Full Kit Readiness Tracking" &&
          field !== "Estimated_SOP" &&
          field !== "Estimated_AW_Printer" &&
          field !== "Project_Name" &&
          field !== "Project_ID" && <> {options[field]}</>}
      </>
    );
  };

  const dynamicColumns = () => {
    if (projectColumnName.length) {
      return projectColumnName.map((ele, i) => {
        return (
          <Column
            key={ele}
            field={ele}
            filterField={ele}
            header={ProjectNameHeader(
              ele,
              frozenCoulmns,
              sortData,
              projectNameOnClick
            )}
            columnKey={ele || i}
            frozen={frozenCoulmns.includes(ele)}
            alignFrozen="left"
            className={frozenCoulmns.includes(ele) ? "font-bold" : ""}
            filter
            showFilterMenu={false}
            filterPlaceholder={ele}
            body={fullKitReadinessBody}
          />
        );
      });
    }
  };

  const clearFilters = () => {
    const allColumnNames = [
      "Project_ID",
      "Project_Name",
      "Artwork_Category",
      "Artwork_SMO",
      "Project_State",
      "Artwork_Brand",
      "Buffer_To_Work",
      "Estimated_AW_Printer",
      "Full Kit Readiness Tracking",
    ];
    setProjectColumnNames(allColumnNames);
    localStorage.setItem("allColumnNames", JSON.stringify(allColumnNames));
    localStorage.setItem("columnWiseFilterData", JSON.stringify({}));
    localStorage.setItem("frozenData", JSON.stringify({}));
    localStorage.setItem("sortingData", JSON.stringify({}));
    setSelectedFields([]);
    setSortData([]);
    setFrozenColumn([]);
    setReorderedColumn(false);
    setFilters([]);
  };

  const onGlobalFilterChange = (e) => {
    const value = e.value;
    setSelectedFields(value);
    setFilters(value);
  };

  const onColumnResizeEnd = (event) => {
    console.log("updated column name", event, event?.element?.clientWidth);

    // const updatedColumns = [...columns];
    // const resizedColumn = updatedColumns.find(
    //   (col) => col.field === event.element.getAttribute("data-pr-field")
    // );
    // resizedColumn.width = event.width;

    // console.log("resized columns", resizedColumn);

    // setColumns(updatedColumns);
  };

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const saveSettings = () => {
    localStorage.setItem("columnWiseFilterData", JSON.stringify(filters));
    localStorage.setItem("frozenData", JSON.stringify(frozenCoulmns));
    localStorage.setItem("sortingData", JSON.stringify(sortData));
    localStorage.setItem("allColumnNames", JSON.stringify(projectColumnName));
  };

  const saveAsPersonaliDefault = (selectedCategories) => {
    const columnNames = JSON.stringify(reorderColumns(selectedCategories));
    localStorage.setItem("allColumnNames", columnNames);
    setProjectColumnNames(reorderColumns(selectedCategories));
    setVisible(false);
  };

  const resetToPgDefault = async () => {
    // This const is added for todays demo purpose

    const allColumnNames = [
      "Project_ID",
      "Project_Name",
      "Artwork_Category",
      "Artwork_SMO",
      "Project_State",
      "Artwork_Brand",
      "Buffer_To_Work",
      "Estimated_AW_Printer",
      "Full Kit Readiness Tracking",
    ];

    localStorage.setItem("allColumnNames", JSON.stringify({}));
    localStorage.setItem("allColumnNames", JSON.stringify(allColumnNames));
    setProjectColumnNames(allColumnNames);
    setVisible(false);
  };

  const storeReorderedColumns = (e) => {
    const dragColumnName = projectColumnName[e?.dragIndex];
    const index = projectColumnName.indexOf(dragColumnName);
    if (index > -1) {
      // only splice array when item is found
      projectColumnName.splice(index, 1); // 2nd parameter means remove one item only
      projectColumnName.splice(e?.dropIndex, 0, dragColumnName);
      setReorderedColumn(true);
    }
    localStorage.setItem("allColumnNames", JSON.stringify(projectColumnName));
    setProjectColumnNames(projectColumnName);
  };

  const clearFilter = () => {
    localStorage.setItem("columnWiseFilterData", JSON.stringify({}));
    localStorage.setItem("sortingData", JSON.stringify({}));
    localStorage.setItem("frozenData", JSON.stringify({}));
    setSelectedFields([]);
    setSortData([]);
    setFilters([]);
    setFrozenColumn([]);
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
      setSelectedFields([]);
      setFilters([]);
    }
  };

  const isFilterEnabled =
    frozenCoulmns?.length || filters?.length || sortData?.length;

  const isResetEnabled = isReorderedColumn || isFilterEnabled;

  return (
    <div className="myProjectAnddAllProjectList">
      <Suspense fallback={<div>Loading...</div>}>
        {pegadata !== undefined && (
          <ProjectListHeader
            header={props.header}
            clearFilters={clearFilters}
            clearFilter={clearFilter}
            setVisible={setVisible}
            saveSettings={saveSettings}
            onSearchClick={onSearchClick}
            // exportCSV={exportCSV}
            isFilterEnabled={isFilterEnabled}
            isResetEnabled={isResetEnabled}
            allData={pegadata}
            headers={allColumnNames}
          />
        )}
        <CustomisedView
          visible={visible}
          setProjectColumnNames={setProjectColumnNames}
          setVisible={setVisible}
          projectColumnName={projectColumnName}
          allColumnNames={allColumnNames}
          saveAsPersonaliDefault={saveAsPersonaliDefault}
          resetToPgDefault={resetToPgDefault}
        />

        <ConfirmationPopUp
          onSort={onSort}
          setProjectFrozen={setProjectFrozen}
          saveSettings={saveSettings}
          projectData={pegadata}
          addFrozenColumns={addFrozenColumns}
          onGlobalFilterChange={onGlobalFilterChange}
          selectedColumnName={selectedColumnName}
          ProjectFrozen={ProjectFrozen}
          selectedFields={selectedFields}
          setFrozenColumn={setFrozenColumn}
          frozenCoulmns={frozenCoulmns}
          sortData={sortData}
          setSortData={setSortData}
          setFilters={setFilters}
          filters={filters}
          op={op}
          clearColumnWiseFilter={clearColumnWiseFilter}
        />

        <DataTable
          resizableColumns
          dataKey="Project_ID"
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
          // tableStyle={{ minWidth: "50rem" }}
          tableStyle={{ width: "max-content" }}
        >
          {dynamicColumns()}
        </DataTable>
      </Suspense>
    </div>
  );
};
export default ProjectList;
