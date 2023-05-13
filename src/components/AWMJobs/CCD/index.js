import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import TaskHeader from "../DesignJobs/TaskHeader";
import DesignHeader from "../DesignJobs/DesignHeader";
import FooterButtons from "../DesignJobs/FooterButtons";
import { saveDesignIntent } from "../../../apis/designIntentApi";
import { useDispatch, useSelector } from "react-redux";
import { getDefineCD } from "../../../store/actions/CDAction";
import "../DesignJobs/index.scss";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CloneJobs from "../DesignJobs/CloneJobs";
import "./index.scss";
import CDHeader from "../DesignJobs/CDHeader";
const breadcrumb = [{ label: "Define Color Development" }];

const headerName = "Define Color Development";
const jobName = "CD_";

function CCD() {
  const dispatch = useDispatch();
  const { defineCD } = useSelector((state) => state.CDReducer);
  const [data, setData] = useState(null);
  const [CD, setCD] = useState([]);
  const [formValid, setFormValid] = useState(true);
  const [updated, setUpdated] = useState(false);
  const [submittedDI, setSubmittedDI] = useState([]);
  let { TaskID, ProjectID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // const data1 = ProjectService.getDIData();
    let taskId;
    if (TaskID) {
      taskId = TaskID.split("_")[1];
    }
    dispatch(getDefineCD(TaskID, ProjectID));
  }, [dispatch, TaskID, ProjectID]);

  useEffect(() => {
    if (defineCD) {
      setCD(defineCD[0]?.DesignJobDetails || []);
      setData(defineCD[0] || []);
    }
  }, [defineCD]);
  const handleCancel = () => {
    return navigate(`/myTasks`);
  };

  const handleDelete = (index) => {
    const sub = CD?.map((item, i) => {
      if (i === index) {
        item.Action = "delete";
      }
      return item;
    });
    // console.log("index here", sub1);
    // const sub = subProject.splice(index,1);

    setCD(sub);
  };

  const addNewEmptyDesign = () => {
    const newDesignIntent = [
      ...CD,
      {
        Design_Job_ID: CD.length + 1,
        isNew: true,
        Print_Trial_Done: null,
        Tier: "",
        Cluster: "",
        Agency_Reference: "",
        Printer: "",
        Printing_Process: "",
        Design_Job_Name: "",
        Substrate: "",
        Additional_Info: "",
        CD_Approved: null,
        Select: null,
        Print_Trial_Needed: null,
      },
    ];
    setCD(newDesignIntent);
    setUpdated(!updated);
  };

  const addData = (fieldName, index, value, Design_Intent_Name) => {
    let data = CD[index];
    data[fieldName] = value;
    data["CD_Job_Name"] = Design_Intent_Name;
    submittedDI.push(data);
    setSubmittedDI(submittedDI);
  };

  const onSelectAll = (checked) => {
    CD?.map((task) => {
      if (task?.Event !== "submit") {
        task.Select = checked;
      }
      return task;
    });
    setCD(CD);
    setUpdated(!updated);
  };

  const onSubmit = () => {
    let submitOnlySelectedData = CD?.filter((task) => task?.Select === true);
    submitOnlySelectedData.map((task) => {
      task.Event = "submit";
    });
    console.log("full submit data --->", submitOnlySelectedData);
  };

  const onSaveAsDraft = async () => {
    // let submitOnlySelectedData = designIntent.filter(
    //   (task) => task?.Event !== "submit"
    // );
    let submitOnlySelectedData = CD?.map((task) => {
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
      <CDHeader
        setAddNewDesign={addNewEmptyDesign}
        onSelectAll={onSelectAll}
        breadcrumb={breadcrumb}
        headerName={headerName}
        label="Define Color Development"
      />
      <div
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          width: "100%",
          height: "400px",
        }}
      >
        {<TaskHeader {...data} />}

        {CD.map((item, index) => {
          if (item && item?.Action !== "delete") {
            return (
              <CloneJobs
                key={item.Design_Job_ID}
                {...data}
                item={item}
                index={index}
                addData={addData}
                handleDelete={handleDelete}
                jobName={jobName}
                setFormValid={setFormValid}
              />
            );
          }
        })}
        <FooterButtons
          handleCancel={handleCancel}
          onSaveAsDraft={onSaveAsDraft}
          onSubmit={onSubmit}
          formValid={formValid}
        />
      </div>
    </PageLayout>
  );
}

export default CCD;
