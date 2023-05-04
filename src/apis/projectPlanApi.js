import Api from ".";
import { updateProjectPlanAction } from "../store/actions/ProjectPlanActions";
import { store } from "../store/store";

const baseURL = "https://pegadev.pg.com/prweb/api/ArtworkAgilityFile";

export const getProjectPlan = async (projectId, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  // let apiURL = `${baseURL}/V1/ProjectPlan/PG-AAS-WORK A-544`;
  let apiURL = `${baseURL}/V1/ProjectPlan/${projectId}`;
  const { data: projectPlanData } = await axiosInstance({
    url: apiURL,
    method: "GET",
  });
  //   console.log("projectPlanData: ", projectPlanData);
  return projectPlanData?.ArtworkAgilityProjects;
};
