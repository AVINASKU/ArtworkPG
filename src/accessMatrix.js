export const accessMatrix = [
  {
    role: "ProjectManager",
    pages: [
      {
        name: "myProjects",
        path: "/myProjects",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "allProjects",
        path: "/allProjects",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "MyTasks",
        path: "/MyTasks",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "AllTasks",
        path: "/AllTasks",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "projectPlan",
        path: "/projectPlan",
        access: ["Read", "Write", "Edit", "Delete"],
      },
    ],
  },
  {
    role: "TaskOwner",
    pages: [
      {
        name: "myProjects",
        path: "/myProjects",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "allProjects",
        path: "/allProjects",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "MyTasks",
        path: "/MyTasks",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "AllTasks",
        path: "/AllTasks",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "projectPlan",
        path: "/projectPlan",
        access: ["Read", "Write", "Edit", "Delete"],
      },
    ],
  },
  {
    role: "ExternalTaskOwner",
    pages: [
      {
        name: "myProjects",
        path: "/myProjects",
        access: [],
      },
      {
        name: "allProjects",
        path: "/allProjects",
        access: ["Read"],
      },
      {
        name: "MyTasks",
        path: "/MyTasks",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "AllTasks",
        path: "/AllTasks",
        access: [],
      },
      {
        name: "projectPlan",
        path: "/projectPlan",
        access: [],
      },
    ],
  },
  {
    role: "CapacityManager",
    pages: [
      {
        name: "myProjects",
        path: "/myProjects",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "allProjects",
        path: "/allProjects",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "MyTasks",
        path: "/MyTasks",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "AllTasks",
        path: "/AllTasks",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "projectPlan",
        path: "/projectPlan",
        access: ["Read", "Write", "Edit", "Delete"],
      },
    ],
  },
];
