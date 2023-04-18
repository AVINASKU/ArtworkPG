import axios from "axios";

export const createProjectSaveAsDraft = async (data) => {
  let apiURL = "https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v1/cases";

  const options = {
    method: "POST",
    url: apiURL,
    data: data,
  };

  await axios
    .request(options)
    .then((res) => {
      console.log("res ID:", res.data.ID);
    })
    .catch((error) => {
      console.log("error:", error);
    });
};

export const createProjectSubmit = async (data) => {
  let apiURL = "https://pegadev.pg.com/prweb/api/ArtworkAgilityFile/v1/cases";

  const options = {
    method: "POST",
    url: apiURL,
    data: data,
  };

  await axios
    .request(options)
    .then((res) => {
      console.log("res ID:", res.data.ID);
    })
    .catch((error) => {
      console.log("error:", error);
    });
};
