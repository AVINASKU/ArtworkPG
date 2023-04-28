import React, { useCallback, useEffect, useState } from "react";
import PageLayout from "../../PageLayout";
import AddNewDesign from "./AddNewDesign.js";
import DesignHeader from "./DesignHeader";
import AddNewDesignContent from "./AddNewDesignContent";
import { ProjectService } from "../../../service/PegaService";
import "./index.scss";
import { Button, Row } from "react-bootstrap";

function DefineDesignIntent() {
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

  // const DI = {
  //   project_name: "Paste Mulsaane Oral-B Medical Device Europe",
  //   duration: "15",
  //   start_date: "20-mar-2023",
  //   end_date: "4-mar-2024",
  //   consumed_buffer: "-2",
  //   DesignIntentList: [
  //     {
  //       Design_Intent_Name:
  //         "DI_FAI-214_Fairy_Hand Dish Wash_Paste Mulsaane Oral-B Medical Device Europe_UK_Test",
  //       AWMTaskId: "DI-1",
  //       DesignJobid: "1234",
  //       AWMProjectId: "",
  //       AgencyReference: "FAI-214",
  //       Cluster: "UK",
  //       AdditionalInfo: "Test",
  //       Select: "true",
  //       event: "submit",
  //     },
  //     {
  //       Design_Intent_Name: "Abc",
  //       TaskId: "DI-2",
  //       AgencyReference: "FAI-215",
  //       Cluster: "UK",
  //       AdditionalInfo: "Test",
  //       Select: "false",
  //       event: "draft",
  //       DesignJobid: "1112",
  //     },
  //     {
  //       DesignJobid: "2235",
  //     },
  //   ],
  // };

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

  const FooterButtons = () => {
    return (
      <Row className="form-buttons">
        <Button className="button-layout cancel-button">Cancel</Button>
        <Button
          onClick={() => onSaveAsDraft()}
          className="button-layout save-as-draft-button"
        >
          Save as Draft
        </Button>
        <Button
          className="button-layout submit-button"
          type="submit"
          onClick={() => onSubmit()}
        >
          Submit
        </Button>
      </Row>
    );
  };

  return (
    <PageLayout>
      <DesignHeader
        setAddNewDesign={addNewEmptyDesign}
        onSelectAll={onSelectAll}
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

        {/* submittedDI */}
        {/* {submittedDI &&
          submittedDI.length &&
          submittedDI.map((item, index) => {
            return (
              <AddNewDesignContent
                key={item.id}
                {...data}
                item={item}
                index={index}
                addData={addData}
                handleDelete={handleDelete}
              />
            );
          })} */}

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

        {FooterButtons()}
      </div>
    </PageLayout>
  );
}

export default DefineDesignIntent;
