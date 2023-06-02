import React, {useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home.js";
import { Outlet } from "react-router-dom";
import AllProjects from "./components/Projects/AllProjects/index";
import MyProjects from "./components/Projects/MyProjects/index.js";
import ProjectCreation from "./projectCreation.js";
import Login from "./login.js";
import DDI from "./components/AWMJobs/DDI/index.js";
import UADI from "./components/AWMJobs/UADI";
import AllTasksPage from "./AllTaksPage.js";
import MyTasksPage from "./MyTaskPage.js";
import DDT from "./components/AWMJobs/DDT/index.js";
import DPRA from "./components/AWMJobs/DPRA/index.js";
import CCD from "./components/AWMJobs/CCD/index.js";
import DCD from "./components/AWMJobs/DCD/index.js";
import DNIQ from "./components/AWMJobs/DNIQ/index.js";
import CNIQ from "./components/AWMJobs/CNIQ/index.js";
import CPT from "./components/AWMJobs/CPT/index.js";
import DNPF from "./components/AWMJobs/DNPF/index.js";
import ARDT from "./components/AWMJobs/ARDT/index.js";
import APRA from "./components/AWMJobs/APRA/index.js";
import UPRA from "./components/AWMJobs/UPRA/index.js";
import URDT from "./components/AWMJobs/URDT/index.js";
import CPPFA from "./components/AWMJobs/CPPFA/index.js";

import { checkReadOnlyAccess } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccessMatrix } from "./store/actions/RoleBasedActions";
import { useLocation } from "react-router-dom";

const RoutesNav = () => {

  // const dispatch = useDispatch();
  // const { accessMatrix } = useSelector((state) => state?.accessMatrixReducer);
  // const User = useSelector((state) => state.UserReducer);
  // const userInformation = User.userInformation;
  // const location = useLocation();
  // // if read only access then returns true otherwise return false
  // const checkReadWriteAccess = checkReadOnlyAccess(userInformation, accessMatrix, location);

  // useEffect(() => {
  //   dispatch(fetchAccessMatrix());
  // }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Login />} />
        {/* <Route index element={<Home />} /> */}
        <Route path="/myProjects" element={<MyProjects />} />
        <Route path="/allProjects" element={<AllProjects />} />
        <Route path="/myTasks" element={<MyTasksPage />} />
        <Route path="/AllTasks" element={<AllTasksPage />} />
        {/* <Route path="/createProject" element={<AddProject />} /> */}
        <Route path="/projectPlan" element={<ProjectCreation />} />
        <Route
          path="/myProjects/projectPlan/:ProjectID"
          element={<ProjectCreation />}
        />
        <Route
          path="/allProjects/projectPlan/:ProjectID"
          element={<ProjectCreation />}
        />
        <Route path="/myTasks/DDI/:TaskID/:ProjectID" element={<DDI checkReadWriteAccess />} />
        <Route path="/allTasks/DDI/:TaskID/:ProjectID" element={<DDI checkReadWriteAccess />} />
        <Route path="/myTasks/UADI/:TaskID/:ProjectID" element={<UADI />} />
        <Route path="/allTasks/UADI/:TaskID/:ProjectID" element={<UADI />} />
        <Route path="/myTasks/DDT/:TaskID/:ProjectID" element={<DDT />} />
        <Route path="/allTasks/DDT/:TaskID/:ProjectID" element={<DDT />} />
        <Route path="/myTasks/ARDT/:TaskID/:ProjectID" element={<ARDT />} />
        <Route path="/allTasks/ARDT/:TaskID/:ProjectID" element={<ARDT />} />
        <Route path="/myTasks/DPRA/:TaskID/:ProjectID" element={<DPRA />} />
        <Route path="/allTasks/DPRA/:TaskID/:ProjectID" element={<DPRA />} />
        <Route path="/myTasks/APRA/:TaskID/:ProjectID" element={<APRA />} />
        <Route path="/allTasks/APRA/:TaskID/:ProjectID" element={<APRA />} />
        <Route path="/myTasks/URDT/:TaskID/:ProjectID" element={<URDT />} />
        <Route path="/allTasks/URDT/:TaskID/:ProjectID" element={<URDT />} />
        <Route path="/myTasks/UPRA/:TaskID/:ProjectID" element={<UPRA />} />
        <Route path="/allTasks/UPRA/:TaskID/:ProjectID" element={<UPRA />} />
        <Route path="/myTasks/CCD/:TaskID/:ProjectID" element={<CCD />} />
        <Route path="/allTasks/CCD/:TaskID/:ProjectID" element={<CCD />} />
        <Route path="/myTasks/DCD/:TaskID/:ProjectID" element={<DCD />} />
        <Route path="/allTasks/DCD/:TaskID/:ProjectID" element={<DCD />} />
        <Route path="/myTasks/CNIQ/:TaskID/:ProjectID" element={<CNIQ />} />
        <Route path="/allTasks/CNIQ/:TaskID/:ProjectID" element={<CNIQ />} />
        <Route path="/myTasks/DNIQ/:TaskID/:ProjectID" element={<DNIQ />} />
        <Route path="/allTasks/DNIQ/:TaskID/:ProjectID" element={<DNIQ />} />
        <Route path="/allTasks/CPPFA/:TaskID/:ProjectID" element={<CPPFA />} />
        <Route path="/myTasks/CPT/:TaskID/:ProjectID" element={<CPT />} />
        <Route path="/allTasks/CPT/:TaskID/:ProjectID" element={<CPT />} />
        <Route path="/myTasks/DNPF/:TaskID/:ProjectID" element={<DNPF />} />
        <Route path="/allTasks/DNPF/:TaskID/:ProjectID" element={<DNPF />} />
        <Route path="/myTasks/DCD/:TaskID/:ProjectID" element={<DCD />} />
        <Route path="/allTasks/DCD/:TaskID/:ProjectID" element={<DCD />} />
        {/* <Route path="/reports" element={<Reports />} /> */}
      </Route>
    </Routes>
  );
};

export default RoutesNav;
