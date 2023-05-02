import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../../../store/actions/TaskActions";
import TaskList from "../TaskList";

const AllTasks = () => {
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state?.TaskReducer?.allTasks);

  useEffect(() => {
    dispatch(getAllTasks(userInformation));
  }, [dispatch]);

  return (
    <>
      <TaskList myTasks={allTasks} flag="allTasks" />
    </>
  );
};

export default AllTasks;
