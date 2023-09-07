import React, { useEffect, useState } from "react";
import { onSortData, Loading, hasAllAccess } from "../../utils";
import { useNavigate } from "react-router-dom";
import ArtworkHeader from "./ArtworkHeader";
import FooterButtons from "../AWMJobs/DesignJobs/FooterButtons";
import { useSelector } from "react-redux";
import {
  getDependencyMappingDetails,
  onSubmitDependencyMappingAction,
  createNewGaBriefTask,
} from "../../apis/dsbpApi";
import DependencyMappingList from "./DependencyMappingList";
import "./index.scss";
import { cloneDeep } from "lodash";

const headerName = "Dependency Mapping";
const DependencyMapping = () => {
  const [dependencyMappingData, setDependencyMappingData] = useState([]);
  const [originalDependencyMappingData, setOriginalDependencyMappingData] = useState([]);
  // const [dependencyColumnNames, setDependencyColumnNames] = useState([]);
  const [updatedDataToSubmit, setUpdatedDataToSubmit] = useState([]);
  const [CDPTPageData, setCDPTPageData] = useState([]);
  const [IQData, setIQData] = useState([]);
  const [RDTData, setRDTData] = useState([]);
  const [GABriefData, setGABriefData] = useState([]);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [tableRender, setTableRender] = useState(false);
  const [isSearch, isSearchSet] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [filteredDependencyMappingData, setFiltersDependencyMappingData] =
    useState([]);
  const [dropdownDataForLayoutAndDesign, setDropdownDataForLayoutAndDesign] =
    useState([]);
  const [selected, setSelected] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [actionDialog, setActionDialog] = useState(false);
  const [loader, setLoader] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const [customizeViewFields, setCustomizeViewFields] = useState(
    localStorage.getItem("customizeViewDependancyFields")
  );
  const selectedProjectDetails = projectSetup.selectedProject;
  const ProjectID = selectedProjectDetails?.Project_ID;
  const navigate = useNavigate();
  const userHasAccess = !hasAllAccess();

  useEffect(() => {
    // Initialize OriginalDependencyMappingData when DependencyMappingData changes
    if (dependencyMappingData) {
      setOriginalDependencyMappingData(cloneDeep(dependencyMappingData));
    }
  }, []);

    const updateDropDownDataTableView = (value, columnName, id) => {
    const data = filteredDependencyMappingData && filteredDependencyMappingData.length ? filteredDependencyMappingData : dependencyMappingData;
    const updatedData = data.map((data) => {
      if (data.DSBP_PMP_PIMaterialID === id) {
        if (!data[columnName] && columnName === "AWM_CIC_Needed")
          data["AWM_CIC_Needed"] = value;
        if (!data[columnName] && columnName === "AWM_Supporting_PMP_Design")
          data["AWM_Supporting_PMP_Design"] = value;
        if (!data[columnName] && columnName === "AWM_Supporting_PMP_Layout")
          data["AWM_Supporting_PMP_Layout"] = value;
        if (!data[columnName] && columnName === "AWM_Other_Reference")
          data["AWM_Other_Reference"] = value;
        if (!data[columnName] && columnName === "AWM_RDT_Page")
          data["AWM_RDT_Page"] = value;
        if (!data[columnName] && columnName === "AWM_CDPT_Page")
          data["AWM_CDPT_Page"] = value;
         if (!data[columnName] && columnName === "AWM_IQ_Page")
          data["AWM_IQ_Page"] = value;
        else data[columnName] = value;
        data["updated"] = true;
      }

      if (data["AWM_CIC_Needed"] === "Yes") {
      
      data["AWM_Supporting_PMP_Design"] = "";
      data["AWM_Supporting_PMP_Layout"] = "";
      }

      return data;
    });
    const filteredDataToSubmit = updatedData.filter(
      (item) => item.updated === true
    );
    const dataForNo = updatedData.filter(
      (data) => data?.AWM_CIC_Needed === "Yes" && data
    );
    const dropdownDataForLayoutAndDesign1 = dataForNo.map(
      (item) => item.DSBP_PMP_PIMaterialNumber
    );

    let filteredData = filteredDataToSubmit.filter(
      (ele) =>
        (ele?.AWM_CIC_Needed === "No" &&  (ele?.AWM_Supporting_PMP_Layout === "" || ele?.AWM_Supporting_PMP_Layout === " ") ) || 
        (ele?.AWM_Other_Reference !== "" && ele?.AWM_CIC_Needed === "N/A" && ele?.AWM_Other_Reference?.length !== 8 ) || 
        (ele?.AWM_CIC_Needed === "Yes" && ele?.AWM_GA_Brief === " ")
    );
    let setSubmitEnable = filteredData?.length ? true : false;

    console.log("filteredDataToSubmit 1", filteredData, filteredDataToSubmit);

    setIsSubmitEnabled(!setSubmitEnable);

    setDropdownDataForLayoutAndDesign(dropdownDataForLayoutAndDesign1);
    setDependencyMappingData(updatedData);
    setSubmittedData(filteredDataToSubmit);
    setDataUpdated(!dataUpdated);
  };

  const updateDropDownData = (value, columnName, id) => {
    const updatedData = dependencyMappingData.map((data) => {
      const isMatchingId = selected.some(
        (selectedData) =>
          selectedData.DSBP_PMP_PIMaterialID === data.DSBP_PMP_PIMaterialID
      );

      if (!isMatchingId && data.DSBP_PMP_PIMaterialID !== id) {
        return data;
      }

      const columnsToUpdate = [
        "AWM_CIC_Needed",
        "AWM_Supporting_PMP_Design",
        "AWM_Supporting_PMP_Layout",
        "AWM_Other_Reference",
        "AWM_RDT_Page",
        "AWM_GA_Brief",
        "AWM_CIC_Matrix",
      ];

      if (columnsToUpdate.includes(columnName)) {
        data[columnName] = value;
      } else {
        data[columnName] = value;
      }

      data["updated"] = true;
      return data;
    });

    const filteredDataToSubmit = updatedData.filter(
      (item) => item.updated === true
    );
    const dataForNo = updatedData.filter(
      (data) => data?.AWM_CIC_Needed === "No" && data
    );
    const dropdownDataForLayoutAndDesign1 = dataForNo.map(
      (item) => item.DSBP_PMP_PIMaterialID
    );

    let filteredData = filteredDataToSubmit.filter(
      (ele) =>
        ele?.AWM_CIC_Needed === "No" && ele?.AWM_Supporting_PMP_Layout === ""
    );
    let setSubmitEnable = filteredData.length ? false : true;

    console.log("filteredDataToSubmit", updatedData, filteredData);

    setIsSubmitEnabled(setSubmitEnable);

    setDropdownDataForLayoutAndDesign(dropdownDataForLayoutAndDesign1);
    setDependencyMappingData(updatedData);
    setSubmittedData(filteredDataToSubmit);
    setDataUpdated(!dataUpdated);
  };

  useEffect(() => {
    setLoader(true);
    fetchData();
  }, [ProjectID]);

  useEffect(() => {
    setSubmittedData(submittedData);
  }, [submittedData]);

  const onSort = (column, direction) => {
    const sortedData = onSortData(column, direction, dependencyMappingData);
    setDependencyMappingData(sortedData);
  };

  const handleSelect = (item) => {
    if (selected?.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      if (selected.length === 0) {
        const selectedList = [];
        selectedList.push(item);
        setSelected(selectedList);
      } else {
        setSelected([...selected, item]);
      }
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectAllChecked(true);
      if(filteredDependencyMappingData && filteredDependencyMappingData.length){
        setSelected(filteredDependencyMappingData);
      } else{
        setSelected(dependencyMappingData);
      }
      
    } else {
      setSelectAllChecked(false);
      setSelected([]);
    }
  };

  async function fetchData() {
    setTableLoader(true);
    const {
      dependencyTableData,
      isRDTData,
      isIQData,
      isCDPTData,
      isGABrifData,
    } = await getDependencyMappingDetails(ProjectID);

    setLoader(false);

    if (dependencyTableData && dependencyTableData.length) {
      let data = dependencyTableData.filter(
        (data) =>
          data?.AWM_CIC_Page?.[0]?.AWM_CIC_Needed === "Yes" &&
          data.DSBP_PMP_PIMaterialID
      );
      let dropdownDataForLayoutAndDesign1 = data?.map(
        (item) => item.DSBP_PMP_PIMaterialNumber
      );
      setDropdownDataForLayoutAndDesign(dropdownDataForLayoutAndDesign1);
    }

    if (dependencyTableData && dependencyTableData.length) {
      const transformedData = dependencyTableData.map((item) => {
        let transformedItem = {
          DSBP_InitiativeID: item.DSBP_InitiativeID,
          DSBP_PMP_PIMaterialDescription: item.DSBP_PMP_PIMaterialDescription,
          DSBP_PMP_PIMaterialID: item.DSBP_PMP_PIMaterialID,
          DSBP_PMP_PIMaterialNumber: item.DSBP_PMP_PIMaterialNumber,
        };

        transformedItem.AWM_RDT_Page =
          item?.Preselected_AWM_RDT_Page?.map(
            (item) => item.AWM_Design_Job_ID
          ) || [];

        transformedItem.AWM_CDPT_Page =
          item?.Preselected_AWM_CDPT_Page?.map(
            (item) => item.AWM_Design_Job_ID
          ) || [];

        transformedItem.AWM_IQ_Page =
          item?.Preselected_AWM_IQ_Page?.map(
            (item) => item.AWM_Design_Job_ID
          ) || [];

        // Preselected_GABrief_Page
        transformedItem.AWM_GA_Brief =
          item?.Preselected_GABrief_Page?.[0]?.AWM_GABrief || " ";

        transformedItem = {
          ...transformedItem,
          AWM_CIC_Needed: item?.AWM_CIC_Page?.[0]?.AWM_CIC_Needed || "",
          AWM_Supporting_PMP_Layout:
            item?.AWM_CIC_Page?.[0]?.AWM_Supporting_PMP_Layout || "",
          AWM_Supporting_PMP_Design:
            item?.AWM_CIC_Page?.[0]?.AWM_Supporting_PMP_Design || "",
          AWM_Other_Reference:
            item?.AWM_CIC_Page?.[0]?.AWM_Other_Reference || "",
          AWM_CIC_Matrix: item?.AWM_CIC_Page?.[0]?.AWM_CIC_Matrix || "",
          AWM_CIC_Matrix_Requested:
            item?.AWM_CIC_Page?.[0]?.AWM_CIC_Matrix_Requested || "",
        };

        transformedItem = {
          ...transformedItem,
          DSM_PICountry_Countries: item.DSM_PICountry_Countries,
          DSM_PILanguage_Languages: item.DSM_PILanguage_Languages,
          DSM_PMP_PMPPackagingComponentType:
            item.DSM_PMP_PMPPackagingComponentType,
          DSM_PMP_PackagingSize: item.DSM_PMP_PackagingSize,
          DSM_PMP_PrinterPrimary: item.DSM_PMP_PrinterPrimary,
          DSM_PMP_PrinterSecondary: item.DSM_PMP_PrinterSecondary,
          DSM_PMP_PrintingProcess: item.DSM_PMP_PrintingProcess,
          DSM_PMP_SubstrateColor: item.DSM_PMP_SubstrateColor,
          DSM_PMP_TD_TDStatus: item.DSM_PMP_TD_TDStatus,
          DSM_PMP_TD_TDValue: item.DSM_PMP_TD_TDValue,
          DSM_PO_PMP_poMaterialNumber: item.DSM_PO_PMP_poMaterialNumber,
          ...item?.FPCStagingPage?.[0],
        };
        return transformedItem;
      });
      let columnNames = Object.keys(transformedData[0]);
      const filteredColumnNames = columnNames.filter(
        (property) => property !== "FPCStagingPage"
      );
      let columnInLocal = JSON.parse(
        localStorage.getItem("setDependencyMappingColumnNames")
      );

      if (!columnInLocal || !columnInLocal.length) {
        let groupedColumnNames = [];

        filteredColumnNames.map((colName, index) => {
          let groupedObject = {};
          let splittedCol = colName.split("_");
          groupedObject["field"] = colName;
          groupedObject["width"] = 150;
          groupedObject["freeze"] = false;
          groupedObject["Sequence"] = index;
          if (splittedCol[0] === "DSBP") {
            groupedObject["group"] = 1;
          }
          if (splittedCol[0] === "AWM") {
            groupedObject["group"] = 2;
          }
          if (splittedCol[0] === "DSM") {
            groupedObject["group"] = 3;
          }
          groupedColumnNames.push(groupedObject);
          return groupedColumnNames;
        });

        localStorage.setItem(
          "setDependencyMappingColumnNames",
          JSON.stringify(groupedColumnNames)
        );
      }

      setCDPTPageData(isCDPTData);
      setIQData(isIQData);
      setRDTData(isRDTData);
      setGABriefData(isGABrifData);
      if(filteredDependencyMappingData && filteredDependencyMappingData.length){
        const uniqueMaterialNumbers = new Set(filteredDependencyMappingData.map(item => item.DSBP_PMP_PIMaterialNumber));

        // Filter transformedArray based on uniqueMaterialNumbers
        const filteredTransformedArray = transformedData.filter(item =>
          uniqueMaterialNumbers.has(item.DSBP_PMP_PIMaterialNumber)
        );
        setFiltersDependencyMappingData(filteredTransformedArray);
      } else{
        setDependencyMappingData(transformedData);
      }
      setOriginalDependencyMappingData(cloneDeep(transformedData));
      
    }
    setTableLoader(false);
  }
  const isSubmitEnable = submittedData.length && !actionDialog ? true : false;

  const resetTableData = () => {
    if (originalDependencyMappingData) {
      setDependencyMappingData([...originalDependencyMappingData]);
    }
  };
  const handleCancel = () => {
    resetTableData();
  };

  const onSubmit = async () => {
    //add your logic here
    setLoader(true);
    let submittedJson = [];
    if (isSubmitEnable || actionDialog) {
      submittedData.map((ele) => {
        let submittedObject = {};

        // cdpt
        let DSBP_CDPT_Page = [];
        let DSBP_CDPT_Page_data = [];
        if (ele.AWM_CDPT_Page) {
          DSBP_CDPT_Page = CDPTPageData?.length && CDPTPageData.filter(
            (cdptData) =>
              ele.AWM_CDPT_Page.includes(cdptData.AWM_Design_Job_ID) && cdptData
          );
          DSBP_CDPT_Page_data = DSBP_CDPT_Page?.length && DSBP_CDPT_Page.map((item) => ({
            Design_Job_Name: item.AWM_Design_Job_Name,
            Design_Job_ID: item.AWM_Design_Job_ID,
          }));
        }
        submittedObject.DSBP_CDPT_Page = DSBP_CDPT_Page_data || [];
        //rdt
        let DSBP_RDT_Page = [];
        let DSBP_RDT_Page_data = [];
        if (ele.AWM_RDT_Page) {
          DSBP_RDT_Page = RDTData?.length && RDTData.filter((rdtData) => {
            if (ele.AWM_RDT_Page.includes(rdtData.AWM_Design_Job_ID))
              return rdtData;
          });
          DSBP_RDT_Page_data = DSBP_RDT_Page?.length && DSBP_RDT_Page.map((item) => ({
            Design_Job_Name: item.AWM_Design_Job_Name,
            Design_Job_ID: item.AWM_Design_Job_ID,
          }));
        }
        submittedObject.DSBP_RDT_Page = DSBP_RDT_Page_data || [];

        //IQ
        let DSBP_IQ_Page = [];
        let DSBP_IQ_Page_data = [];
        if (ele.AWM_IQ_Page) {
          DSBP_IQ_Page = IQData?.length && IQData.filter((iqData) => {
            if (ele.AWM_IQ_Page.includes(iqData.AWM_Design_Job_ID))
              return iqData;
          });
          DSBP_IQ_Page_data = DSBP_IQ_Page?.length && DSBP_IQ_Page.map((item) => ({
            Design_Job_Name: item.AWM_Design_Job_Name,
            Design_Job_ID: item.AWM_Design_Job_ID,
          }));
        }
        submittedObject.DSBP_IQ_Page = DSBP_IQ_Page_data || [];

        submittedObject.DSBP_InitiativeID = ele.DSBP_InitiativeID;
        submittedObject.DSBP_PMP_PIMaterialID = ele.DSBP_PMP_PIMaterialID;
        submittedObject.DSBP_PMP_PIMaterialNumber =
          ele.DSBP_PMP_PIMaterialNumber;
        submittedObject["AWM_CICNeeded"] = ele.AWM_CIC_Needed;
        submittedObject["AWM_SupportingPMPLayout"] =
          ele.AWM_Supporting_PMP_Layout ? ele.AWM_Supporting_PMP_Layout : "";
        submittedObject["AWM_SupportingPMPDesign"] =
          ele.AWM_Supporting_PMP_Design ? ele.AWM_Supporting_PMP_Design : "";
        submittedObject["AWM_OtherReference"] = ele.AWM_Other_Reference
          ? ele.AWM_Other_Reference
          : "";
        submittedObject["AWM_GABrief"] = ele?.AWM_GA_Brief?.length
          ? ele.AWM_GA_Brief === "Add GA Brief"
            ? ""
            : ele.AWM_GA_Brief
          : "";

        submittedJson.push(submittedObject);
      });
    }
    const newAWMGAItemsCount = submittedData.filter(
      (item) => item.AWM_GA_Brief === "Add GA Brief"
    ).length;

    let formData = {
      DSBPValues: submittedJson,
    };

    // Call the API based on the count
    for (let i = 0; i < newAWMGAItemsCount; i++) {
      handleNewGaBrief(); // Replace this with your API call function
    }

    let resp = await onSubmitDependencyMappingAction(formData, ProjectID);
    if (resp.status === 200 || resp.status === 201) {
      setSubmittedData([]);
    }
    if (actionDialog) {
      setActionDialog(false);
      await fetchData();
    }
    setSelected([]);
    setSelectAllChecked(false);
    setLoader(false);
  };

  const onClickClearFilter = () => {
    let columnNamesData = JSON.parse(
      localStorage.getItem("setDependencyMappingColumnNames")
    );
    columnNamesData?.map((ele) => {
      if (ele) {
        ele["sortZtoA"] = false;
        ele["sortAtoZ"] = false;
        ele["freeze"] = false;
        ele["width"] = 150;
        ele["reorder"] = false;
      }
    });
    localStorage.setItem(
      "setDependencyMappingColumnNames",
      JSON.stringify(columnNamesData)
    );
    setDataUpdated(!dataUpdated);
    setDependencyMappingData(dependencyMappingData);
    setFiltersDependencyMappingData([]);
    setTableRender(!tableRender);
    setSelectedFields([]);
  };

  const onGlobalFilterChange = (e, colName) => {
    const value = e.value;
    let temp = cloneDeep(selectedFields);
    temp[colName] = value;
    setSelectedFields(temp);
    // setSelectedFields(value);

    let allValues = [];
    let keys = Object.keys(temp);
    keys.forEach((key) => {
      allValues = [...allValues, ...temp[key]];
    });

    const artworkValues = value;

    if (artworkValues.length) {
      let filteredDsbpData = dependencyMappingData.filter((item) => {
        if (item && item[colName]) {
          const hasWords = artworkValues.some((word) =>
            Number.isInteger(word)
              ? item[colName] === word
              : item[colName]?.includes(word)
          );
          if (hasWords) {
            return item;
          }
        }
      });
      setFiltersDependencyMappingData(filteredDsbpData);
    } else setFiltersDependencyMappingData([]);
  };

  let columnNamesData = JSON.parse(
    localStorage.getItem("setDependencyMappingColumnNames")
  );
  let columnNames = [];
  if (columnNamesData) {
    columnNames = columnNamesData?.map((item) => item.field);
  }

  const onSearchClick = () => {
    isSearchSet(!isSearch);
  };

  let isFilterActivatedInDependencyMapping = [];

  if (columnNamesData) {
    isFilterActivatedInDependencyMapping = columnNamesData.filter((ele) => {
      if (
        ele.freeze === true ||
        ele.sortAtoZ === true ||
        ele.sortZtoA === true ||
        ele.width !== 150 ||
        ele?.reorder === true
      ) {
        return ele;
      }
    });
  }

  const handleNewGaBrief = async () => {
    let formData = {
      NewGABTask: "Yes",
      AWM_Project_ID: ProjectID,
      AWM_Task_ID: "",
      Project_Name: selectedProjectDetails?.Project_Name,
      BU: selectedProjectDetails?.BU,
      Region: selectedProjectDetails?.Project_region,
    };
    let res = await createNewGaBriefTask(formData);
    console.log("res", res);
  };

  return (
    <div className="dependency-mapping">
      {loader ? (
        <Loading />
      ) : (
        <>
          <ArtworkHeader
            headerName={headerName}
            selected={selected}
            label="Dependency Mapping"
            customizeViewFields={customizeViewFields}
            setCustomizeViewFields={setCustomizeViewFields}
            dependencyMappingData={dependencyMappingData}
            selectedProjectDetails={selectedProjectDetails}
            columnNames={columnNames}
            filteredDependencyMappingData={filteredDependencyMappingData}
            userHasAccess={userHasAccess}
            isDependencyMapping={true}
            actionDialog={actionDialog}
            setActionDialog={setActionDialog}
            CDPTPageData={CDPTPageData}
            IQData={IQData}
            RDTData={RDTData}
            GABriefData={GABriefData}
            onSearchClick={onSearchClick}
            onClickClearFilter={onClickClearFilter}
            isFilterActivatedInDependencyMapping={
              isFilterActivatedInDependencyMapping
            }
            updateDropDownData={updateDropDownData}
            onSubmit={onSubmit}
            handleNewGaBrief={handleNewGaBrief}
            isSubmitEnable={isSubmitEnable}
            setSubmittedData={setSubmittedData}
            submittedData={submittedData}
            dsbpPmpData={dependencyMappingData}
          />
          {loader ? (
            <Loading />
          ) : (
            <DependencyMappingList              
              dependencyMappingData={dependencyMappingData}
              // dependencyColumnNames={dependencyColumnNames}
              CDPTPageData={CDPTPageData}
              IQData={IQData}
              RDTData={RDTData}
              GABriefData={GABriefData}
              dropdownDataForLayoutAndDesign={dropdownDataForLayoutAndDesign}
              updateDropDownData={updateDropDownDataTableView}
              userHasAccess={userHasAccess}
              customizeViewFields={customizeViewFields}
              setCustomizeViewFields={setCustomizeViewFields}
              onSort={onSort}
              onGlobalFilterChange={onGlobalFilterChange}
              filteredDependencyMappingData={filteredDependencyMappingData}
              setFiltersDependencyMappingData={setFiltersDependencyMappingData}
              setDataUpdated={setDataUpdated}
              dataUpdated={dataUpdated}
              selectedFields={selectedFields}
              setSelectedFields={setSelectedFields}
              setTableRender={setTableRender}
              tableRender={tableRender}
              handleSelect={handleSelect}
              handleSelectAll={handleSelectAll}
              selected={selected}
              selectAllChecked={selectAllChecked}
              isSearch={isSearch}
              columnNames={columnNames}
              handleNewGaBrief={handleNewGaBrief}
              headerName={headerName}
            />
          )}
          <FooterButtons
            handleCancel={handleCancel}
            hideSaveButton={true}
            onSubmit={onSubmit}
            formValid={!isSubmitEnable || !isSubmitEnabled}
            checkReadWriteAccess={!false}
            submitAndSave="Save"
          />
        </>
      )}
    </div>
  );
};

export default DependencyMapping;
