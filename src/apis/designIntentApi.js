import Api from ".";

const baseURL = "https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v1";

//pass the taskID and projectId from the my tasks
export const getDesignIntent = async (taskID, projectId, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${baseURL}/DesignIntentDetails/${taskID}/${projectId}`;
  const designIntent = await axiosInstance({
    url: apiURL,
    method: "GET",
  });

  return designIntent?.data?.ArtworkAgilityProjects;
};

export const saveDesignIntent = async (formData, headers = {}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${baseURL}/UpdateDesignIntentJob`;
  console.log("api url", apiURL);
  const designIntent = await axiosInstance({
    url: apiURL,
    method: "POST",
    data: formData,
  });

  console.log("response", designIntent, formData);

  return true;
};
