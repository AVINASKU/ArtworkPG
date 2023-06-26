import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../../store/actions/TaskActions";
import TaskList from "../TaskList";
import { hasAllAccess } from "../../../utils";

const MyTask = () => {
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;
  const dispatch = useDispatch();
  const myTasks = useSelector((state) => state.TaskReducer.myTasks);
  const filteredTasks = myTasks
    ? myTasks.filter((task) => {
        const firstPart = task.AWM_Task_ID.split("_")[0];
        const excludedPrefixes = ["URDT", "UDAI", "UPRA"];
        const isExcludedTask =
          excludedPrefixes.includes(firstPart) && task.Status === "Complete";

        return (
          // (task.Status === "Available" || task.Status === "Complete") &&
          !isExcludedTask
        );
      })
    : [];

  useEffect(() => {
    dispatch(getTasks(userInformation));
  }, [dispatch]);
  console.log(hasAllAccess());
  return (
    <>
      {!hasAllAccess() && (
        <div className="unauthorized-user">
          You are not authorized to access this page.
        </div>
      )}
      {hasAllAccess() && (
        <TaskList
          myTasks={filteredTasks}
          flag="myTasks"
          userInformation={userInformation}
        />
      )}
    </>
  );
};

export default MyTask;
