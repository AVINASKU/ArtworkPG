import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../../store/actions/TaskActions";
import TaskList from "../TaskList";
import { getUnAuthoirzedAccess } from "../../../utils";

const MyTask = () => {
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;
  const dispatch = useDispatch();
  const myTasks = useSelector((state) => state.TaskReducer.myTasks);
  const { accessMatrix } = useSelector((state) => state?.accessMatrixReducer);
  const accessDetails = getUnAuthoirzedAccess(
    userInformation.role,
    accessMatrix,
    window?.location?.pathname
  );
  // Check if access is empty for the user's role and page
  const isAccessEmpty = accessDetails === null || accessDetails.length === 0;

  useEffect(() => {
    dispatch(getTasks(userInformation));
  }, [dispatch]);

  return (
    <>
      {isAccessEmpty && (
        <div className="unauthorized-user">
          You are not authorized to access this page.
        </div>
      )}
      {!isAccessEmpty && (
        <TaskList
          myTasks={myTasks}
          flag="myTasks"
          userInformation={userInformation}
        />
      )}
    </>
  );
};

export default MyTask;
