import axios from "axios";
import * as types from "./../types/types";

export const projectPlan = (PM) => async (dispatch) => {
  try {
    //here need to add url and pass PM name
    // const res = await axios.get(``);

    // if (res?.data === null) {
    //   dispatch({
    //     type: types.GET_PROJECTPLAN_DETAILS_ERROR,
    //     payload: "No records found",
    //   });
    // } else {
    //   if (res.status === 200) {
    //     dispatch({
    //       type: types.GET_PROJECTPLAN_DETAILS_SUCCESS,
    //       payload: res.data.ArtworkAgilityProjects,
    //     });
    //   } else {
    //     dispatch({
    //       type: types.GET_PROJECTPLAN_DETAILS_ERROR,
    //       payload: "Project not found",
    //     });
    //   }
    // }
    dispatch({
      type: types.GET_PROJECTPLAN_DETAILS_SUCCESS,
      payload: [
        {
          key: "1",
          data: {
            Task: "Define Design Intent",
            Dependancy: "Project active & task in scope",
            Role: [{ name: "Design Manager", code: "DM" }],
            Owner: [
              { name: "Paleczna", code: "Pa" },
              { name: "Karol", code: "Karol" },
              { name: "Iza", code: "Iza" },
            ],
            State: "Complete",
            Duration: "02",
            StartDate: "20230411T000000.000 GMT",
            EndDate: "20230411T000000.000 GMT",
            ConsumedBuffer: "+2",
            HelpNeeded: "No",
          },
          children: [],
        },
        {
          key: "2",
          data: {
            Task: "Upload Approved Design Intent(x3)",
            Dependancy: "Define Design Intent",
            Role: [{ name: "New York", code: "NY" }],
            Owner: [
              { name: "Luca", code: "Luca" },
              { name: "Karol", code: "Karol" },
              { name: "Iza", code: "Iza" },
            ],
            State: "Complete",
            Duration: "02",
            StartDate: "20230411T000000.000 GMT",
            EndDate: "20230411T000000.000 GMT",
            ConsumedBuffer: "+2",
            HelpNeeded: "No",
          },
          children: [
            {
              key: "2-0",
              data: {
                Task: "note-meeting.txt",
                Dependancy: "50kb",
                Role: [{ name: "New York", code: "NY" }],
                Owner: [
                  { name: "Luca", code: "Luca" },
                  { name: "Karol", code: "Karol" },
                  { name: "Iza", code: "Iza" },
                ],
                State: "Awaiting",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "+2",
                HelpNeeded: "No",
              },
            },
            {
              key: "2-1",
              data: {
                Task: "note-todo.txt",
                Dependancy: "100kb",
                Role: [{ name: "New York", code: "NY" }],
                Owner: [
                  { name: "Luca", code: "Luca" },
                  { name: "Karol", code: "Karol" },
                  { name: "Iza", code: "Iza" },
                ],
                State: "In Progress",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "+2",
                HelpNeeded: "No",
              },
            },
          ],
        },
        {
          key: "3",
          data: {
            Task: "Documents",
            Dependancy: "75kb",
            Role: [{ name: "New York", code: "NY" }],
            Owner: [
              { name: "Luca", code: "Luca" },
              { name: "Karol", code: "Karol" },
              { name: "Iza", code: "Iza" },
            ],
            State: "In Progress",
            Duration: "02",
            StartDate: "20230411T000000.000 GMT",
            EndDate: "20230411T000000.000 GMT",
            ConsumedBuffer: "+2",
            HelpNeeded: "No",
          },
          children: [
            {
              key: "3-0",
              data: {
                Task: "Work",
                Dependancy: "55kb",
                Role: [{ name: "New York", code: "NY" }],
                Owner: [
                  { name: "Luca", code: "Luca" },
                  { name: "Karol", code: "Karol" },
                  { name: "Iza", code: "Iza" },
                ],
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "+2",
                HelpNeeded: "No",
              },
              children: [
                {
                  key: "3-0-0",
                  data: {
                    Task: "Expenses.doc",
                    Dependancy: "30kb",
                    Role: [{ name: "New York", code: "NY" }],
                    Owner: [
                      { name: "Luca", code: "Luca" },
                      { name: "Karol", code: "Karol" },
                      { name: "Iza", code: "Iza" },
                    ],
                    State: "Complete",
                    Duration: "02",
                    StartDate: "20230411T000000.000 GMT",
                    EndDate: "20230411T000000.000 GMT",
                    ConsumedBuffer: "+2",
                    HelpNeeded: "No",
                  },
                },
                {
                  key: "3-0-1",
                  data: {
                    Task: "Resume.doc",
                    Dependancy: "25kb",
                    Role: [{ name: "New York", code: "NY" }],
                    Owner: [
                      { name: "Luca", code: "Luca" },
                      { name: "Karol", code: "Karol" },
                      { name: "Iza", code: "Iza" },
                    ],
                    State: "State",
                    Duration: "02",
                    StartDate: "20230411T000000.000 GMT",
                    EndDate: "20230411T000000.000 GMT",
                    ConsumedBuffer: "+2",
                    HelpNeeded: "No",
                  },
                },
              ],
            },
            {
              key: "3-1",
              data: {
                Task: "Home",
                Dependancy: "20kb",
                Role: [{ name: "New York", code: "NY" }],
                Owner: [
                  { name: "Luca", code: "Luca" },
                  { name: "Karol", code: "Karol" },
                  { name: "Iza", code: "Iza" },
                ],
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "+2",
                HelpNeeded: "No",
              },
              children: [
                {
                  key: "3-1-0",
                  data: {
                    Task: "Invoices",
                    Dependancy: "20kb",
                    Role: [{ name: "New York", code: "NY" }],
                    Owner: [
                      { name: "Luca", code: "Luca" },
                      { name: "Karol", code: "Karol" },
                      { name: "Iza", code: "Iza" },
                    ],
                    State: "State",
                    Duration: "02",
                    StartDate: "20230411T000000.000 GMT",
                    EndDate: "20230411T000000.000 GMT",
                    ConsumedBuffer: "+2",
                    HelpNeeded: "No",
                  },
                },
              ],
            },
          ],
        },
        {
          key: "4",
          data: {
            Task: "Downloads",
            Dependancy: "25kb",
            Role: [{ name: "New York", code: "NY" }],
            Owner: [
              { name: "Luca", code: "Luca" },
              { name: "Karol", code: "Karol" },
              { name: "Iza", code: "Iza" },
            ],
            State: "Available",
            Duration: "02",
            StartDate: "20230411T000000.000 GMT",
            EndDate: "20230411T000000.000 GMT",
            ConsumedBuffer: "+2",
            HelpNeeded: "No",
          },
          children: [
            {
              key: "4-0",
              data: {
                Task: "Spanish",
                Dependancy: "10kb",
                Role: [{ name: "New York", code: "NY" }],
                Owner: [
                  { name: "Luca", code: "Luca" },
                  { name: "Karol", code: "Karol" },
                  { name: "Iza", code: "Iza" },
                ],
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "+2",
                HelpNeeded: "No",
              },
              children: [
                {
                  key: "4-0-0",
                  data: {
                    Task: "tutorial-a1.txt",
                    Dependancy: "5kb",
                    Role: [{ name: "New York", code: "NY" }],
                    Owner: [
                      { name: "Luca", code: "Luca" },
                      { name: "Karol", code: "Karol" },
                      { name: "Iza", code: "Iza" },
                    ],
                    State: "State",
                    Duration: "02",
                    StartDate: "20230411T000000.000 GMT",
                    EndDate: "20230411T000000.000 GMT",
                    ConsumedBuffer: "+2",
                    HelpNeeded: "No",
                  },
                },
                {
                  key: "4-0-1",
                  data: {
                    Task: "tutorial-a2.txt",
                    Dependancy: "5kb",
                    Role: [{ name: "New York", code: "NY" }],
                    Owner: [
                      { name: "Luca", code: "Luca" },
                      { name: "Karol", code: "Karol" },
                      { name: "Iza", code: "Iza" },
                    ],
                    State: "State",
                    Duration: "02",
                    StartDate: "20230411T000000.000 GMT",
                    EndDate: "20230411T000000.000 GMT",
                    ConsumedBuffer: "+2",
                    HelpNeeded: "No",
                  },
                },
              ],
            }
          ],
        },
        {
          key: "8",
          data: {
            Task: "Videos",
            Dependancy: "1500kb",
            Role: [{ name: "New York", code: "NY" }],
            Owner: [
              { name: "Luca", code: "Luca" },
              { name: "Karol", code: "Karol" },
              { name: "Iza", code: "Iza" },
            ],
            State: "Awaiting",
            Duration: "02",
            StartDate: "20230411T000000.000 GMT",
            EndDate: "20230411T000000.000 GMT",
            ConsumedBuffer: "+2",
            HelpNeeded: "No",
          },
          children: [
            {
              key: "8-0",
              data: {
                Task: "primefaces.mkv",
                Dependancy: "1000kb",
                Role: [{ name: "New York", code: "NY" }],
                Owner: [
                  { name: "Luca", code: "Luca" },
                  { name: "Karol", code: "Karol" },
                  { name: "Iza", code: "Iza" },
                ],
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "+2",
                HelpNeeded: "No",
              },
            },
            {
              key: "8-1",
              data: {
                Task: "intro.avi",
                Dependancy: "500kb",
                Role: [{ name: "New York", code: "NY" }],
                Owner: [
                  { name: "Luca", code: "Luca" },
                  { name: "Karol", code: "Karol" },
                  { name: "Iza", code: "Iza" },
                ],
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "+2",
                HelpNeeded: "No",
              },
            },
          ],
        },
      ],
    });
  } catch (err) {
    console.error(err);
    dispatch({ type: types.GET_PROJECTPLAN_DETAILS_ERROR, payload: err });
  }
};

