import React, { useEffect, useState } from "react";
import "../DesignJobs/index.scss";
import PageLayout from "../../PageLayout";
import DesignHeader from "../DesignJobs/DesignHeader";
import AddNewDesign from "../DesignJobs/TaskHeader";
import AddNewDesignContent from "../DesignJobs/AddNewDesignContent";
import FooterButtons from "../DesignJobs/FooterButtons";
import { ProjectService } from "../../../service/PegaService";
import { useSelector } from "react-redux";

const breadcrumb = [
  { label: "My Tasks", url: "/myTasks" },
  { label: "Produciton Ready Art" },
];

const headerName = "Produciton Ready Art";

function DCD() {
  const [data, setData] = useState(null);
  const [designIntent, setDesignIntent] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [submittedDI, setSubmittedDI] = useState([]);
  const [validation, setValidation] = useState(false);
  const { TaskDetailsData, loading } = useSelector(
    (state) => state.TaskDetailsReducer
  );

  useEffect(() => {
    const data1 = ProjectService.getDIData();
    setData(data1);
    // let notSubmittedData = data1.DesignIntentList.filter((task)=> task.event !== "submit");
    // let submittedData = data1.DesignIntentList.filter((task)=> task?.event === "submit");
    setDesignIntent(data1.DesignIntentList);
    // setSubmittedDI(submittedData);
  }, [data]);

  const handleDelete = (index) => {
    const sub = designIntent.filter((item, i) => i !== index);
    // console.log("index here", sub1);
    // const sub = subProject.splice(index,1);

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
   <>
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
        {<AddNewDesign {...data} TaskDetailsData={TaskDetailsData}/>}

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
      </>
  );
}

export default DCD;
