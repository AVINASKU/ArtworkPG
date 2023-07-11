export const accessRoles = [
  {
    page: "myProjects",
    path: "/myProjects",
    roles: [
      {
        name: "ProjectManager",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "CapacityManager",
        access: [],
      },
      {
        name: "TaskOwner",
        access: [],
      },
      {
        name: "ExternalTaskOwner",
        access: [],
      },
    ],
  },
  {
    page: "projectPlan",
    path: "/projectPlan#ProjectSetup",
    roles: [
      {
        name: "ProjectManager",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "CapacityManager",
        access: [],
      },
      {
        name: "TaskOwner",
        access: [],
      },
      {
        name: "ExternalTaskOwner",
        access: [],
      },
    ],
  },
  {
    page: "projectPlan",
    path: "/projectPlan#ProjectPlan",
    roles: [
      {
        name: "ProjectManager",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "CapacityManager",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "TaskOwner",
        access: [],
      },
      {
        name: "ExternalTaskOwner",
        access: [],
      },
    ],
  },
  {
    page: "allProjects",
    path: "/allProjects",
    roles: [
      {
        name: "ProjectManager",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "CapacityManager",
        access: ["Read"],
      },
      {
        name: "TaskOwner",
        access: ["Read"],
      },
      {
        name: "ExternalTaskOwner",
        access: ["Read"],
      },
    ],
  },
  {
    page: "MyTasks",
    path: "/MyTasks",
    roles: [
      {
        name: "ProjectManager",
        access: [],
      },
      {
        name: "CapacityManager",
        access: [],
      },
      {
        name: "TaskOwner",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "ExternalTaskOwner",
        access: ["Read", "Write", "Edit", "Delete"],
      },
    ],
  },
  {
    page: "AllTasks",
    path: "/AllTasks",
    roles: [
      {
        name: "ProjectManager",
        access: ["Read"],
      },
      {
        name: "CapacityManager",
        access: [],
      },
      {
        name: "TaskOwner",
        access: [],
      },
      {
        name: "ExternalTaskOwner",
        access: [],
      },
    ],
  },
  {
    page: "projectPlan",
    path: "projectPlan#ProjectSetup",
    roles: [
      {
        name: "ProjectManager",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "CapacityManager",
        access: [],
      },
      {
        name: "TaskOwner",
        access: ["Read"],
      },
      {
        name: "ExternalTaskOwner",
        access: ["Read"],
      },
    ],
  },
  {
    page: "projectPlan",
    path: "/projectSetup",
    roles: [
      {
        name: "ProjectManager",
        access: ["Read", "Write", "Edit", "Delete"],
      },
      {
        name: "CapacityManager",
        access: [],
      },
      {
        name: "TaskOwner",
        access: ["Read"],
      },
      {
        name: "ExternalTaskOwner",
        access: ["Read"],
      },
    ],
  },
];
