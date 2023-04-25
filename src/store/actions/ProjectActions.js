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
          Task: "Define Design Intent",
          SubTask: [],
          Dependancy: "Project active & task in scope",
          Role: ["Design Manager", "Project Manager"],
          Owner: ["Paleczna", "Sriram"],
          State: "Completed",
          "Duration(Days)": "02",
          "Start Date": "20230411T000000.000 GMT",
          "End Date": "20230411T000000.000 GMT",
          Consumed: "Consumed",
          "Help Needed": "Help",
        },
        {
          Task: "Task",
          SubTask: [
            {
              // "Test": "Test",
              Task: "Define Design Intent",
              Dependancy: "Project active & task in scope",
              Role: ["Design Manager", "Project Manager"],
              Owner: ["Paleczna", "Sriram"],
              State: "Completed",
              "Duration(Days)": "02",
              "Start Date": "20230411T000000.000 GMT",
            },
          ],
          Dependancy: "Project active & task in scope",
          Role: ["Design Manager", "Project Manager"],
          Owner: ["Paleczna", "Sriram"],
          State: "Completed",
          "Duration(Days)": "02",
          "Start Date": "20230411T000000.000 GMT",
          "End Date": "20230411T000000.000 GMT",
          Consumed: "Consumed",
          "Help Needed": "Help",
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
      `https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v1/MyProjects/Hemant`
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
      `https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v1/AllProjects/FAM/EUROPE ENTERPRISE`
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

export const updateProject = (data) => async (dispatch) => {
  try {
    if (data) {
      dispatch({
        type: types.UPDATE_PROJECT,
        payload: data,
      });
    }
  } catch (err) {
    dispatch({ type: types.UPDATE_PROJECT_ERROR, payload: err });
  }
};
