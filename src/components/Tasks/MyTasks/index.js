import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../../store/actions/TaskActions";
import TaskList from "../TaskList";

const MyTask = () => {
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;
  const dispatch = useDispatch();
  const myTasks = useSelector((state) => state.TaskReducer.myTasks);

  useEffect(() => {
    dispatch(getTasks(userInformation));
  }, [dispatch]);

  return (
    <>
      <TaskList myTasks={myTasks} flag="myTasks" />
    </>
  );
};

export default MyTask;
