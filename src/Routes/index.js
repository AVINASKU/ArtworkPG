import loadable from "@loadable/component";

const AllProjects = loadable(
  () => import("../components/Projects/AllProjects/index"),
  {
    fallback: <h1>Loading...</h1>,
  }
);
const MyProjects = loadable(
  () => import("../components/Projects/MyProjects/index.js"),
  {
    fallback: <h1>Loading...</h1>,
  }
);
const ProjectCreation = loadable(() => import("../projectCreation"), {
  fallback: <h1>Loading...</h1>,
});
const Login = loadable(() => import("../login.js"), {
  fallback: <h1>Loading...</h1>,
});
const DDI = loadable(() => import("../components/AWMJobs/DDI/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const UADI = loadable(() => import("../components/AWMJobs/UADI"), {
  fallback: <h1>Loading...</h1>,
});
const AllTasksPage = loadable(() => import("../AllTaksPage.js"), {
  fallback: <h1>Loading...</h1>,
});
const MyTasksPage = loadable(() => import("../MyTaskPage.js"), {
  fallback: <h1>Loading...</h1>,
});
const DDT = loadable(() => import("../components/AWMJobs/DDT/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const UBD = loadable(() => import("../components/AWMJobs/UBD/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const DPRA = loadable(() => import("../components/AWMJobs/DPRA/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const CCD = loadable(() => import("../components/AWMJobs/CCD/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const DCD = loadable(() => import("../components/AWMJobs/DCD/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const DNIQ = loadable(() => import("../components/AWMJobs/DNIQ/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const CPT = loadable(() => import("../components/AWMJobs/CPT/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const DNPF = loadable(() => import("../components/AWMJobs/DNPF/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const ARDT = loadable(() => import("../components/AWMJobs/ARDT/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const APRA = loadable(() => import("../components/AWMJobs/APRA/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const UPRA = loadable(() => import("../components/AWMJobs/UPRA/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const CPPFA = loadable(() => import("../components/AWMJobs/CPPFA/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const DsbpPage = loadable(() => import("../DsbpPage"), {
  fallback: <h1>Loading...</h1>,
});
const DsbpTabPage = loadable(() => import("../DsbpTabPage"), {
  fallback: <h1>Loading...</h1>,
});
const DMDsbpTabPage = loadable(() => import("../DMDsbpTabPage"), {
  fallback: <h1>Loading...</h1>,
});
const URDT = loadable(() => import("../components/AWMJobs/URDT/index.js"), {
  fallback: <h1>Loading...</h1>,
});
const CNIQ = loadable(() => import("../components/AWMJobs/CNIQ/index.js"), {
  fallback: <h1>Loading...</h1>,
});
export{
  AllProjects,
  MyProjects,
  ProjectCreation,
  Login,
  DDI,
  UADI,
  AllTasksPage,
  MyTasksPage,
  DDT,
  UBD,
  DPRA,
  CCD,
  DCD,
  DNIQ,
  CPT,
  DNPF,
  ARDT,
  APRA,
  UPRA,
  CPPFA,
  DsbpPage,
  DsbpTabPage,
  DMDsbpTabPage,
  URDT,
  CNIQ,
}
