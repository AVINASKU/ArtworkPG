import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import AddNewDesign from "./AddNewDesign.js";
import DesignHeader from "./DesignHeader";
import AddNewDesignContent from "./AddNewDesignContent";
import { ProjectService } from "../../../service/PegaService";
import "./index.scss";

function DefineDesignIntent() {
  const [data, setData] = useState(null);
  const [subProject, setSubProject] = useState([]);
  const [addNewDesign, setAddNewDesign] = useState(false);
  console.log("add new design", addNewDesign);

  useEffect(() => {
    const data = ProjectService.getDIData();

    setData(data);
    setSubProject(data.sub_project);

    console.log("data", data.sub_project);
  }, []);

  console.log("data", data);

  const addNewEmptyDesign = () => {
    subProject.push({});
    setSubProject(subProject);
    setAddNewDesign(!addNewDesign);
  };

  const handleDelete = (index) => {
    const sub = subProject.filter((item, i) => i !== index);
    // console.log("index here", sub1);
    // const sub = subProject.splice(index,1);
    console.log("sub", sub);
    setSubProject(sub);
  };

  return (
    <PageLayout>
      <DesignHeader
        setAddNewDesign={addNewEmptyDesign}
        addNewDesign={addNewDesign}
      />
      <div
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          width: "100%",
          height: "400px",
        }}
      >
        {<AddNewDesign {...data} />}

        { data?.count && Array.from({ length: 2 }, (_, index) => (
          <div key={index}>
            {" "}
            <AddNewDesignContent
              key={index}
              index={index}
              handleDelete={handleDelete}
            />
          </div>
        ))}

        {/* {subProject &&
          subProject.length &&
          subProject.map((item, index) => {
            return (
              <AddNewDesignContent
                key={item.id}
                {...item}
                index={index}
                handleDelete={handleDelete}
              />
            );
          })} */}
      </div>
    </PageLayout>
  );
}

export default DefineDesignIntent;
