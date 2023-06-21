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
const projectId = "A-2316";

const DSBP = () => {
  const navigate = useNavigate();
  const [dropdownlist, setDropdownList] = useState(null);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selected, setSelected] = useState([]);
  const DropDownData = useSelector((state) => state.DSBPDropdownReducer);
  const [dsbpPmpData, setDsbpPmpData] = useState(null);

  const products = [
    {
      InitiativeID: "1000",
      PMP: "894567",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      InitiativeID: "1001",
      PMP: "456389",
      code: "nvklal433",
      name: "Black Watch",
      description: "Product Description",
      image: "black-watch.jpg",
      price: 72,
      category: "Accessories",
      quantity: 61,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
    {
      InitiativeID: "1002",
      PMP: "674567",
      code: "zz21cz3c1",
      name: "Blue Band",
      description: "Product Description",
      image: "blue-band.jpg",
      price: 79,
      category: "Fitness",
      quantity: 2,
      inventoryStatus: "LOWSTOCK",
      rating: 3,
    },
    {
      InitiativeID: "1003",
      PMP: "223156",
      code: "244wgerg2",
      name: "Blue T-Shirt",
      description: "Product Description",
      image: "blue-t-shirt.jpg",
      price: 29,
      category: "Clothing",
      quantity: 25,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      InitiativeID: "1004",
      PMP: "902345",
      code: "h456wer53",
      name: "Bracelet",
      description: "Product Description",
      image: "bracelet.jpg",
      price: 15,
      category: "Accessories",
      quantity: 73,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
    {
      InitiativeID: "1005",
      PMP: "234512",
      code: "av2231fwg",
      name: "Brown Purse",
      description: "Product Description",
      image: "brown-purse.jpg",
      price: 120,
      category: "Accessories",
      quantity: 0,
      inventoryStatus: "OUTOFSTOCK",
      rating: 4,
    },
    {
      InitiativeID: "1006",
      PMP: "765645",
      code: "bib36pfvm",
      name: "Chakra Bracelet",
      description: "Product Description",
      image: "chakra-bracelet.jpg",
      price: 32,
      category: "Accessories",
      quantity: 5,
      inventoryStatus: "LOWSTOCK",
      rating: 3,
    },
    {
      InitiativeID: "1007",
      PMP: "778890",
      code: "mbvjkgip5",
      name: "Galaxy Earrings",
      description: "Product Description",
      image: "galaxy-earrings.jpg",
      price: 34,
      category: "Accessories",
      quantity: 23,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      InitiativeID: "1008",
      PMP: "901234",
      code: "vbb124btr",
      name: "Game Controller",
      description: "Product Description",
      image: "game-controller.jpg",
      price: 99,
      category: "Electronics",
      quantity: 2,
      inventoryStatus: "LOWSTOCK",
      rating: 4,
    },
  ];

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
      const resp = await getDsbpPMPDetails(projectId);
      console.log("resp", resp);
      let mappedData = null;
      if (resp && resp.length) {
        console.log("resp");
        mappedData = resp.map((ele) => {
          let flattenedData = null;
          if (ele && ele.DSBP_PMP_PIMaterialIDPage) {
            console.log("data --->", ele);
            flattenedData = ele.DSBP_PMP_PIMaterialIDPage.map((data) => {
              return {
                ...data,
                DSBP_InitiativeID: ele.DSBP_InitiativeID,
              };
            });
          }
          console.log("flattendData", flattenedData);
          return flattenedData;
        });
        // let mappedData = resp.DSBP_PMP_PIMaterialIDPage.forEach((data) => {
        //   data["DSBP_InitiativeID"] = resp.DSBP_InitiativeID;
        // });

        console.log("mapped data", mappedData);
      }
      setDsbpPmpData(mappedData[0]);
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
      setSelected(products);
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
        products={products}
        dsbpPmpData={dsbpPmpData}
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
