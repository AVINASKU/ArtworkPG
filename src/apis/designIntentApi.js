import Api from ".";

const baseURL = "https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v1";

//pass the taskID and projectId from the my tasks
export const getDesignIntent = async (taskID, projectId, headers = {
  "Access-Control-Allow-Headers" : "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}) => {
  const api = new Api();
  const axiosInstance = await api.init({ headers });
  let apiURL = `${baseURL}/TaskDetails/${taskID}/${projectId}`;
  const designIntent = await axiosInstance({
    url: apiURL,
    method: "GET",
  });

  return designIntent?.data;
};

export const saveDesignIntent = async (formData, headers = {
  "Access-Control-Allow-Headers" : "Content-Type",
  "Access-Control-Allow-Origin": "http://localhost:3000/",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}) => {
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
