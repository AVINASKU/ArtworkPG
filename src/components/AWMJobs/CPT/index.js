import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import TaskHeader from "../DesignJobs/TaskHeader";
import DesignHeader from "../DesignJobs/DesignHeader";
import FooterButtons from "../DesignJobs/FooterButtons";
import { saveDesignIntent } from "../../../apis/designIntentApi";
import { useDispatch, useSelector } from "react-redux";
import { getConfirmCD } from "../../../store/actions/CDAction";
import "../DesignJobs/index.scss";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CloneJobs from "../DesignJobs/CloneJobs";
import { uploadFileAzure } from "../../../store/actions/AzureFileActions";
import "./index.scss";
const breadcrumb = [{ label: "Confirm Color Development & Print Trial" }];

const headerName = "Confirm Color Development & Print Trial";
const jobName = "CD_";

function CPT() {
  const dispatch = useDispatch();
  const { confirmCD } = useSelector((state) => state.CDReducer);
  const [data, setData] = useState(null);
  const [CD, setCD] = useState([]);

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
    dispatch(getConfirmCD(TaskID, ProjectID));
  }, [dispatch, TaskID, ProjectID]);

  useEffect(() => {
    if (confirmCD) {
      setCD(confirmCD?.Color_Development_Details || []);
      setData(confirmCD || []);
    }
  }, [confirmCD]);
  const handleCancel = () => {
    return navigate(`/myTasks`);
  };

  const addNewEmptyDesign = () => {
    const newDesignIntent = [
      ...CD,
      {
        CD_Job_ID: CD.length + 1,
        isNew: true,
        CD_Job_Name: "",
        Printer_Process: "",
        Substrate: "",
        Additional_Info: "",
        Select: false,
      },
    ];
    setCD(newDesignIntent);
    setUpdated(!updated);
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

  const onSubmit = async () => {
    let submitOnlySelectedData = CD?.filter((task) => task?.Select === true);
    submitOnlySelectedData.map((task) => {
      task.Event = "submit";
    });
    console.log("full submit data --->", submitOnlySelectedData);
    await dispatch(uploadFileAzure());
  };

  const onSaveAsDraft = async () => {
    console.log("design intent list full", CD);
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
      <DesignHeader
        setAddNewDesign={addNewEmptyDesign}
        onSelectAll={onSelectAll}
        breadcrumb={breadcrumb}
        headerName={headerName}
        label="Confirm Color Development"
        disabled={true}
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
                key={item.CD_Job_ID}
                {...data}
                item={item}
                index={index}
                jobName={jobName}
              />
            );
          }
        })}
        <FooterButtons
          handleCancel={handleCancel}
          onSaveAsDraft={onSaveAsDraft}
          onSubmit={onSubmit}
        />
      </div>
    </PageLayout>
  );
}

export default CPT;
