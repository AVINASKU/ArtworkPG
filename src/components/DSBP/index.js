import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArtworkHeader from "./ArtworkHeader";
import SelectDsbpId from "./SelectDsbpId";
import ProjectNameHeader from "./ProjectNameHeader";
import AgilityList from "./AgilityList";
import { getDSBPDropdownData } from "../../store/actions/DSBPActions";
import {
  addDsbpToProject,
  deleteDsbpFromProject,
  getDsbpPMPDetails,
} from "../../apis/dsbpApi";
import { useDispatch, useSelector } from "react-redux";
import FooterButtons from "../AWMJobs/DesignJobs/FooterButtons";
import "./index.scss";
import { onSortData } from "../../utils";

const projectId = "A-2316";

const DSBP = () => {
  const navigate = useNavigate();
  const [dropdownlist, setDropdownList] = useState(null);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selected, setSelected] = useState([]);
  const DropDownData = useSelector((state) => state.DSBPDropdownReducer);
  const [dsbpPmpData, setDsbpPmpData] = useState(null);
  const [selectedFields, setSelectedFields] = useState(null);
  const [filteredDsbpData , setFilteredDsbpData]= useState(null);

  const breadcrumb = [
    { label: "My Tasks", url: "/myTasks" },
    { label: "Approve Regional Design Template" },
  ];

  const dispatch = useDispatch();
  const headerName = "Artwork Alignment";
  const BU = "BABY CARE";
  const Region = "EUROPE";
  console.log("dropdown data", DropDownData);

  useEffect(() => {
    async function fetchData() {
      const resp = await getDsbpPMPDetails("A-2474");
      console.log("resp", resp);
      if(resp && resp.length){
      const transformedArray = resp.flatMap((item) =>
        item.DSBP_PMP_PIMaterialIDPage.map((person) => ({
          DSBP_InitiativeID: item.DSBP_InitiativeID,
          ...person,
        }))
      );
      setDsbpPmpData(transformedArray);
      }
    }
    fetchData();
  }, [projectId]);

  useEffect(() => {
    dispatch(getDSBPDropdownData(BU, Region));
  }, [dispatch]);

  useEffect(() => {
    setDropdownList(DropDownData.DSBPDropdownData);
  }, [DropDownData]);

  const addDSBPIntoProject = async (InitiativeID, operation) => {
    console.log("dsbp id", InitiativeID, operation);
    const projectId = "A-2316";
    if (operation === "add") {
      console.log("add operation");
      let checkRes = await addDsbpToProject(projectId, InitiativeID);
      console.log("checkRes", checkRes);
    }
    if (operation === "delete") {
      console.log("delete operation");
      let checkRes = await deleteDsbpFromProject(projectId, InitiativeID);
      console.log("check delete Res", checkRes);
    }
    // fetch dsbp project data after delete / add
  };

  const onSort = (column, direction) => (event) => {
    const sortedData = onSortData(column, direction, dsbpPmpData);
    setDsbpPmpData(sortedData);
    console.log("sorted data", sortedData);
  };

  const handleSelect = (item) => {
    console.log("item", item);
    if (selected?.some((d) => d.InitiativeID === item.InitiativeID)) {
      setSelected(selected.filter((i) => i.InitiativeID !== item.InitiativeID));
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
      // setSelected(products);
    } else {
      setSelectAllChecked(false);
      setSelected([]);
    }
  };

  const handleCancel = () => {
    return navigate(`/myProjects`);
  };

  const onSubmit = () => {
    return navigate(`/myProjects`);
  };

  console.log("dropdownlist", dropdownlist);

  const onGlobalFilterChange = (e, colName) => {
    const value = e.value;
    console.log("value and e.value", value, e.value);
    setSelectedFields(value);
    const artworkValues = value;

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
      console.log("filtered dsbp data", filteredDsbpData);
      setFilteredDsbpData(filteredDsbpData);
    } else setFilteredDsbpData([]);
  };

  return (
    <div className="artwork-dsbp myProjectAnddAllProjectList">
      <ArtworkHeader
        breadcrumb={breadcrumb}
        headerName={headerName}
        selected={selected}
        label="Artwork Alignment"
      />
      <ProjectNameHeader />
      <SelectDsbpId
        dropdownlist={dropdownlist}
        addDSBPIntoProject={addDSBPIntoProject}
      />
      <AgilityList
        selected={selected}
        setSelected={setSelected}
        selectAllChecked={selectAllChecked}
        handleSelect={handleSelect}
        handleSelectAll={handleSelectAll}
        dsbpPmpData={dsbpPmpData}
        filteredDsbpData={filteredDsbpData}
        onSort={onSort}
        onGlobalFilterChange={onGlobalFilterChange}
        selectedFields={selectedFields}
      />
      <FooterButtons
        handleCancel={handleCancel}
        hideSaveButton={true}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default DSBP;
