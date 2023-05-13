import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { AutoComplete } from "primereact/autocomplete";
import { InputTextarea } from "primereact/inputtextarea";
import { RoleUser } from "../../userRole";
import "./index.scss";

const TaskDialog = (props) => {
  const [visible, setVisible] = useState(props.showTaskDialog);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const usernames = RoleUser?.users?.map((user) => user.username);

  const items = usernames.map((username, i) => ({
    label: username,
    value: i,
  }));

  const searchItems = (event) => {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo purposes we filter at client side
    let query = event.query;
    let _filteredItems = [];

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.label.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }

    setFilteredItems(_filteredItems);
  };

  useEffect(() => {
    setVisible(props.showTaskDialog);
  }, [props.showTaskDialog]);

  const handleSubmit = () => {
    // Code to handle form submission
    const helpNeededData = {
      taskName: props?.selectedTaskData
        ?.map((task) => task.TaskName)
        .join(", "),
      comments: comment,
    };
    const delegateData = {
      taskName: props?.selectedTaskData
        ?.map((task) => task.TaskName)
        .join(", "),
      username: selectedItem.label,
      comments: comment,
    };
    console.log(helpNeededData, delegateData);
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
              setIsFormValid(!!e.value && comment.trim().length > 0);
            }}
          />
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
