import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import AddNewDesign from "../DesignJobs/TaskHeader";
import DesignHeader from "../DesignJobs/DesignHeader";
import AddNewDesignContent from "../DesignJobs/AddNewDesignContent";
import FooterButtons from "../DesignJobs/FooterButtons";
// import { saveDesignIntent } from "../../../apis/designIntentApi";
import "../DesignJobs/index.scss";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ProjectService } from "../../../service/PegaService";
import { useSelector } from "react-redux";
import {
  convertCategoryIntoString,
  convertBrandIntoString,
  AddNavigation
} from "../../../utils";
import { toLower } from "lodash";

const headerName = "Define Regional Design Template";
const roleName = "DT_";

function DDT() {
  const [data, setData] = useState(null);
  const [designIntent, setDesignIntent] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [submittedDI, setSubmittedDI] = useState([]);
  let { TaskID, ProjectID } = useParams();
  const navigate = useNavigate();
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;

  let breadcrumb = AddNavigation(headerName);

  let bu = userInformation?.bu;
// if bu is baby care show tire field else not
  let checkBU = toLower(bu) === toLower("Home Care") ? true : false;

  useEffect(() => {
    let taskId;
    if (TaskID) {
      taskId = TaskID.split("_")[1];
      console.log("task id-->", taskId[1], ProjectID);
    }

    (async () => {
      try {
        const data1 = ProjectService.getDIData();
        if (data1) {
          data1.Category = convertCategoryIntoString(data1.Category);
          data1.Brand = convertBrandIntoString(data1.Brand);
        }
        // const data1 = await getDesignIntent();
        console.log("api data------>", data1);
        data1 && setData(data1);
        data1 && setDesignIntent(data1.Design_Intent_Details);
      } catch (err) {
        console.log("error", err);
      }
    })();
  }, [TaskID,ProjectID]);

  const handleCancel = () => {
    return navigate(`/myTasks`);
  };

  const handleDelete = (index) => {
    console.log("index", index);
    const sub = designIntent.map((item, i) => {
      if (i === index) {
        item.Action = "delete";
      }
      return item;
    });
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
    // add here design job name here check it out from API.
    data["Design_Job_Name"] = Design_Intent_Name;
    submittedDI.push(data);
    setSubmittedDI(submittedDI);
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
    // call submit API here
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
    // call save as draft API here below

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
                  roleName={roleName}
                  checkBU={checkBU}
                />
              );
            } else return <>Data Not Found</>
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

export default DDT;
