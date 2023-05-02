import React, { useEffect, useState } from "react";
import "../../Tasks/DesignIntent/index.scss";
import PageLayout from "../../PageLayout";
import DesignHeader from "../../Tasks/DesignIntent/DesignHeader";
import AddNewDesign from "../../Tasks/DesignIntent/AddNewDesign";
import AddNewDesignContent from "../../Tasks/DesignIntent/AddNewDesignContent";
import FooterButtons from "../../Tasks/DesignIntent/FooterButtons";
import { ProjectService } from "../../../service/PegaService";

const breadcrumb = [
  { label: "My Tasks", url: "/myTasks" },
  { label: "Regional Design Intent" },
];

const headerName = "Regional Design Template";

function DDT() {
  const [data, setData] = useState(null);
  const [designIntent, setDesignIntent] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [submittedDI, setSubmittedDI] = useState([]);
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    const data1 = ProjectService.getDIData();
    setData(data1);
    // let notSubmittedData = data1.DesignIntentList.filter((task)=> task.event !== "submit");
    // let submittedData = data1.DesignIntentList.filter((task)=> task?.event === "submit");
    setDesignIntent(data1.DesignIntentList);
    // setSubmittedDI(submittedData);
  }, [data]);

  const handleDelete = (index) => {
    console.log("index", index);
    const sub = designIntent.filter((item, i) => i !== index);
    // console.log("index here", sub1);
    // const sub = subProject.splice(index,1);
    console.log("sub", sub);
    setDesignIntent(sub);
  };

  const addNewEmptyDesign = () => {
    designIntent.push({
      DesignJobid: designIntent.length + 1,
      isNew: true,
      AgencyReference: "",
      Cluster: "",
      AdditionalInfo: "",
    });
    setDesignIntent(designIntent);
    setUpdated(!updated);
  };

  const addData = (fieldName, index, value, Design_Intent_Name) => {
    let data = designIntent[index];
    data[fieldName] = value;
    data["Design_Intent_Name"] = Design_Intent_Name;
    submittedDI.push(data);
    setSubmittedDI(submittedDI);
    // setDesignIntent(designIntent);
  };

  const onSelectAll = (checked) => {
    designIntent.map((task) => {
      if (task?.event !== "submit") {
        task.Select = checked;
      }
      return task;
    });
    setDesignIntent(designIntent);
    setUpdated(!updated);
  };

  const onSubmit = () => {
    let submitOnlySelectedData = designIntent.filter(
      (task) => task?.Select === true
    );
    submitOnlySelectedData.map((task) => {
      task.event = "submit";
    });
    console.log("full submit data --->", submitOnlySelectedData);
  };

  const onSaveAsDraft = () => {
    let submitOnlySelectedData = designIntent.filter(
      (task) => task?.event !== "submit"
    );
    submitOnlySelectedData.map((task) => {
      task?.DesignJobid ? (task.action = "update") : (task.action = "add");
      task.event = "draft";
    });
    console.log("full draft data --->", submitOnlySelectedData);
  };

  return (
    <PageLayout>
      <DesignHeader
        setAddNewDesign={addNewEmptyDesign}
        onSelectAll={onSelectAll}
        breadcrumb={breadcrumb}
        headerName={headerName}
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

        {designIntent &&
          designIntent.length &&
          designIntent.map((item, index) => {
            return (
              <AddNewDesignContent
                key={item.DesignJobid}
                {...data}
                item={item}
                index={index}
                addData={addData}
                handleDelete={handleDelete}
              />
            );
          })}
        <FooterButtons onSaveAsDraft={onSaveAsDraft} onSubmit={onSubmit} />
      </div>
    </PageLayout>
  );
}

export default DDT;
