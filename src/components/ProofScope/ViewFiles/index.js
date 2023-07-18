import { useState } from "react";
import axios from "axios";
import { CreateSession } from "../useSession";

export const useProofScopeURL = () => {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const viewProofScopeFile = async (fileUrl) => {
    const sessionCreate = await CreateSession(
      // "http://azw-aac-hybrid1.np-cloud-pg.com:9090/portal.cgi",
      "https://azw-aac-hyb1.xnp-cloud-pg.com/portal.cgi",
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
        cf_art_path: fileUrl,
        approver: "cr.ac@pg.com",
        params: { customer_name: "Asha" },
      },
      session: strSession,
    };

    try {
      const response = await axios.post(
        "https://azw-aac-hyb1.xnp-cloud-pg.com/portal.cgi",
        json,
        {
          headers: {
            "Content-Type": "application/json",
            "Content-Language": "en-US",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
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
        console.log(viewerURLOutput);
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
