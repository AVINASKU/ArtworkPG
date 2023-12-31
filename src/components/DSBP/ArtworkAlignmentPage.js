import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cloneDeep, isArray } from "lodash";
import ArtworkHeader from "./ArtworkHeader";
import SelectDsbpId from "./SelectDsbpId";
import ProjectNameHeader from "./ProjectNameHeader";
import DsbpCommonPopup from "./DsbpCommonPopup";
import AgilityList from "./AgilityList";
import { getDSBPDropdownData } from "../../store/actions/DSBPActions";
import {
  addDsbpToProject,
  deleteDsbpFromProject,
  getDsbpPMPDetails,
  onSubmitDsbpAction,
  onSubmitCreatePOAA
} from "../../apis/dsbpApi";
import { useDispatch, useSelector } from "react-redux";
import FooterButtons from "../AWMJobs/DesignJobs/FooterButtons";
import "./index.scss";
import { onSortData, Loading } from "../../utils";

const ArtworkAlignment = () => {
  const navigate = useNavigate();
  const [dropdownlist, setDropdownList] = useState(null);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selected, setSelected] = useState([]);
  const DropDownData = useSelector((state) => state.DSBPDropdownReducer);
  const [dsbpPmpData, setDsbpPmpData] = useState(null);
  const [originalDsbpPmpData, setOriginalDsbpPmpData] = useState(null);
  const [selectedFields, setSelectedFields] = useState({});
  const [filteredDsbpData, setFilteredDsbpData] = useState(null);
  const [totalNoOfDsbpId, setTotalNoOfDsbpId] = useState(0);
  const [totalNoOfPMP, setTotalNoOfPMP] = useState(0);
  const [totalNoOfPOA, setTotalNoOfPOA] = useState(0);
  const [totalNoOfPMPLocked, setTotalNoOfPMPLocked] = useState(0);
  const [totalNoOfAddedProject, setTotalNoOfAddedProject] = useState(0);
  const [actionDialog, setActionDialog] = useState(false);
  const [loader, setLoader] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);
  const [fieldUpdated, setFieldUpdated] = useState(false);
  const [buWiseSortedColumnNames, setBuWiseSortedColumnNames] = useState(null);
  const [listOfInitiativeId, setListOfInitiativeId] = useState([]);
  const [addSavedData, setSavedData] = useState([]);
  const [handleYesAddToPRoject, setHandleYesAddToPRoject] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [poaaAcknowledgDialog, setPoaaAcknowledgDialog] = useState(false);
  const [poaaResponse, setPoaaResponse] = useState(false);
  const [tableRender, setTableRender] = useState(false);
  const [selectedReason, setSelectedReason] = useState(false);
  const projectSetup = useSelector((state) => state.ProjectSetupReducer);
  const selectedProjectDetails = projectSetup.selectedProject;
  const [mappedPOAS, setMappedPOAS] = useState([]);
  const [customizeViewFields, setCustomizeViewFields] = useState(
    localStorage.getItem("customizeViewFields")
  );
  const allBUAttributesData = useSelector(
    (state) => state.DropDownValuesReducer
  );
  const allBUAttributes = allBUAttributesData.DropDownValuesData;

  const { projectPlan } = useSelector(
    (state) => state.ProjectPlanReducer
  );
  const Task = "Start Artwork Alignment"
  let taskData = isArray(projectPlan) && projectPlan.find(
    (task) => task.data.Task === Task
  );

  const breadcrumb = [
    { label: "My Tasks", url: "/myTasks" },
    { label: "Approve Regional Design Template" },
  ];

  const dispatch = useDispatch();
  const headerName = "Artwork Scope Alignment";
  const BU = selectedProjectDetails?.BU;
  const Region = selectedProjectDetails?.Project_region;
  const ProjectID = selectedProjectDetails?.Project_ID;

  useEffect(() => {
    findAndSortBuWiseColumnNames();
  }, []);
  useEffect(() => {
    // Initialize originalDsbpPmpData when dsbpPmpData changes
    if (dsbpPmpData) {
      setOriginalDsbpPmpData(cloneDeep(dsbpPmpData));
    }
  }, [dsbpPmpData]);

  const findAndSortBuWiseColumnNames = () => {
    if (BU === "Baby Care") {
      let buWiseAttributeList =
        allBUAttributes?.ArtWorkProjectSetupPage?.Artwork_BU;
      let attributeList = [];
      if (buWiseAttributeList) {
        attributeList =
          buWiseAttributeList.find((item) => item.BU_Name === BU)
            ?.Attribute_List || [];
      }
      let sortedData = [];
      if (attributeList && attributeList.length) {
        sortedData = [...attributeList].sort((a, b) => {
          return parseInt(a.Sequence) - parseInt(b.Sequence);
        });
      }
      setBuWiseSortedColumnNames(sortedData);
      let jsonColumnWidth = localStorage.getItem(
        "columnWidthDSBPArtworkBabyCare"
      );
      let columnWidth = JSON.parse(jsonColumnWidth);
      if (!columnWidth || !columnWidth.length) {
        if (sortedData && sortedData.length) {
          sortedData.map((list) => {
            list["width"] = 250;
            list["freeze"] = false;
            list["sortAtoZ"] = false;
            list["sortZtoA"] = false;
            list["reorder"] = false;
          });
        }
        localStorage.setItem(
          "columnWidthDSBPArtworkBabyCare",
          JSON.stringify(sortedData)
        );
      }

      if (columnWidth && columnWidth.length) {
        let sortedData1 = [];
        sortedData1 = [...columnWidth].sort((a, b) => {
          return parseInt(a.Sequence) - parseInt(b.Sequence);
        });
        localStorage.setItem(
          "columnWidthDSBPArtworkBabyCare",
          JSON.stringify(sortedData1)
        );
      }
    }
    if (BU === "Home Care") {
      let buWiseAttributeList =
        allBUAttributes?.ArtWorkProjectSetupPage?.Artwork_BU;
      let attributeList = [];
      if (buWiseAttributeList) {
        attributeList =
          buWiseAttributeList.find((item) => item.BU_Name === BU)
            ?.Attribute_List || [];
      }
      let sortedData = [];
      if (attributeList && attributeList.length) {
        sortedData = [...attributeList].sort((a, b) => {
          return parseInt(a.Sequence) - parseInt(b.Sequence);
        });
      }
      setBuWiseSortedColumnNames(sortedData);
      let jsonColumnWidth = localStorage.getItem(
        "columnWidthDSBPArtworkHomeCare"
      );
      let columnWidth = JSON.parse(jsonColumnWidth);

      if (!columnWidth || !columnWidth.length) {
        if (sortedData && sortedData.length) {
          sortedData.map((list) => {
            list["width"] = 250;
            list["freeze"] = false;
            list["sortAtoZ"] = false;
            list["sortZtoA"] = false;
            list["reorder"] = false;
          });
        }
        localStorage.setItem(
          "columnWidthDSBPArtworkHomeCare",
          JSON.stringify(sortedData)
        );
      }

      if (columnWidth && columnWidth.length) {
        let sortedData1 = [];
        sortedData1 = [...columnWidth].sort((a, b) => {
          return parseInt(a.Sequence) - parseInt(b.Sequence);
        });
        localStorage.setItem(
          "columnWidthDSBPArtworkHomeCare",
          JSON.stringify(sortedData1)
        );
      }
    }
  };

  async function fetchData() {
    setTableLoader(true);
    const resp = await getDsbpPMPDetails(ProjectID);
    if (!resp) {
      setDsbpPmpData(null);
      setOriginalDsbpPmpData(null)
    }
    if (resp && resp?.length !== 0) {
      const transformedArray = resp?.flatMap((item) =>
        item.DSBP_PMP_PIMaterialIDPage?.map((person) => ({
          DSBP_InitiativeID: item.DSBP_InitiativeID,
          ...person,
        }))
      );

      const filteredIds = Array.from(
        new Set(
          transformedArray
            .filter((item) => item.RTA_POANumber !== "")
            .map((item) => item.DSBP_InitiativeID)
        )
      );

      setMappedPOAS(filteredIds);
      if(filteredDsbpData && filteredDsbpData.length){
        const uniqueMaterialNumbers = new Set(filteredDsbpData.map(item => item.DSBP_PMP_PIMaterialNumber));

        // Filter transformedArray based on uniqueMaterialNumbers
        const filteredTransformedArray = transformedArray.filter(item =>
          uniqueMaterialNumbers.has(item.DSBP_PMP_PIMaterialNumber)
        );
        setFilteredDsbpData(filteredTransformedArray);
      } else{
        setDsbpPmpData(transformedArray);
      }
      
      setOriginalDsbpPmpData(cloneDeep(transformedArray));
      setTotalNoOfPMP(transformedArray.length);

      const initiativeIDs = transformedArray.map(
        (task) => task.DSBP_InitiativeID
      );
      const uniqueIDs = [...new Set(initiativeIDs)];
      uniqueIDs.sort((a, b) => a - b);
      setListOfInitiativeId(uniqueIDs);

      const count = transformedArray.reduce((acc, obj) => {
        if (obj?.RTA_POANumber !== "") {
          return acc + 1;
        }
        return acc;
      }, 0);

      setTotalNoOfPOA(count);
      const noOfAddedProject = transformedArray.reduce((acc, obj) => {
        if (obj?.AWM_AddedToProject === "Yes") {
          return acc + 1;
        }
        return acc;
      }, 0);
      setTotalNoOfAddedProject(noOfAddedProject);

      const notOfPMPLocked = transformedArray.reduce((acc, obj) => {
        if (obj?.DSBP_PMP_AWReadinessGateStatus === "LOCKED") {
          return acc + 1;
        }
        return acc;
      }, 0);

      setTotalNoOfPMPLocked(notOfPMPLocked);
    } else {
      setDsbpPmpData([])
      setTotalNoOfPOA(0);
      setTotalNoOfPMP(0);
      setTotalNoOfPMPLocked(0);
      setTotalNoOfAddedProject(0);
    }
    setTotalNoOfDsbpId(resp?.length || 0);
    setTableLoader(false);
  }

  useEffect(() => {
    const fetchDataAndDispatch = async () => {
      await fetchData();
      dispatch(getDSBPDropdownData(BU, Region, ProjectID));
    };

    fetchDataAndDispatch();
  }, [dispatch]);

  useEffect(() => {
    updateDropdownList(listOfInitiativeId);
  }, [DropDownData]);

  const updateDropdownList = (selectedID) => {
    setListOfInitiativeId(selectedID);
    let listOfInitiativeId = selectedID.sort((a, b) => a - b);;
    let { ArtworkAgilityTasks, AssignedListofDSBPIDs } =
      DropDownData?.DSBPDropdownData;
    let mappedListOfDSBPId = [];
    let unMappedListOfDSBPId = [];
    let alreadyAssignedListOfDSBPId = [];
    if (listOfInitiativeId && listOfInitiativeId?.length) {
      mappedListOfDSBPId = ArtworkAgilityTasks?.filter((item) =>
        listOfInitiativeId.includes(item.InitiativeID)
      )
        .map((item) => ({
          ...item,
          sequence: 1,
        }))
        .sort((a, b) => a.InitiativeID - b.InitiativeID)||[];
    }

    unMappedListOfDSBPId = ArtworkAgilityTasks?.filter(
      (item) => !listOfInitiativeId?.includes(item.InitiativeID)
    )
      .map((item) => ({
        ...item,
        sequence: 2,
      }))
      .sort((a, b) => a.InitiativeID - b.InitiativeID)||[] ;

    alreadyAssignedListOfDSBPId = AssignedListofDSBPIDs?.map((item) => ({
      ...item,
      sequence: 3,
    })).sort((a, b) => a.InitiativeID - b.InitiativeID) || [];

    let fullDropDownData = [
      ...mappedListOfDSBPId,
      ...unMappedListOfDSBPId,
      ...alreadyAssignedListOfDSBPId,
    ];
    setDropdownList(fullDropDownData);
    setFieldUpdated(!fieldUpdated);
  };

  const addDSBPIntoProject = async (InitiativeID, operation) => {
    setTableLoader(true);
    if (operation === "add") {
      let checkRes = await addDsbpToProject(ProjectID, InitiativeID);
      console.log("checkRes", checkRes);
    }
    if (operation === "delete") {
      let checkRes = await deleteDsbpFromProject(ProjectID, InitiativeID);
      console.log("check delete Res", checkRes);
    }
    // fetch dsbp project data after delete / add
    await fetchData();
    setTableLoader(false);
  };

  const onSort = (column, direction) => {
    const sortedData = onSortData(column, direction, dsbpPmpData);
    setDsbpPmpData(sortedData);
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
      if(filteredDsbpData && filteredDsbpData.length){
        setSelected(filteredDsbpData);
      } else{
        setSelected(dsbpPmpData);
      }
    } else {
      setSelectAllChecked(false);
      setSelected([]);
    }
  };

  const onSubmit = async () => {
    setLoader(true);
    if (addSavedData && addSavedData.length) {
      const updatedPmpDetails = { ArtworkAgilityPMPs: addSavedData };
      await onSubmitDsbpAction(updatedPmpDetails);
      await fetchData();
    }
    setSavedData([]);
    setLoader(false);
  };

  const onActionSubmit = async (formData, data) => {
    setLoader(true);
    let updatedData = {};
    let updatedDataList = [];
    const selectionData = data ? data : selected;
    if(formData?.POAPackageName !== undefined){
      updatedDataList = selectionData?.map((pmpDetails) => {
        updatedData = {
          DSBP_InitiativeID: pmpDetails.DSBP_InitiativeID,
          DSBP_PMP_PIMaterialID: pmpDetails.DSBP_PMP_PIMaterialID
        };
        return updatedData;
      });
    } else{
      updatedDataList = selectionData?.map((pmpDetails) => {
        updatedData = {
          DSBP_InitiativeID: pmpDetails.DSBP_InitiativeID,
          DSBP_PMP_PIMaterialID: pmpDetails.DSBP_PMP_PIMaterialID,
          DSBP_PMP_PIMaterialNumber: pmpDetails.DSBP_PMP_PIMaterialNumber,
          FK_AWMProjectID: ProjectID,
        };
        if (formData === "AddToProject") {
          updatedData.AWM_AddedToProject = "Yes";
          setHandleYesAddToPRoject(false);
        }
        if (formData.AWM_AISE !== undefined) {
          updatedData.AWM_AISE = formData?.AWM_AISE;
        }
        if (formData?.AWM_AssemblyMechanism !== undefined) {
          updatedData.AWM_AssemblyMechanism = formData?.AWM_AssemblyMechanism;
        }
        if (formData?.AWM_Biocide !== undefined) {
          updatedData.AWM_Biocide = formData?.AWM_Biocide;
        }
        if (formData?.AWM_GroupPMP !== undefined) {
          updatedData.AWM_GroupPMP = formData?.AWM_GroupPMP;
        }
        if (formData?.ReasonforRejection !== undefined) {
          updatedData.AWM_AddedToProject = "Reject";
          updatedData.ReasonforRejection = formData?.ReasonforRejection;
        }
        if (formData?.RejectionComment !== undefined) {
          updatedData.RejectionComment = formData?.RejectionComment;
        }
        if (formData?.AWM_Sellable !== undefined) {
          updatedData.AWM_Sellable = formData?.AWM_Sellable;
        }
        setRejectDialog(false);
        setSelectedReason(false);
        return updatedData;
      });
    }
    let updatedPmpDetails = {};
    if(formData?.POAPackageName !== undefined){
      updatedPmpDetails = {
        ArtworkAgilityPage: {
          AWM_Project_ID: ProjectID,
          Assignee: taskData?.data?.Assignee,
          POAPackageName: formData?.POAPackageName,
        },
        ArtworkAgilityPMPs: updatedDataList,
      };
      let res = await onSubmitCreatePOAA(updatedPmpDetails);
      setPoaaResponse(res?.some(item => item.POACreationStatus?.includes("Failed")));
      await setPoaaAcknowledgDialog(true)
    } else{
      updatedPmpDetails = { ArtworkAgilityPMPs: updatedDataList };
      await onSubmitDsbpAction(updatedPmpDetails);
    }    
    setActionDialog(false);
    dispatch(getDSBPDropdownData(BU, Region, ProjectID));
    await fetchData();
    setSelected([]);
    setSelectAllChecked(false);
    setLoader(false);
  };

  const resetTableData = () => {
    if (originalDsbpPmpData) {
      setDsbpPmpData([...originalDsbpPmpData]);
    }
  };

  const handleCancel = () => {
    setLoader(true);
    resetTableData();
    setLoader(false);
  };

  const onGlobalFilterChange = (e, colName) => {
    const value = e.value;
    let temp = cloneDeep(selectedFields);
    temp[colName] = value;
    setSelectedFields(temp);
    // setSelectedFields(value);

    let allValues=[];
    let keys = Object.keys(temp);
    keys.forEach((key)=>{
      allValues = [...allValues, ...temp[key]]
    })

    const artworkValues = allValues;
    if (artworkValues.length) {
      let filteredDsbpData = dsbpPmpData.filter((item) => {
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
      setFilteredDsbpData(filteredDsbpData);
    } else setFilteredDsbpData([]);
  };

  const onClickClearFilter = () => {
    let isBUHomeCare = false;
    if (BU === "Home Care") {
      isBUHomeCare = true;
    }
    buWiseSortedColumnNames.map((ele) => {
      if (ele) {
        ele["sortZtoA"] = false;
        ele["sortAtoZ"] = false;
        ele["freeze"] = false;
        ele["width"] = 250;
        ele["reorder"] = false;
      }
    });
    isBUHomeCare
      ? localStorage.setItem(
          "columnWidthDSBPArtworkHomeCare",
          JSON.stringify(buWiseSortedColumnNames)
        )
      : localStorage.setItem(
          "columnWidthDSBPArtworkBabyCare",
          JSON.stringify(buWiseSortedColumnNames)
        );
    setFieldUpdated(!fieldUpdated);
    setBuWiseSortedColumnNames(buWiseSortedColumnNames);
    setDsbpPmpData(dsbpPmpData);
    setTableRender(!tableRender);
    clearColumnWiseFilter();
  };

  const clearColumnWiseFilter = ()=>{
  setFilteredDsbpData(null);
  setSelectedFields([]);
  }

  let checkLength = addSavedData.length;
  return (
    <div className="artwork-dsbp myProjectAnddAllProjectList">
      {loader || totalNoOfDsbpId === null ? (
        <Loading />
      ) : (
        <>
          <ArtworkHeader
            breadcrumb={breadcrumb}
            headerName={headerName}
            selected={selected}
            onActionSubmit={onActionSubmit}
            label="Artwork Scope Alignment"
            hyperLink = "/projectPlan"
            actionDialog={actionDialog}
            setActionDialog={setActionDialog}
            setFieldUpdated={setFieldUpdated}
            fieldUpdated={fieldUpdated}
            buWiseSortedColumnNames={buWiseSortedColumnNames}
            setBuWiseSortedColumnNames={setBuWiseSortedColumnNames}
            setDsbpPmpData={setDsbpPmpData}
            dsbpPmpData={dsbpPmpData}
            setTableRender={setTableRender}
            tableRender={tableRender}
            selectedProjectDetails={selectedProjectDetails}
            customizeViewFields={customizeViewFields}
            setCustomizeViewFields={setCustomizeViewFields}
            setLoader={setLoader}
            onClickClearFilter={onClickClearFilter}
            filteredDsbpData={filteredDsbpData?.length}
          />
          <SelectDsbpId
            dropdownlist={dropdownlist}
            addDSBPIntoProject={addDSBPIntoProject}
            totalNoOfDsbpId={totalNoOfDsbpId}
            totalNoOfPMP={totalNoOfPMP}
            totalNoOfPOA={totalNoOfPOA}
            totalNoOfAddedProject={totalNoOfAddedProject}
            totalNoOfPMPLocked={totalNoOfPMPLocked}
            listOfInitiativeId={listOfInitiativeId}
            mappedPOAS={mappedPOAS}
            updateDropdownList={updateDropdownList}
          />
          {tableLoader ? (
            <Loading />
          ) : (
            <AgilityList
              selected={selected}
              setSelected={setSelected}
              selectAllChecked={selectAllChecked}
              handleSelect={handleSelect}
              handleSelectAll={handleSelectAll}
              dsbpPmpData={dsbpPmpData}
              filteredDsbpData={filteredDsbpData}
              clearColumnWiseFilter={clearColumnWiseFilter}
              onSort={onSort}
              onGlobalFilterChange={onGlobalFilterChange}
              selectedFields={selectedFields}
              setDsbpPmpData={setDsbpPmpData}
              onActionSubmit={onActionSubmit}
              buWiseSortedColumnNames={buWiseSortedColumnNames}
              setFieldUpdated={setFieldUpdated}
              fieldUpdated={fieldUpdated}
              setSavedData={setSavedData}
              addSavedData={addSavedData}
              handleYesAddToPRoject={handleYesAddToPRoject}
              setHandleYesAddToPRoject={setHandleYesAddToPRoject}
              rejectDialog={rejectDialog}
              setRejectDialog={setRejectDialog}
              tableRender={tableRender}
              setTableRender={setTableRender}
              customizeViewFields={customizeViewFields}
              setCustomizeViewFields={setCustomizeViewFields}
              selectedReason={selectedReason}
              setSelectedReason={setSelectedReason}
            />
          )}
          <FooterButtons
            handleCancel={handleCancel}
            hideSaveButton={true}
            onSubmit={onSubmit}
            formValid={!checkLength}
            checkReadWriteAccess={true}
            submitAndSave="Save"
          />
        </>
      )}
      {poaaAcknowledgDialog && (
        <DsbpCommonPopup
          actionHeader="POAA Acknowledgement"
          dasbpDialog={poaaAcknowledgDialog}
          setDasbpDialog={setPoaaAcknowledgDialog}
          poaaResponse={poaaResponse}
          okButtonShow={true}
          deleteButtonShow={false}
          showCancel={true}
          submitButtonShow={false}
          yesButtonShow={true}
          disconnectButtonShow={true}
        >
          {poaaResponse ? (
            <>
              POA Creation failed, your request was not received by Enovia and
              POA will not be created. Please try again, if problem persists,
              please open a ticket.
            </>
          ) : (
            <>
              POA Creation request submitted to Enovia.              
            </>
          )}
        </DsbpCommonPopup>
      )}
    </div>
  );
};

export default ArtworkAlignment;
