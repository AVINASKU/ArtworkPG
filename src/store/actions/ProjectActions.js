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
          key: "0",
          data: {
            Task: "Applications",
            Dependancy: "100kb",
            Role: "Folder",
            Owner: "Capgemini",
            State: "State",
            Duration: "02",
            StartDate: "20230411T000000.000 GMT",
            EndDate: "20230411T000000.000 GMT",
            ConsumedBuffer: "ConsumedBuffer",
            HelpNeeded: "Help",
          },
          children: [
            {
              key: "0-0",
              data: {
                Task: "React",
                Dependancy: "25kb",
                Role: "Folder",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
              },
              children: [
                {
                  key: "0-0-0",
                  data: {
                    Task: "react.app",
                    Dependancy: "10kb",
                    Role: "Application",
                    Owner: "Capgemini",
                    State: "State",
                    Duration: "02",
                    StartDate: "20230411T000000.000 GMT",
                    EndDate: "20230411T000000.000 GMT",
                    ConsumedBuffer: "ConsumedBuffer",
                    HelpNeeded: "Help",
                  },
                },
                {
                  key: "0-0-1",
                  data: {
                    Task: "native.app",
                    Dependancy: "10kb",
                    Role: "Application",
                    Owner: "Capgemini",
                    State: "State",
                    Duration: "02",
                    StartDate: "20230411T000000.000 GMT",
                    EndDate: "20230411T000000.000 GMT",
                    ConsumedBuffer: "ConsumedBuffer",
                    HelpNeeded: "Help",
                  },
                },
                {
                  key: "0-0-2",
                  data: {
                    Task: "mobile.app",
                    Dependancy: "5kb",
                    Role: "Application",
                    Owner: "Capgemini",
                    State: "State",
                    Duration: "02",
                    StartDate: "20230411T000000.000 GMT",
                    EndDate: "20230411T000000.000 GMT",
                    ConsumedBuffer: "ConsumedBuffer",
                    HelpNeeded: "Help",
                  },
                },
              ],
            },
            {
              key: "0-1",
              data: {
                Task: "editor.app",
                Dependancy: "25kb",
                Role: "Application",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
              },
            },
            {
              key: "0-2",
              data: {
                Task: "settings.app",
                Dependancy: "50kb",
                Role: "Application",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
              },
            },
          ],
        },
        {
          key: "1",
          data: {
            Task: "Cloud",
            Dependancy: "20kb",
            Role: "Folder",
            Owner: "Capgemini",
            State: "State",
            Duration: "02",
            StartDate: "20230411T000000.000 GMT",
            EndDate: "20230411T000000.000 GMT",
            ConsumedBuffer: "ConsumedBuffer",
            HelpNeeded: "Help",
          },
          children: [
            {
              key: "1-0",
              data: {
                Task: "backup-1.zip",
                Dependancy: "10kb",
                Role: "Zip",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
              },
            },
            {
              key: "1-1",
              data: {
                Task: "backup-2.zip",
                Dependancy: "10kb",
                Role: "Zip",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
              },
            },
          ],
        },
        {
          key: "2",
          data: {
            Task: "Desktop",
            Dependancy: "150kb",
            Role: "Folder",
            Owner: "Capgemini",
            State: "State",
            Duration: "02",
            StartDate: "20230411T000000.000 GMT",
            EndDate: "20230411T000000.000 GMT",
            ConsumedBuffer: "ConsumedBuffer",
            HelpNeeded: "Help",
          },
          children: [
            {
              key: "2-0",
              data: {
                Task: "note-meeting.txt",
                Dependancy: "50kb",
                Role: "Text",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
              },
            },
            {
              key: "2-1",
              data: {
                Task: "note-todo.txt",
                Dependancy: "100kb",
                Role: "Text",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
              },
            },
          ],
        },
        {
          key: "3",
          data: {
            Task: "Documents",
            Dependancy: "75kb",
            Role: "Folder",
            Owner: "Capgemini",
            State: "State",
            Duration: "02",
            StartDate: "20230411T000000.000 GMT",
            EndDate: "20230411T000000.000 GMT",
            ConsumedBuffer: "ConsumedBuffer",
            HelpNeeded: "Help",
          },
          children: [
            {
              key: "3-0",
              data: {
                Task: "Work",
                Dependancy: "55kb",
                Role: "Folder",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
              },
              children: [
                {
                  key: "3-0-0",
                  data: {
                    Task: "Expenses.doc",
                    Dependancy: "30kb",
                    Role: "Document",
                    Owner: "Capgemini",
                    State: "State",
                    Duration: "02",
                    StartDate: "20230411T000000.000 GMT",
                    EndDate: "20230411T000000.000 GMT",
                    ConsumedBuffer: "ConsumedBuffer",
                    HelpNeeded: "Help",
                  },
                },
                {
                  key: "3-0-1",
                  data: {
                    Task: "Resume.doc",
                    Dependancy: "25kb",
                    Role: "Resume",
                    Owner: "Capgemini",
                    State: "State",
                    Duration: "02",
                    StartDate: "20230411T000000.000 GMT",
                    EndDate: "20230411T000000.000 GMT",
                    ConsumedBuffer: "ConsumedBuffer",
                    HelpNeeded: "Help",
                  },
                },
              ],
            },
            {
              key: "3-1",
              data: {
                Task: "Home",
                Dependancy: "20kb",
                Role: "Folder",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
              },
              children: [
                {
                  key: "3-1-0",
                  data: {
                    Task: "Invoices",
                    Dependancy: "20kb",
                    Role: "Text",
                    Owner: "Capgemini",
                    State: "State",
                    Duration: "02",
                    StartDate: "20230411T000000.000 GMT",
                    EndDate: "20230411T000000.000 GMT",
                    ConsumedBuffer: "ConsumedBuffer",
                    HelpNeeded: "Help",
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
            Role: "Folder",
            Owner: "Capgemini",
            State: "State",
            Duration: "02",
            StartDate: "20230411T000000.000 GMT",
            EndDate: "20230411T000000.000 GMT",
            ConsumedBuffer: "ConsumedBuffer",
            HelpNeeded: "Help",
          },
          children: [
            {
              key: "4-0",
              data: {
                Task: "Spanish",
                Dependancy: "10kb",
                Role: "Folder",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
              },
              children: [
                {
                  key: "4-0-0",
                  data: {
                    Task: "tutorial-a1.txt",
                    Dependancy: "5kb",
                    Role: "Text",
                    Owner: "Capgemini",
                    State: "State",
                    Duration: "02",
                    StartDate: "20230411T000000.000 GMT",
                    EndDate: "20230411T000000.000 GMT",
                    ConsumedBuffer: "ConsumedBuffer",
                    HelpNeeded: "Help",
                  },
                },
                {
                  key: "4-0-1",
                  data: {
                    Task: "tutorial-a2.txt",
                    Dependancy: "5kb",
                    Role: "Text",
                    Owner: "Capgemini",
                    State: "State",
                    Duration: "02",
                    StartDate: "20230411T000000.000 GMT",
                    EndDate: "20230411T000000.000 GMT",
                    ConsumedBuffer: "ConsumedBuffer",
                    HelpNeeded: "Help",
                  },
                },
              ],
            },
            {
              key: "4-1",
              data: {
                Task: "Travel",
                Dependancy: "15kb",
                Role: "Text",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
              },
              children: [
                {
                  key: "4-1-0",
                  data: {
                    Task: "Hotel.pdf",
                    Dependancy: "10kb",
                    Role: "PDF",
                    Owner: "Capgemini",
                    State: "State",
                    Duration: "02",
                    StartDate: "20230411T000000.000 GMT",
                    EndDate: "20230411T000000.000 GMT",
                    ConsumedBuffer: "ConsumedBuffer",
                    HelpNeeded: "Help",
                  },
                },
                {
                  key: "4-1-1",
                  data: {
                    Task: "Flight.pdf",
                    Dependancy: "5kb",
                    Role: "PDF",
                    Owner: "Capgemini",
                    State: "State",
                    Duration: "02",
                    StartDate: "20230411T000000.000 GMT",
                    EndDate: "20230411T000000.000 GMT",
                    ConsumedBuffer: "ConsumedBuffer",
                    HelpNeeded: "Help",
                  },
                },
              ],
            },
          ],
        },
        {
          key: "5",
          data: {
            Task: "Main",
            Dependancy: "50kb",
            Role: "Folder",
            Owner: "Capgemini",
            State: "State",
            Duration: "02",
            StartDate: "20230411T000000.000 GMT",
            EndDate: "20230411T000000.000 GMT",
            ConsumedBuffer: "ConsumedBuffer",
            HelpNeeded: "Help",
          },
          children: [
            {
              key: "5-0",
              data: {
                Task: "bin",
                Dependancy: "50kb",
                Role: "Link",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
              },
            },
            {
              key: "5-1",
              data: {
                Task: "etc",
                Dependancy: "100kb",
                Role: "Link",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
              },
            },
            {
              key: "5-2",
              data: {
                Task: "var",
                Dependancy: "100kb",
                Role: "Link",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
              },
            },
          ],
        },
        {
          key: "6",
          data: {
            Task: "Other",
            Dependancy: "5kb",
            Role: "Folder",
            Owner: "Capgemini",
            State: "State",
            Duration: "02",
            StartDate: "20230411T000000.000 GMT",
            EndDate: "20230411T000000.000 GMT",
            ConsumedBuffer: "ConsumedBuffer",
            HelpNeeded: "Help",
          },
          children: [
            {
              key: "6-0",
              data: {
                Task: "todo.txt",
                Dependancy: "3kb",
                Role: "Text",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
              },
            },
            {
              key: "6-1",
              data: {
                Task: "logo.png",
                Dependancy: "2kb",
                Role: "Picture",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
              },
            },
          ],
        },
        {
          key: "7",
          data: {
            Task: "Pictures",
            Dependancy: "150kb",
            Role: "Folder",
            Owner: "Capgemini",
            State: "State",
            Duration: "02",
            StartDate: "20230411T000000.000 GMT",
            EndDate: "20230411T000000.000 GMT",
            ConsumedBuffer: "ConsumedBuffer",
            HelpNeeded: "Help",
          },
          children: [
            {
              key: "7-0",
              data: {
                Task: "barcelona.jpg",
                Dependancy: "90kb",
                Role: "Picture",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
              },
            },
            {
              key: "7-1",
              data: {
                Task: "primeng.png",
                Dependancy: "30kb",
                Role: "Picture",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
              },
            },
            {
              key: "7-2",
              data: {
                Task: "prime.jpg",
                Dependancy: "30kb",
                Role: "Picture",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
              },
            },
          ],
        },
        {
          key: "8",
          data: {
            Task: "Videos",
            Dependancy: "1500kb",
            Role: "Folder",
            Owner: "Capgemini",
            State: "State",
            Duration: "02",
            StartDate: "20230411T000000.000 GMT",
            EndDate: "20230411T000000.000 GMT",
            ConsumedBuffer: "ConsumedBuffer",
            HelpNeeded: "Help",
          },
          children: [
            {
              key: "8-0",
              data: {
                Task: "primefaces.mkv",
                Dependancy: "1000kb",
                Role: "Video",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
              },
            },
            {
              key: "8-1",
              data: {
                Task: "intro.avi",
                Dependancy: "500kb",
                Role: "Video",
                Owner: "Capgemini",
                State: "State",
                Duration: "02",
                StartDate: "20230411T000000.000 GMT",
                EndDate: "20230411T000000.000 GMT",
                ConsumedBuffer: "ConsumedBuffer",
                HelpNeeded: "Help",
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
