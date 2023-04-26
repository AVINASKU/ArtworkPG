import React, { useCallback, useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import AddNewDesign from "./AddNewDesign.js";
import DesignHeader from "./DesignHeader";
import AddNewDesignContent from "./AddNewDesignContent";
import { ProjectService } from "../../../service/PegaService";
import "./index.scss";

function DefineDesignIntent() {
  const [data, setData] = useState(null);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const data1 = ProjectService.getDIData();
    setData(data1);
    console.log("data in useeffect", data1);
  }, [data]);

  const handleDelete = (index) => {
    // const sub = subProject.filter((item, i) => i !== index);
    // console.log("index here", sub1);
    // const sub = subProject.splice(index,1);
    // console.log("sub", sub);
  };

  const addNewEmptyDesign = useCallback(() => {
    data.count = data.count + 1;
    // setData(data);
    setData((t) => [t]);
    // setUpdated(true);
    console.log("data", data);
  },[data]);

  console.log("updated data", data, data?.count);

  return (
    <PageLayout>
      <DesignHeader setAddNewDesign={addNewEmptyDesign} />
      <div
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          width: "100%",
          height: "400px",
        }}
      >
        {<AddNewDesign {...data} />}

        {data?.count &&
          Array.from({ length: data?.count }, (_, index) => (
            <div key={index}>
              {" "}
              <AddNewDesignContent
                key={index}
                index={index}
                {...data}
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
