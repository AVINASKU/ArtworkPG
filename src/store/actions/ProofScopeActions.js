import { CreateSession } from "../../components/ProofScope/useSession";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export const UploadFileToServer =
  (proofsopeFile, strFileName) => async (dispatch) => {
    try {
      const sessionCreate = await CreateSession(
        "http://azw-aac-hybrid1.np-cloud-pg.com:9090/",
        // "https://proofscopenp.pg.com/",
        "admin",
        "admin"
      );

      const strSession = JSON.parse(JSON.stringify(sessionCreate)).session;

      const file = proofsopeFile;
      const fileContent = await file.arrayBuffer();
      const fileType = file.type;
      const fileName = file.name;
      const boundary = uuidv4();
      console.log(boundary);
      // const body = new Blob([
      //   `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${fileName}"\r\nContent-Type: ${fileType}\r\n\r\n`,
      //   fileContent,
      //   `\r\n--${boundary}--`,
      // ]);
      const formData = new FormData();
      formData.append("file", proofsopeFile);
      const headers = new Headers();
      headers.append(
        "Content-Type",
        `multipart/form-data;boundary=${boundary}`
      );

      const requestOptions = {
        method: "POST",
        headers: headers,
        body: formData,
        redirect: "follow",
      };
      // const strProofScopeURL =
      // "http://azw-aac-hybrid1.np-cloud-pg.com:9090/portal.cgi";
      // "http://azw-aac-hybrid1.np-cloud-pg.com:9090/portal.cgi";
      const strProofScopeURL =
        "http://azw-aac-hybrid1.np-cloud-pg.com:9090/portal.cgi";
      // const strProofScopeURL = "https://proofscopenp.pg.com/portal.cgi";
      const strProofScopeUploadURL = `${strProofScopeURL}?hub=upload_file&whitepaper_name=api_starter_kit&input_name=receive_file_auth&session=${strSession}`;

      fetch(strProofScopeUploadURL, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          const files = result.files;
          const path = files[0];
          // const formattedPath = `"${path}"`;
          // console.log(formattedPath);
          // const pathArray = JSON.parse(`[${formattedPath}]`);
          // console.log(pathArray);
          const responseMsg = moveFileToFolder(
            path,
            strSession,
            fileName,
            boundary
          );
          dispatch({
            type: "UPLOAD_FILE_SUCCESS",
            payload: { path, responseMsg },
          });
        })
        .catch((error) => console.log("error", error));
      // const file = new File([proofsopeFile], strFileName);
      // const formData = new FormData();
      // formData.append("file", file, strFileName);

      // const response = await axios.post(strProofScopeUploadURL, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      // const data = response.data;
      // const jsonArray = data.files;
      // const responseMsg = jsonArray[0];
      // const movedPath = await moveFileToFolder(
      //   jsonArray,
      //   strSession,
      //   strFileName
      // );

      // dispatch({
      //   type: "UPLOAD_FILE_SUCCESS",
      //   payload: { responseMsg, movedPath },
      // });
    } catch (error) {
      dispatch({
        type: "UPLOAD_FILE_FAILURE",
        payload: { error: error.message },
      });
    }
  };

const moveFileToFolder = async (
  jsonArray,
  strSession,
  strFileName,
  boundary
) => {
  // let strReturnPath = null;
  // let strUrlParam = "https://proofscopenp.pg.com/portal.cgi";
  // // "http://azw-aac-hybrid1.np-cloud-pg.com:9090/portal.cgi";

  // // http: if (strType === "Artwork File") {
  // //   strType = "Artwork%20File";
  // // } else if (strType === "CIC") {
  // //   strType = "CIC";
  // // }

  // // let sbPath = "cloudflow://PP_FILE_STORE/aacdata";
  // // let sbPath = "cloudflow://PP_FILE_STORE/Incoming";
  // let sbPath = "cloudflow://PP_FILE_STORE/Enovia/local/";
  // const url = new URL("https://proofscopenp.pg.com/portal.cgi");
  const url = new URL("http://azw-aac-hybrid1.np-cloud-pg.com:9090/portal.cgi");
  try {
    // let json = {
    //   method: "hub.process_from_whitepaper_with_files_and_variables",
    //   whitepaper_name: "api_starter_kit",
    //   input_name: "move_file",
    //   files: jsonArray,
    //   variables: {
    //     to_file_or_folder: sbPath,
    //     options: {
    //       overwrite: true,
    //       create_folders: true,
    //       unique_name_mode: "Sequential",
    //       delete_enclosing_folder: true,
    //     },
    //   },
    //   session: strSession,
    // };
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Content-Language": "en-US",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Credentials": "true",s
    //     "Access-Control-Allow-Headers": "*",
    //     "Access-Control-Allow-Methods": "*",
    //   },
    // };
    const fileArray = `cloudflow://PP_FILE_STORE/Incoming/${boundary}/${strFileName}`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method: "hub.process_from_whitepaper_with_files_and_variables",
        whitepaper_name: "api_starter_kit",
        input_name: "move_file",
        files: [jsonArray],
        variables: {
          to_file_or_folder: "cloudflow://PP_FILE_STORE/aacdata/",
          options: {
            overwrite: true,
            create_folders: true,
            unique_name_mode: "Sequential",
            delete_enclosing_folder: true,
          },
        },
        session: strSession,
      }),
    };
    try {
      const response = await fetch(url, requestOptions);
      const result = await response.json();
      const files = result.files;
      const path = files[0];
      console.log(path);
      return path;
    } catch (error) {
      console.log("error", error);
      return null;
    }
    // const response = await axios.post(
    //   strUrlParam,
    //   JSON.stringify(json),
    //   config
    // );
    // if (response.status === 200) {
    //   const jsonResp = response.data;
    //   let jsonObjArray = jsonResp.files;
    //   strReturnPath = jsonObjArray[0];
    //   console.log("strReturnPath>>>" + strReturnPath);
    // }
  } catch (exception) {
    console.log(exception.message);
  }
  // return strReturnPath;
};
