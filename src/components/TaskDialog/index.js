import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { AutoComplete } from "primereact/autocomplete";
import { InputTextarea } from "primereact/inputtextarea";
import { RoleUser } from "../../userRole";
import { DelegateAction } from "../../store/actions/DelegateAction";
import { HelpNeededAction } from "../../store/actions/HelpNeededAction";
import "./index.scss";
import { useDispatch } from "react-redux";
import { getTasks, getAllTasks } from "../../store/actions/TaskActions";

const TaskDialog = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(props.showTaskDialog);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const userOptions = RoleUser?.users?.map((user) => ({
    label: user.username,
    value: user.userid,
  }));

  const searchItems = (event) => {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo purposes we filter at client side
    let query = event.query;
    let _filteredItems = [];

    for (let i = 0; i < userOptions.length; i++) {
      let item = userOptions[i];
      if (item.label.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }

    setFilteredItems(_filteredItems);
  };

  useEffect(() => {
    setVisible(props.showTaskDialog);
  }, [props.showTaskDialog]);

  const handleSubmit = async () => {
    try {
      if (!selectedItem || filteredItems?.length === 0) {
        return;
      }
      const helpNeededData = {
        comments: comment,
        Help_Needed: true,
        ArtworkAgilityTasks: props?.selectedTaskData
          ?.map((task) => ({
            AWM_Task_ID: task.AWM_Task_ID,
          }))
          .filter((task) => task.AWM_Task_ID),
      };

      const delegateData = {
        Name: selectedItem.label,
        code: selectedItem.value,
        ArtworkAgilityTasks: props?.selectedTaskData
          ?.map((task) => ({
            AWM_Task_ID: task.AWM_Task_ID,
          }))
          .filter((task) => task.AWM_Task_ID),
      };
      if (props.flag === "help") {
        await dispatch(HelpNeededAction(helpNeededData));
        props.onClose();
        if (props.path === "myTasks") {
          await dispatch(getTasks(props?.userInformation));
        } else {
          await dispatch(getAllTasks(props?.userInformation));
        }
      } else {
        await dispatch(DelegateAction(delegateData));
        // const response = await dispatch(DelegateAction(delegateData));
        // if (response.status === 200) {
        props.onClose();
        // }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const hideDialog = () => {
    setVisible(false);
    props.onClose();
  };

  return (
    <Dialog
      visible={visible}
      maximizable
      style={{ width: "50vw" }}
      onHide={hideDialog}
      header={`${props.flag === "help" ? "Help Needed" : "Delegate Task"}`}
    >
      <div className="p-fluid popup-details">
        <div className="p-field">
          <label htmlFor="taskName" className="tasksname">
            Task:
            <ul>
              {props?.selectedTaskData?.map((task) => (
                <li className="active-taskname" key={task.AWM_Task_ID}>
                  {task.Task_Name}
                  <br />
                </li>
              ))}
            </ul>
          </label>
        </div>

        <div className="p-field">
          <label htmlFor="priority">Delegate To *</label>
          <AutoComplete
            value={selectedItem}
            suggestions={filteredItems}
            completeMethod={searchItems}
            field="label"
            dropdown
            placeholder="Search user"
            onChange={(e) => {
              setSelectedItem(e.value);
              setIsFormValid(!!e.value);
            }}
          />
          {filteredItems?.length === 0 && <div>No results found</div>}
        </div>
        {props.flag === "help" && (
          <div className="p-field">
            <label htmlFor="comment">Add Comment *</label>
            <InputTextarea
              id="comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                setIsFormValid(
                  !!selectedItem && e.target.value.trim().length > 0
                );
              }}
              rows={3}
              className="p-inputtext p-component"
            />
          </div>
        )}
      </div>
      <div className="p-dialog-footer" id="submit">
        {props.flag === "help" && (
          <p className="comments-validation">
            * The message will be sent to PM once submit{" "}
          </p>
        )}
        <Button
          label="Submit"
          className="button-layout btn btn-primary"
          onClick={handleSubmit}
          disabled={!isFormValid}
        />
      </div>
    </Dialog>
  );
};

export default TaskDialog;