export const getMyProject = (PM) => async (dispatch) => {
  try {
    //here need to add url and pass PM name
    const res = await axios.get(
      `https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v1/MyProjects/Luca`
    );

    if (res?.data === null) {
      dispatch({
        type: types.GET_PROJECT_DETAILS_ERROR,
        payload: "No records found",
      });
    } else {
      if (res.status === 200) {
        dispatch({
          type: types.GET_PROJECT_DETAILS_SUCCESS,
          payload: res.data.ArtworkAgilityProjects,
        });
      } else {
        dispatch({
          type: types.GET_PROJECT_DETAILS_ERROR,
          payload: "Project not found",
        });
      }
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: types.GET_PROJECT_DETAILS_ERROR, payload: err });
  }
};

export const getAllProject = (PM) => async (dispatch) => {
  try {
    //here need to add url and pass PM name
    const res = await axios.get(
      `https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v1/AllProjects/BABY/EUROPE ENTERPRISE`
    );

    if (res?.data === null) {
      dispatch({
        type: types.GET_ALL_PROJECT_DETAILS_ERROR,
        payload: "No records found",
      });
    } else {
      if (res.status === 200) {
        dispatch({
          type: types.GET_ALL_PROJECT_DETAILS_SUCCESS,
          payload: res.data.ArtworkAgilityProjects,
        });
      } else {
        dispatch({
          type: types.GET_ALL_PROJECT_DETAILS_ERROR,
          payload: "Project not found",
        });
      }
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: types.GET_ALL_PROJECT_DETAILS_ERROR, payload: err });
  }
};

// export const updateProject = (data) => async (dispatch) => {
//   try {
//     if (data) {
//       dispatch({
//         type: types.UPDATE_PROJECT,
//         payload: data,
//       });
//     }
//   } catch (err) {
//     dispatch({ type: types.UPDATE_PROJECT_ERROR, payload: err });
//   }
// };
