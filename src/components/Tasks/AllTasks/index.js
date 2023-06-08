import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../../../store/actions/TaskActions";
import TaskList from "../TaskList";

const AllTasks = () => {
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;
  const dispatch = useDispatch();
  const { allTasks, loading } = useSelector((state) => state.TaskReducer);
  useEffect(() => {
    dispatch(getAllTasks(userInformation));
  }, [dispatch]);

  return (
    <>
      <TaskList
        myTasks={allTasks}
        loading={loading}
        flag="allTasks"
        userInformation={userInformation}
      />
    </>
  );
};

export default AllTasks;
