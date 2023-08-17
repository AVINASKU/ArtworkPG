import { useState } from "react";
import axios from "axios";
import { CreateSession } from "../useSession";
import { useSelector } from "react-redux";
import { DEVURL } from "../../../apis/envUrl";
export const useProofScopeURL = () => {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User?.userInformation;

  const userid = `${userInformation?.userid}@pg.com`;

  const username = userInformation?.username;
  const viewProofScopeFile = async (TaskID, fileUrl) => {
    const sessionCreate = await CreateSession(
      `${DEVURL}/createProofscopeSession`,
      "admin",
      "admin"
    );
    const strSession = JSON.parse(JSON.stringify(sessionCreate)).session;

    // file_urls: fileUrl,
    const json = {
      method: "hub.process_from_whitepaper_with_options",
      whitepaper_name: "awm_approval",
      input_name: "begin_approval",
      variables: {
        cf_art_path:
          "cloudflow://PP_FILE_STORE/CIC_20169540_POA-00454657_Bounty_NA_Paper_Towel_Essentials_Select-a-Size_Double_Roll_2CT_White_SHIPPER.pdf",
        approver: userid,
        params: { customer_name: username, task_id: TaskID },
      },
      session: strSession,
    };

    try {
      const response = await axios.post(`${DEVURL}/viewProofscopeFile`, json, {
        headers: {
          "Content-Type": "application/json",
          "Content-Language": "en-US",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = response.data;
      if (data.status) {
        const obj = data.contents;
        const lastError = obj.last_error;
        if (lastError && lastError.includes("assets not found")) {
          // proofScopeCheckinAction()
        }
        setIsError(true);
        setMessage(lastError);
      } else if (data.approval_url) {
        const viewerURLOutput = data.approval_url.replace(
          /http:\/\/localhost:9090/g,
          "https://azw-aac-hyb1.xnp-cloud-pg.com"
        );
        const decodedURL = decodeURIComponent(viewerURLOutput);
        //console.log(viewerURLOutput);
        const uri = new URL(decodedURL);
        setIsError(false);
        setMessage("");
        window.open(viewerURLOutput, "_blank");
      }
    } catch (error) {
      // handle error
    }
  };

  return viewProofScopeFile;
};
