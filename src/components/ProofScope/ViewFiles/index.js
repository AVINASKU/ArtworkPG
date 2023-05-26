import { useState } from "react";
import axios from "axios";
import { CreateSession } from "../useSession";

export const useProofScopeURL = () => {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const viewProofScopeFile = async (fileUrl) => {
    const sessionCreate = await CreateSession(
      // "http://azw-aac-hybrid1.np-cloud-pg.com:9090/portal.cgi",
      "http://azw-aac-hybrid1.np-cloud-pg.com:9090/portal.cgi",
      "admin",
      "admin"
    );
    const strSession = JSON.parse(JSON.stringify(sessionCreate)).session;

    // file_urls: fileUrl,
    const json = {
      method: "hub.process_from_whitepaper_with_options",
      whitepaper_name: "api_starter_kit",
      input_name: "get_proofscope_url",
      variables: {
        can_delete_notes: true,
        can_view_only: false,
        email: "test@test.com",
        username: "test_user01",
        file_urls: fileUrl,
        expiry_in_minutes: "20",
      },
      session: strSession,
    };

    try {
      const response = await axios.post(
        "http://azw-aac-hybrid1.np-cloud-pg.com:9090/portal.cgi",
        json,
        {
          headers: {
            "Content-Type": "application/json",
            "Content-Language": "en-US",
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
      } else if (data.proofscope_url_session) {
        // const viewerURLOutput = data.proofscope_url_session;
        // const viewerURLOutput = data.proofscope_url_session.replace(
        //   /http:\/\/127\.0\.0\.1:9090/g,
        //   "https://proofscopenp.pg.com/portal.cgi"
        // );
        const viewerURLOutput = data.proofscope_url_session.replace(
          /http:\/\/127\.0\.0\.1:9090/g,
          "http://azw-aac-hybrid1.np-cloud-pg.com:9090/"
        );
        const decodedURL = decodeURIComponent(viewerURLOutput);
        console.log(viewerURLOutput);
        const uri = new URL(decodedURL);
        // const strQuery = uri.search
        //   .replace(/\%/g, "%25")
        //   .replace(/\//g, "%2f")
        //   .replace(/\:/g, "%3a");
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
