import React, { useCallback, useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import AddNewDesign from "./AddNewDesign.js";
import DesignHeader from "./DesignHeader";
import AddNewDesignContent from "./AddNewDesignContent";
import FooterButtons from "./FooterButtons";
import {
  getDesignIntent,
  saveDesignIntent,
} from "../../../apis/designIntentApi";
import "./index.scss";
import { useParams } from "react-router-dom";

const breadcrumb = [
  { label: "My Tasks", url: "/tasks" },
  { label: "Define Design Intent" },
];

const headerName = "Define Design Intent";

function DefineDesignIntent() {
  const [data, setData] = useState(null);
  const [designIntent, setDesignIntent] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [submittedDI, setSubmittedDI] = useState([]);
  let { TaskID, ProjectID } = useParams();

  console.log("task id", TaskID, ProjectID);

  useEffect(() => {
    // const data1 = ProjectService.getDIData();
    let taskId;
    if (TaskID) {
      taskId = TaskID.split("_")[1];
      console.log("task id-->", taskId[1]);
    }

    (async () => {
      try {
        const data1 = await getDesignIntent(taskId, ProjectID);
        console.log("api data------>", data1);
        data1 && data1.length && setData(data1[0]);
        data1 &&
          data1.length &&
          setDesignIntent(data1[0]?.Design_Intent_Details);
      } catch (err) {
        console.log("error", err);
      }
    })();

    // setData(data1);
    // let notSubmittedData = data1.DesignIntentList.filter((task)=> task.event !== "submit");
    // let submittedData = data1.DesignIntentList.filter((task)=> task?.event === "submit");
    // setDesignIntent(data1?.DesignIntentList);
    // setSubmittedDI(submittedData);
  }, []);

  const handleDelete = (index) => {
    console.log("index", index);
    const sub = designIntent.map((item, i) => {
      if (i === index) {
        item.Action = "delete";
      }
      return item;
    });
    // console.log("index here", sub1);
    // const sub = subProject.splice(index,1);
    console.log("sub", sub);
    setDesignIntent(sub);
  };

  const addNewEmptyDesign = () => {
    designIntent.push({
      Design_Job_ID: designIntent.length + 1,
      isNew: true,
      Agency_Reference: "",
      Cluster: "",
      Additional_Info: "",
      Select: false,
    });
    setDesignIntent(designIntent);
    setUpdated(!updated);
  };

  const addData = (fieldName, index, value, Design_Intent_Name) => {
    let data = designIntent[index];
    data[fieldName] = value;
    data["Design_Job_Name"] = Design_Intent_Name;
    submittedDI.push(data);
    setSubmittedDI(submittedDI);
    // setDesignIntent(designIntent);
  };

  const onSelectAll = (checked) => {
    designIntent.map((task) => {
      if (task?.Event !== "submit") {
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
      task.Event = "submit";
    });
    console.log("full submit data --->", submitOnlySelectedData);
  };

  const onSaveAsDraft = async () => {
    console.log("design intent list full", designIntent);
    // let submitOnlySelectedData = designIntent.filter(
    //   (task) => task?.Event !== "submit"
    // );
    let submitOnlySelectedData = designIntent.map((task) => {
      task.Action = "update";
      if (task?.Action !== "delete" && task?.Design_Job_ID) {
        task.Action = "update";
      } else if (task?.Action !== "delete" && task?.isNew === true)
        task.Action = "add";

      if (task?.isNew) {
        task.Design_Job_ID = "";
      }

      task.Event = "draft";
      task.AWM_Project_ID = "A-1000";
      return task;
    });
    let formData = {
      DesignIntentList: submitOnlySelectedData,
    };
    console.log("full draft data --->", submitOnlySelectedData);
    await saveDesignIntent(formData);
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
            if (item && item?.Action !== "delete") {
              return (
                <AddNewDesignContent
                  key={item.Design_Job_ID}
                  {...data}
                  item={item}
                  index={index}
                  addData={addData}
                  handleDelete={handleDelete}
                />
              );
            }
          })}
        <FooterButtons onSaveAsDraft={onSaveAsDraft} onSubmit={onSubmit} />
      </div>
    </PageLayout>
  );
}

export default DefineDesignIntent;
