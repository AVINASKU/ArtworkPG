import React, { useCallback, useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import AddNewDesign from "./AddNewDesign.js";
import DesignHeader from "./DesignHeader";
import AddNewDesignContent from "./AddNewDesignContent";
import { ProjectService } from "../../../service/PegaService";
import "./index.scss";
import { Button } from "react-bootstrap";

function DefineDesignIntent() {
  const [data, setData] = useState(null);
  const [designIntent, setDesignIntent] = useState([]);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const data1 = ProjectService.getDIData();
    setData(data1);
    setDesignIntent(data1.DesignIntentList);
    console.log("data in useeffect", data1);
  }, [data]);

  const handleDelete = (index) => {
    // const sub = subProject.filter((item, i) => i !== index);
    // console.log("index here", sub1);
    // const sub = subProject.splice(index,1);
    // console.log("sub", sub);
  };

  const addNewEmptyDesign = () => {
    designIntent.push({});
    setDesignIntent((designIntent) => designIntent);
    setUpdated(!updated);
  };

  console.log("design intent");

  console.log("updated data", data, data?.count);

  const addData = (fieldName, index, value) => {
    let data = designIntent[index];
    data[fieldName] = value;
    setDesignIntent(designIntent);
  };

  const addIntoDesignIntent = (item) => {
    console.log("data", item);
  };

  const onSubmit = () => {
    console.log("full data", designIntent);
  };

  const FooterButtons = () => {
    return (
      <>
        <Button>Cancel</Button>
        <Button>Save as Draft</Button>
        <Button onClick={() => onSubmit()}>Submit</Button>
      </>
    );
  };

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

        {designIntent &&
          designIntent.length &&
          designIntent.map((item, index) => {
            return (
              <AddNewDesignContent
                key={item.id}
                {...data}
                item={item}
                index={index}
                addData={addData}
                addIntoDesignIntent={addIntoDesignIntent}
                handleDelete={handleDelete}
              />
            );
          })}

        {FooterButtons()}
      </div>
    </PageLayout>
  );
}

export default DefineDesignIntent;
