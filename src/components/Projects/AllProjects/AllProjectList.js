import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProjectService } from "../../../service/PegaService";
import ProjectListFilter from "../ProjectListFilter";
import { FilterMatchMode } from "primereact/api";
import ProjectListHeader from "../MyProjects/ProjectListHeader";
import { Tag } from "primereact/tag";
import { changeDateFormat, Loading } from "../../../utils";
import { getAllProject } from "../../../store/actions/ProjectActions";
import { selectedProject } from "../../../store/actions/ProjectSetupActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import _ from "lodash";
import ProjectNameHeader from "../MyProjects/ProjectNameHeader";
import CustomisedView from "../MyProjects/CustomisedView";
import { generateUniqueKey } from "../../../utils";

const AllProjectList = (props) => {
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;
  const [pegadata, setPegaData] = useState(null);
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
  const [loader, setLoader] = useState(false);
  const [isColWidthSet, setColWidth] = useState(null);
  const allProjectList = useSelector((state) => state.myProject);
  const { loading } = allProjectList;
  const location = useLocation();
  const currentUrl = location.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // setSavedColumnWidth(saveColumnWidth);

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
    const sortedData = [...pegadata].sort((a, b) => {
      return a[column] > b[column] ? 1 : -1;
    });

    if (direction === "desc") {
      sortedData.reverse();
    }

    setPegaData(sortedData);
    setSortData([column, direction]);
    localStorage.setItem("allProjectSortingData", JSON.stringify(sortData));
  };

  useEffect(() => {
    dispatch(getAllProject(userInformation));
  }, [dispatch, userInformation]);

  useEffect(() => {
    const ProjectData = _.cloneDeep(allProjectList.myProject);
    let allCol = [];
    if (ProjectData.length) {
      allCol = Object.keys(ProjectData[0]);
      allCol.push("Full Kit Readiness Tracking");
    }
    let columnWidthMyProject = {};
    if (allCol.length) {
      allCol.forEach((column) => {
        columnWidthMyProject[column] = 100;
      });
    }

    let getJsonStoredWidthColumns = localStorage.getItem(
      "columnWidthAllProject"
    );
    let getStoredWidthColumns = JSON.parse(getJsonStoredWidthColumns);
    const checkEmptyObject = _.isEmpty(getStoredWidthColumns);

    if (checkEmptyObject) {
      localStorage.setItem(
        "columnWidthAllProject",
        JSON.stringify(columnWidthMyProject)
      );
    }

    let jsonColWidth = localStorage.getItem("isColWidthSetAllProject");
    let isColWidthSetFlag = JSON.parse(jsonColWidth);
    if (isColWidthSetFlag) {
      setColWidth(true);
    }
  }, []);

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
      "Estimated_AW_Printer",
      "Estimated_AW_Readiness",
      "IL",
      "PM",
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
    setLoader(true);
    (async () => {
      try {
        // const ProjectData = await ProjectService.getProjectData();
        const ProjectData = _.cloneDeep(allProjectList.allProjects);

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

        let filteredPegaDataJson = localStorage.getItem(
          "allProjectColumnWiseFilterData"
        );
        const filteredPegaData = JSON.parse(filteredPegaDataJson);

        if (filteredPegaData && filteredPegaData.length) {
          setFilters(filteredPegaData);
          setSelectedFields(filteredPegaData);
          setPegaData(ProjectData);
        } else setPegaData(ProjectData);

        // according to pathname we need to call api and store column name in local storage

        let columnNamesJson = localStorage.getItem("allColumnNamesAllProjects");
        const columnNames = JSON.parse(columnNamesJson);

        if (columnNames != null && columnNames.length) {
          setProjectColumnNames(columnNames);
          setUpdatedAllColumnNames(columnNames);
        } else {
          const columnNames =
            await ProjectService.getAllColumnNamesAllProjects();
          localStorage.setItem(
            "allColumnNamesAllProjects",
            JSON.stringify(columnNames)
          );
          setProjectColumnNames(columnNames);
          setUpdatedAllColumnNames(columnNames);
        }

        // const jsonSortingData = await ProjectService.getSortingData();
        //   localStorage.setItem('sortingData', JSON.stringify(jsonSortingData));
        // const jsonFilterData = await ProjectService.getFrozenData();
        // localStorage.setItem('frozenData', JSON.stringify(jsonFilterData))

        // get sort data from local storage and add in state
        let jsonSortingData1 = localStorage.getItem("allProjectSortingData");
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
        let jsonFrozenrData1 = localStorage.getItem("allProjectFrozenData");
        const frozenData = JSON.parse(jsonFrozenrData1);
        if (frozenData && frozenData.length) {
          setFrozenColumn(frozenData);
        }
      } catch (err) {
        console.log("error", err);
      }
    })();
    setLoader(false);
  }, [allProjectList.allProjects]);

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

        {field === "Project_ID" && (
          <span
            style={{ color: "#003DA5", cursor: "pointer" }}
            onClick={() => {
              if (field && field.length) {
                let option = allProjectList.allProjects[rowData.rowIndex];
                dispatch(selectedProject(option, "All Projects"));
                navigate(`${currentUrl}/projectPlan/${projectId}`);
              }
            }}
          >
            {options[field]}{" "}
          </span>
        )}

        {field === "Project_Name" && (
          <span
            style={{ color: "#003DA5", cursor: "pointer" }}
            onClick={() => {
              if (field && field.length) {
                let option = allProjectList.allProjects[rowData.rowIndex];
                dispatch(selectedProject(option, "All Projects"));
                navigate(`${currentUrl}/projectPlan/${projectId}`);
              }
            }}
          >
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

  const projectNameOnClick = (e, options) => {
    op.current.toggle(e);
    setSelectedColumnName(options);
  };

  const dynamicColumns = () => {
    if (projectColumnName.length) {
      return projectColumnName.map((ele, i) => {
        let jsonColumnWidthMyProject = localStorage.getItem(
          "columnWidthAllProject"
        );
        const columnWidthMyProject = JSON.parse(jsonColumnWidthMyProject);
        let checkWidth = [];
        if (columnWidthMyProject) {
          checkWidth = Object.keys(columnWidthMyProject);
        }

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
            // {... checkWidth.includes(ele) && }
            style={{
              width:
                checkWidth.length && checkWidth.includes(ele)
                  ? columnWidthMyProject[ele]
                  : "",
            }}
          />
        );
      });
    }
  };

  const saveAsPersonaliDefault = (selectedCategories) => {
    setProjectColumnNames(reorderColumns(selectedCategories));
    const columnNames = JSON.stringify(reorderColumns(selectedCategories));
    localStorage.setItem("allColumnNamesAllProjects", columnNames);
     localStorage.setItem("isColWidthSetAllProject", JSON.stringify(true));
    setColWidth(true);
    setVisible(false);
  };

  const resetToPgDefault = () => {
    const allColumnNames = [
      "Project_ID",
      "Project_Name",
      "Artwork_Category",
      "Artwork_SMO",
      "PM",
      "Project_State",
      "Artwork_Brand",
      "Buffer_To_Work",
      "Estimated_AW_Printer",
      "Full Kit Readiness Tracking",
    ];

    //     const ProjectData = _.cloneDeep(allProjectList.myProject);
    // let allCol = [];
    // if (ProjectData.length) {
    //   allCol = Object.keys(ProjectData[0]);
    //   allCol.push("Full Kit Readiness Tracking");
    // }
    // let columnWidthMyProject = {};
    // if (allCol.length) {
    //   allCol.forEach((column) => {
    //     columnWidthMyProject[column] = 100;
    //   });
    // }

    setProjectColumnNames(allColumnNames);
    // const columnNames = ProjectService.getAllColumnNamesAllProjects();

    // localStorage.setItem("columnWidthAllProject", JSON.stringify(columnWidthMyProject));
    localStorage.setItem(
      "allColumnNamesAllProjects",
      JSON.stringify(allColumnNames)
    );
    setVisible(false);
  };

  const clearFilters = () => {
    const defaultCol = [
      "Project_ID",
      "Project_Name",
      "Artwork_Category",
      "Artwork_SMO",
      "PM",
      "Project_State",
      "Artwork_Brand",
      "Buffer_To_Work",
      "Estimated_AW_Printer",
      "Full Kit Readiness Tracking",
    ];
    const ProjectData = _.cloneDeep(allProjectList.myProject);
    let allCol = [];
    if (ProjectData.length) {
      allCol = Object.keys(ProjectData[0]);
      allCol.push("Full Kit Readiness Tracking");
    }
    let columnWidthMyProject = {};
    if (allCol.length) {
      allCol.forEach((column) => {
        columnWidthMyProject[column] = 100;
      });
    }
    localStorage.setItem(
      "allColumnNamesAllProjects",
      JSON.stringify(defaultCol)
    );
    setReorderedColumn(false);
    localStorage.setItem("allProjectColumnWiseFilterData", JSON.stringify({}));
    localStorage.setItem("allProjectSortingData", JSON.stringify({}));
    localStorage.setItem("allProjectFrozenData", JSON.stringify({}));
    localStorage.setItem(
      "columnWidthAllProject",
      JSON.stringify(columnWidthMyProject)
    );
     localStorage.removeItem("isColWidthSetAllProject");
     setColWidth(false);
    setProjectColumnNames(defaultCol);
    setSelectedFields([]);
    setSortData([]);
    setFilters([]);
    setFrozenColumn([]);
    setVisible(false);
  };

  const onGlobalFilterChange = (e, colName) => {
      const value = e.value;

      console.log("value and e.value", value,e.value);

        setSelectedFields(value);

    const artworkCategories = value;
    // [
    //   ...new Set(e?.value.map((item) => item[selectedColumnName])),
    // ];

    console.log("artwork", artworkCategories);

    if (artworkCategories.length) {
      let filterProjectState = pegadata.filter((item) => {
        if (
          item &&
          item[selectedColumnName]
        ) {
          const hasWords = artworkCategories.some((word) =>
           Number.isInteger(word) ? item[selectedColumnName] === word : item[selectedColumnName]?.includes(word) 
          );
          if (hasWords) {
            return item;
          }
        }
      });
      setFilters(filterProjectState);
      // localStorage.setItem("columnWiseFilterData", JSON.stringify(filterProjectState));
    } else {
    // localStorage.removeItem("columnWiseFilterData");
    setSelectedFields([]);
    setFilters([]);
    }
  };

  const onColumnResizeEnd = (event) => {
    // console.log("updated column name", event.column, event?.element?.clientWidth);
    // console.log("width", event.element.offsetWidth, event.column);

    let columnWidthMyProject = {};
    let jsonColumnWidthMyProject = localStorage.getItem(
      "columnWidthAllProject"
    );
    if (jsonColumnWidthMyProject) {
      columnWidthMyProject = JSON.parse(jsonColumnWidthMyProject);
    }
    // const updatedColumns = [...projectColumnName];
    // const resizedColumn = updatedColumns.find(
    //   (col) => col === event.column.props.field
    // );
    columnWidthMyProject[event.column.props.field] = event.element.offsetWidth;

    localStorage.setItem(
      "columnWidthAllProject",
      JSON.stringify(columnWidthMyProject)
    );
    localStorage.setItem("isColWidthSetAllProject", JSON.stringify(true));
    setColWidth(true);

    setProjectColumnNames(projectColumnName);
    setVisible(false);
  };

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  // in header save setting button was there and due to requirement I removed that
  //code is kept here if requirement comes
  const saveSettings = () => {
    localStorage.setItem(
      "allProjectColumnWiseFilterData",
      JSON.stringify(filters)
    );
    localStorage.setItem("allProjectFrozenData", JSON.stringify(frozenCoulmns));
    localStorage.setItem("allProjectSortingData", JSON.stringify(sortData));
    localStorage.setItem(
      "allColumnNamesAllProjects",
      JSON.stringify(projectColumnName)
    );
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
    localStorage.setItem(
      "allColumnNamesAllProjects",
      JSON.stringify(projectColumnName)
    );
    setProjectColumnNames(projectColumnName);
    setReorderedColumn(true);
  };

  const clearFilter = () => {
    localStorage.setItem("allProjectColumnWiseFilterData", JSON.stringify({}));
    localStorage.setItem("allProjectSortingData", JSON.stringify({}));
    localStorage.setItem("allProjectFrozenData", JSON.stringify({}));
    setSelectedFields([]);
    setSortData([]);
    setFilters([]);
    setFrozenColumn([]);
  };

  const clearColumnWiseFilter = () => {
    let jsonFrozenItem = localStorage.getItem("allProjectFrozenData");
    const frozenItem = JSON.parse(jsonFrozenItem);
    if (
      frozenItem &&
      frozenItem.length &&
      frozenItem.includes(selectedColumnName)
    ) {
      const index = frozenItem.indexOf(selectedColumnName);
      frozenItem.splice(index, 1);
      localStorage.setItem("allProjectFrozenData", JSON.stringify(frozenItem));
      setFrozenColumn(frozenItem);
    }
    if (frozenCoulmns.includes(selectedColumnName)) {
      const index = frozenCoulmns.indexOf(selectedColumnName);
      frozenCoulmns.splice(index, 1);
      setFrozenColumn(frozenCoulmns);
      setProjectFrozen(!ProjectFrozen);
    }
    let jsonSortItem = localStorage.getItem("allProjectFrozenData");
    const sortItem = JSON.parse(jsonSortItem);
    if (sortItem && sortItem.length && sortItem[0] === selectedColumnName) {
      localStorage.setItem("allProjectFrozenData", JSON.stringify([]));
    }
    if (sortData && sortData.length && sortData[0] === selectedColumnName) {
      setSortData([]);
    }
    if (filters && filters.length) {
      localStorage.setItem(
        "allProjectColumnWiseFilterData",
        JSON.stringify({})
      );
      setSelectedFields([]);
      setFilters([]);
    }
  };

  const isFilterEnabled =
    frozenCoulmns?.length || filters?.length || sortData?.length;

   const isResetEnabled = isReorderedColumn || isFilterEnabled || isColWidthSet;

  return (
    <div className="myProjectAnddAllProjectList">
      {loading || loader || pegadata === null ? (
        <Loading />
      ) : (
        <>
          {pegadata !== undefined && (
            <ProjectListHeader
              header={props.header}
              clearFilters={clearFilters}
              clearFilter={clearFilter}
              setVisible={setVisible}
              saveSettings={saveSettings}
              onSearchClick={onSearchClick}
              exportCSV={exportCSV}
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

          <ProjectListFilter
            onSort={onSort}
            saveSettings={saveSettings}
            setProjectFrozen={setProjectFrozen}
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
            key={generateUniqueKey("ppp")}
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
            // tableStyle={{ minWidth: "50rem" }}
            tableStyle={{ width: "max-content", minWidth: "100%" }}
            autoLayout={true}
            ref={dt}
            // selectionMode="single"
            // onSelectionChange={(e) => {
            //   navigate(`/projectPlan/${e.value.ProjectID}`);
            // }}
          >
            {dynamicColumns(projectColumnName)}
          </DataTable>
        </>
      )}
    </div>
  );
};
export default AllProjectList;
