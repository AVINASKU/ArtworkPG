import ArrowDownImg from "../../assets/images/sort.svg";
import AllProjects1 from "../../assets/images/AllProjects1.svg";
import AllTask from "../../assets/images/AllTask.svg";
import MyTaskMP from "../../assets/images/MyTaskMP.svg";
import MyProject from "../../assets/images/MyProject.svg";

export const navItems = {
    data: [
      {
        name: "My Projects",
        img: MyProject,
        arrowUp: ArrowDownImg,
        url: "/myProjects",
        items: [{ name: "My Projects", url: "/myProjects" }],
      },
      {
        name: "All Projects",
        img: AllProjects1,
        arrowUp: ArrowDownImg,
        url: "/allProjects",
        items: [{ name: "All Projects", url: "/allProjects" }],
      },
      {
        name: "My Tasks",
        img: MyTaskMP,
        arrowUp: ArrowDownImg,
        url: "/MyTasks",
        items: [{ name: "My Tasks", url: "Mytasks" }],
      },
      {
        name: "All Tasks",
        img: AllTask,
        arrowUp: ArrowDownImg,
        url: "/AllTasks",
        items: [{ name: "All Tasks", url: "AllTasks" }],
      },
    ],
  };